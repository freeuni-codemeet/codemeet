import os
import time

import jwt

JWT_SECRET = os.getenv('secret')
JWT_ALGORITHM = os.getenv('algorithm')


def token_response(token: str):
    return {
        "access token": token
    }


def signJWT(userID: int):
    payload = {
        "userID": userID,
        "expiry": time.time() + 600
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


