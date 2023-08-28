from google.auth.transport import requests
from google.oauth2 import id_token
from starlette.requests import Request


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


def check(request: Request):
    return "hi " + str(request.session.get('user')['email'])
