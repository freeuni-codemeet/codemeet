from http.client import HTTPException

from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from backend.src.database import user
from backend.src.database.user import User
from backend.src.database.database import SessionLocal

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class AuthService:

    def __init__(self):
        self.db = SessionLocal()

    def add_user(self, user: user.UserBase):
        db_user = self.get_user_by_email(user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        return self.create_user(user)

    def get_user_by_email(self, email: str):
        return self.db.query(user.User).filter(user.User.email == email).first()

    def create_user(self, user: user.UserBase):
        db_user = User(email=user.email, username=user.username, password=user.password)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
