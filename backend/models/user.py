from pydantic import BaseModel, Field


class User(BaseModel):
    name: str = Field(..., example="Johnny B")
    email: str = Field(..., example="john@johnnybcodes.com")
    password: str = Field(..., example="password")
