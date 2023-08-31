import time
import uuid

import jwt
from pydantic.dataclasses import dataclass

from backend.src.exception.exceptions import SessionNotFoundException
from backend.src.openvidu.openvidu_connector import OpenviduConnector, OpenviduRole

# TODO move those in .env
JWT_SECRET = "SECRET_KEY"
JWT_ALGORITHM = "HS256"


@dataclass
class CreateSessionResponse:
    sessionId: str
    secretToken: str


class OpenviduService:
    def __init__(self, openvidu_connector: OpenviduConnector):
        self.openvidu_connector = openvidu_connector

    def _signJwt(self, openviduRole: OpenviduRole) -> str:
        payload = {
            "permission": openviduRole.name,
            "expiry": time.time() + 600
        }
        token = jwt.encode(payload=payload, key=JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token

    def _verifyJwt(self, token: str) -> bool:
        decoded = jwt.decode(jwt=token, key=JWT_SECRET, algorithm=JWT_ALGORITHM)
        return decoded.get("permission") == OpenviduRole.MODERATOR.name  # TODO check expiry

    async def create_session(self) -> CreateSessionResponse:
        session_id = str(uuid.uuid4())
        response = await self.openvidu_connector.create_session(session_id)
        response.raise_for_status()
        response_json = response.json()
        return CreateSessionResponse(str(response_json["sessionId"]), self._signJwt(OpenviduRole.MODERATOR))

    async def create_connection(
            self,
            session_id: str,
            secret_token: str | None
    ) -> str:
        is_moderator = secret_token is not None and self._verifyJwt(secret_token)
        response = await self.openvidu_connector.create_connection(session_id, OpenviduRole.MODERATOR if is_moderator else OpenviduRole.PUBLISHER)
        if response.status_code == 404:
            raise SessionNotFoundException(f"Session with id {session_id} not found")
        response_json = response.json()
        return str(response_json["token"])

    async def join_session(self, session_id: str) -> str:
        response = await self.openvidu_connector.get_session_info(session_id)
        if response.status_code == 404:
            raise SessionNotFoundException(f"Session with id {session_id} not found")
        return session_id
