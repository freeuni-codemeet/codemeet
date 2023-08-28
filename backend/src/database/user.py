from pydantic import BaseModel

from backend.src.database.database import Base
from sqlalchemy import Column, Integer, String


class UserBase(BaseModel):
    username: str
    email: str
    password: str


class UserCreate(UserBase):
    username: str
    email: str
    password: str


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
