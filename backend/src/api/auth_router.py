from dependency_injector.wiring import inject
from fastapi import APIRouter, Depends

from ..service.auth_service import AuthService
from ..database import user

auth_router = APIRouter(prefix="/api/users")


@auth_router.post("/add")
@inject
def add_user(user: user.UserCreate, auth_service: AuthService = Depends()):
    return auth_service.add_user(user)


@auth_router.get("/getUser")
@inject
def get_user(usernameOrEmail: str, auth_service: AuthService = Depends()):
    return auth_service.get_user(usernameOrEmail)
