from fastapi import FastAPI
from routers.user import user
from routers.text_to_voice import text_to_voice
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Add CORS middleware before including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user, tags=["Users"], prefix="")
app.include_router(text_to_voice, tags=["Text to Voice"], prefix="")
