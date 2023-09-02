from http.client import HTTPException

from passlib.handlers.bcrypt import bcrypt

from backend.src.database import user
from backend.src.database.database import SessionLocal
from backend.src.database.user import User
from backend.src.jwt.jwt_handler import signJWT


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


class AuthService:
    def __init__(self):
        self.db = SessionLocal()

    def add_user(self, user: user.UserBase):
        db_user = self.get_user_by_email(user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        db_user = self.get_user_by_username(user.username)
        if db_user:
            raise HTTPException(status_code=400, detail="Username taken")
        return self.create_user(user)

    def get_user(self, usernameOrEmail: str, password: str):
        if "@" in usernameOrEmail:
            curr_user = self.get_user_by_email(usernameOrEmail)
        else:
            curr_user = self.get_user_by_username(usernameOrEmail)

        if curr_user and verify_password(password, curr_user.password):
            return curr_user
        return None

    def get_user_by_email(self, email: str):
        return self.db.query(user.User).filter(user.User.email == email).first()

    def get_user_by_username(self, username: str):
        return self.db.query(user.User).filter(user.User.username == username).first()

    def create_user(self, user: user.UserBase):
        hashed_password = bcrypt.hash(user.password.encode("utf-8"), bcrypt.gensalt())
        db_user = User(
            email=user.email, username=user.username, password=hashed_password
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return signJWT(db_user.id)
