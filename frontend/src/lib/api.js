import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
});

const ADMIN_KEY = "wilson_admin_token";

export const getAdminToken = () =>
    typeof window !== "undefined" ? localStorage.getItem(ADMIN_KEY) : null;
export const setAdminToken = (t) => {
    if (typeof window === "undefined") return;
    if (t) localStorage.setItem(ADMIN_KEY, t);
    else localStorage.removeItem(ADMIN_KEY);
};

const authHeaders = () => {
    const t = getAdminToken();
    return t ? { "X-Admin-Token": t } : {};
};

export const getStats = async () => {
    const { data } = await api.get("/fundraiser/stats");
    return data;
};

export const getContributors = async () => {
    const { data } = await api.get("/contributors");
    return data;
};

export const verifyAdmin = async (token) => {
    const { data } = await api.post("/admin/verify", { token });
    return data;
};

export const adminAddContributor = async (payload) => {
    const { data } = await api.post("/contributors", payload, {
        headers: authHeaders(),
    });
    return data;
};

export const adminDeleteContributor = async (id) => {
    const { data } = await api.delete(`/contributors/${id}`, {
        headers: authHeaders(),
    });
    return data;
};

export const adminDeleteMessage = async (id) => {
    const { data } = await api.delete(`/messages/${id}`, {
        headers: authHeaders(),
    });
    return data;
};

export const getMessages = async () => {
    const { data } = await api.get("/messages");
    return data;
};

export const addMessage = async (payload) => {
    const { data } = await api.post("/messages", payload);
    return data;
};
