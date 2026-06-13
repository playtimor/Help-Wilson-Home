import os
import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else 'https://help-wilson-home.preview.emergentagent.com'
API = f"{BASE_URL}/api"
ADMIN_TOKEN = "wilson-2026-admin"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "X-Admin-Token": ADMIN_TOKEN})
    return s


# --- Stats endpoint ---
class TestStats:
    def test_stats_shape(self, session):
        r = session.get(f"{API}/fundraiser/stats")
        assert r.status_code == 200
        data = r.json()
        assert data["goal"] == 1000
        assert data["deadline"] == "2026-06-20T23:59:59+01:00"
        assert data["birthday"] == "2026-06-25T00:00:00+01:00"
        assert "raised" in data and "contributors_count" in data and "percentage" in data
        assert data["percentage"] <= 100


# --- Admin auth ---
class TestAdminAuth:
    def test_verify_valid_token(self, session):
        r = session.post(f"{API}/admin/verify", json={"token": ADMIN_TOKEN})
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_verify_invalid_token(self, session):
        r = session.post(f"{API}/admin/verify", json={"token": "bad-token"})
        assert r.status_code == 401

    def test_post_contributor_without_token(self, session):
        r = session.post(f"{API}/contributors", json={"name": "TEST_NoAuth", "amount": 5})
        assert r.status_code == 401

    def test_delete_contributor_without_token(self, session):
        r = session.delete(f"{API}/contributors/some-fake-id")
        assert r.status_code == 401

    def test_delete_message_without_token(self, session):
        r = session.delete(f"{API}/messages/some-fake-id")
        assert r.status_code == 401


# --- Contributors CRUD (admin) ---
class TestContributors:
    created_ids = []

    def test_create_valid(self, admin_session, session):
        before = session.get(f"{API}/fundraiser/stats").json()
        payload = {"name": "TEST_Joana", "amount": 25.5, "note": "Vai com tudo!"}
        r = admin_session.post(f"{API}/contributors", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == "TEST_Joana"
        assert body["amount"] == 25.5
        assert body["note"] == "Vai com tudo!"
        assert "id" in body and "created_at" in body
        TestContributors.created_ids.append(body["id"])

        after = session.get(f"{API}/fundraiser/stats").json()
        assert after["raised"] >= before["raised"] + 25.5 - 0.01
        assert after["contributors_count"] == before["contributors_count"] + 1

    def test_create_no_note(self, admin_session):
        r = admin_session.post(f"{API}/contributors", json={"name": "TEST_Ana", "amount": 10})
        assert r.status_code == 200
        body = r.json()
        assert body["note"] is None
        TestContributors.created_ids.append(body["id"])

    def test_invalid_empty_name(self, admin_session):
        r = admin_session.post(f"{API}/contributors", json={"name": "", "amount": 5})
        assert r.status_code in (400, 422)

    def test_invalid_zero_amount(self, admin_session):
        r = admin_session.post(f"{API}/contributors", json={"name": "TEST_X", "amount": 0})
        assert r.status_code in (400, 422)

    def test_invalid_negative(self, admin_session):
        r = admin_session.post(f"{API}/contributors", json={"name": "TEST_X", "amount": -5})
        assert r.status_code in (400, 422)

    def test_invalid_over_max(self, admin_session):
        r = admin_session.post(f"{API}/contributors", json={"name": "TEST_X", "amount": 10001})
        assert r.status_code in (400, 422)

    def test_list_public_sorted_desc(self, session):
        r = session.get(f"{API}/contributors")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        if len(items) >= 2:
            assert items[0]["created_at"] >= items[1]["created_at"]
        names = [i["name"] for i in items]
        assert "TEST_Joana" in names

    def test_aggregation_matches(self, session):
        items = session.get(f"{API}/contributors").json()
        stats = session.get(f"{API}/fundraiser/stats").json()
        total = round(sum(i["amount"] for i in items), 2)
        assert stats["contributors_count"] == len(items)
        assert abs(stats["raised"] - total) < 0.01
        expected_pct = round(min(100.0, total / 1000.0 * 100.0), 2)
        assert abs(stats["percentage"] - expected_pct) < 0.05

    def test_delete_contributor_with_token(self, admin_session, session):
        # Create one specifically for deletion
        r = admin_session.post(f"{API}/contributors", json={"name": "TEST_ToDelete", "amount": 1})
        assert r.status_code == 200
        cid = r.json()["id"]

        before = session.get(f"{API}/fundraiser/stats").json()
        d = admin_session.delete(f"{API}/contributors/{cid}")
        assert d.status_code == 200
        after = session.get(f"{API}/fundraiser/stats").json()
        assert after["contributors_count"] == before["contributors_count"] - 1

    def test_delete_contributor_not_found(self, admin_session):
        r = admin_session.delete(f"{API}/contributors/non-existent-id-xyz")
        assert r.status_code == 404


# --- Messages public + admin delete ---
class TestMessages:
    created_ids = []

    def test_create_message_public(self, session):
        r = session.post(f"{API}/messages", json={"name": "TEST_Maria", "text": "Vai com tudo, Wilson!"})
        assert r.status_code == 200
        body = r.json()
        assert body["name"] == "TEST_Maria"
        assert body["text"] == "Vai com tudo, Wilson!"
        assert "id" in body
        TestMessages.created_ids.append(body["id"])

    def test_create_message_empty_name(self, session):
        r = session.post(f"{API}/messages", json={"name": "", "text": "hello"})
        assert r.status_code in (400, 422)

    def test_create_message_empty_text(self, session):
        r = session.post(f"{API}/messages", json={"name": "TEST_X", "text": ""})
        assert r.status_code in (400, 422)

    def test_create_message_too_long(self, session):
        r = session.post(f"{API}/messages", json={"name": "TEST_X", "text": "a" * 501})
        assert r.status_code in (400, 422)

    def test_list_messages_sorted_desc(self, session):
        r = session.get(f"{API}/messages")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        if len(items) >= 2:
            assert items[0]["created_at"] >= items[1]["created_at"]
        names = [i["name"] for i in items]
        assert "TEST_Maria" in names

    def test_delete_message_with_token(self, admin_session, session):
        r = session.post(f"{API}/messages", json={"name": "TEST_ToDelete", "text": "delete me"})
        assert r.status_code == 200
        mid = r.json()["id"]
        d = admin_session.delete(f"{API}/messages/{mid}")
        assert d.status_code == 200

    def test_delete_message_not_found(self, admin_session):
        r = admin_session.delete(f"{API}/messages/non-existent-id-xyz")
        assert r.status_code == 404


# --- Cleanup ---
class TestCleanup:
    def test_cleanup_test_data(self, admin_session, session):
        # Delete remaining TEST_ contributors created during this run
        items = session.get(f"{API}/contributors").json()
        for c in items:
            if c["name"].startswith("TEST_"):
                admin_session.delete(f"{API}/contributors/{c['id']}")
        msgs = session.get(f"{API}/messages").json()
        for m in msgs:
            if m["name"].startswith("TEST_"):
                admin_session.delete(f"{API}/messages/{m['id']}")
