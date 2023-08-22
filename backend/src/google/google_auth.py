from fastapi.middleware.cors import CORSMiddleware
from google.auth.transport import requests
from google.oauth2 import id_token
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request

from backend.src.api.auth_router import auth_router
from backend.src.app.app import app

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
    try:
        user = id_token.verify_oauth2_token(token, requests.Request(),
                                            "116988546-2a283t6anvr0.apps.googleusercontent.com")
        request.session['user'] = dict({
            "email": user["email"]
        })
        return user['name'] + ' Logged In successfully'

    except ValueError:
        return "unauthorized"


@auth_router.get('/')
def check(request: Request):
    return "hi " + str(request.session.get('user')['email'])
