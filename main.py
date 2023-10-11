from fastapi import FastAPI
from routers.user import user
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

from fastapi import FastAPI


app.include_router(user, tags=["Users"], prefix="/user")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
