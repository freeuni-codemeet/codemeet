from fastapi.middleware.cors import CORSMiddleware

from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request

from backend.src.api.auth_router import auth_router
from backend.src.app.app import app

from backend.src.service import google_auth_service

origins = [
    "http://localhost:3000",
]

app.add_middleware(SessionMiddleware, secret_key='maihoonjiyan')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@auth_router.get("/login/auth")
def authentication(request: Request, token: str):
    return google_auth_service.authentication(request, token)


@auth_router.get('/')
def check(request: Request):
    return google_auth_service.check(request)
