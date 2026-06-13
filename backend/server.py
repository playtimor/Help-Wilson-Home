from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

GOAL_EUR = 1000
DEADLINE_ISO = "2026-06-20T23:59:59+01:00"
BIRTHDAY_ISO = "2026-06-25T00:00:00+01:00"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")

app = FastAPI()
api_router = APIRouter(prefix="/api")


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Token de admin inválido")
    return True


# ---------- Models ----------
class Contributor(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    amount: float
    note: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContributorCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    amount: float = Field(..., gt=0, le=10000)
    note: Optional[str] = Field(None, max_length=240)


class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    text: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class MessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    text: str = Field(..., min_length=1, max_length=500)


class FundraiserStats(BaseModel):
    goal: float
    raised: float
    contributors_count: int
    percentage: float
    deadline: str
    birthday: str


class AdminVerify(BaseModel):
    token: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Para o Wilson - fundraiser API"}


@api_router.get("/fundraiser/stats", response_model=FundraiserStats)
async def get_stats():
    cursor = db.contributors.find({}, {"_id": 0, "amount": 1})
    docs = await cursor.to_list(10000)
    raised = sum(float(d.get("amount", 0)) for d in docs)
    count = len(docs)
    pct = min(100.0, (raised / GOAL_EUR) * 100.0) if GOAL_EUR > 0 else 0.0
    return FundraiserStats(
        goal=GOAL_EUR,
        raised=raised,
        contributors_count=count,
        percentage=round(pct, 2),
        deadline=DEADLINE_ISO,
        birthday=BIRTHDAY_ISO,
    )


@api_router.post("/admin/verify")
async def verify_admin(payload: AdminVerify):
    if not ADMIN_TOKEN or payload.token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Token inválido")
    return {"ok": True}


@api_router.post("/contributors", response_model=Contributor, dependencies=[Depends(require_admin)])
async def add_contributor(payload: ContributorCreate):
    name = payload.name.strip()
    contributor = Contributor(
        name=name,
        amount=round(float(payload.amount), 2),
        note=(payload.note.strip() if payload.note else None),
    )
    doc = contributor.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contributors.insert_one(doc)
    return contributor


@api_router.get("/contributors", response_model=List[Contributor])
async def list_contributors():
    cursor = db.contributors.find({}, {"_id": 0}).sort("created_at", -1)
    docs = await cursor.to_list(1000)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            try:
                d["created_at"] = datetime.fromisoformat(d["created_at"])
            except ValueError:
                d["created_at"] = datetime.now(timezone.utc)
    return docs


@api_router.delete("/contributors/{contributor_id}", dependencies=[Depends(require_admin)])
async def delete_contributor(contributor_id: str):
    res = await db.contributors.delete_one({"id": contributor_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contribuidor não encontrado")
    return {"ok": True}


@api_router.post("/messages", response_model=Message)
async def add_message(payload: MessageCreate):
    msg = Message(name=payload.name.strip(), text=payload.text.strip())
    doc = msg.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.messages.insert_one(doc)
    return msg


@api_router.get("/messages", response_model=List[Message])
async def list_messages():
    cursor = db.messages.find({}, {"_id": 0}).sort("created_at", -1)
    docs = await cursor.to_list(1000)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            try:
                d["created_at"] = datetime.fromisoformat(d["created_at"])
            except ValueError:
                d["created_at"] = datetime.now(timezone.utc)
    return docs


@api_router.delete("/messages/{message_id}", dependencies=[Depends(require_admin)])
async def delete_message(message_id: str):
    res = await db.messages.delete_one({"id": message_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
