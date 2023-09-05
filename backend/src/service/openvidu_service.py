import time
import uuid

import jwt
from pydantic.dataclasses import dataclass

from backend.src.config.config import Configuration
from backend.src.exception.exceptions import SessionNotFoundException
from backend.src.openvidu.openvidu_connector import OpenviduConnector, OpenviduRole

JWT_ALGORITHM = "HS256"


@dataclass
class CreateSessionResponse:
    sessionId: str
    secretToken: str


class OpenviduService:
    def __init__(
        self, openvidu_connector: OpenviduConnector, configuration: Configuration
    ):
        self.openvidu_connector = openvidu_connector
        self.configuration = configuration

    def _signJwt(self, session_id: str, openviduRole: OpenviduRole) -> str:
        payload = {
            "sessionId": session_id,
            "permission": openviduRole.name,
            "expiry": time.time() + 30,
        }
        token = jwt.encode(
            payload=payload, key=self.configuration.JWT_SECRET, algorithm=JWT_ALGORITHM
        )
        return token

    def _verifyJwt(self, session_id: str, token: str | None) -> bool:
        if token is None:
            return False
        decoded = jwt.decode(
            jwt=token, key=self.configuration.JWT_SECRET, algorithm=JWT_ALGORITHM
        )
        return (
            decoded.get("permission") == OpenviduRole.MODERATOR.name
            and decoded.get("sessionId") == session_id
        )  # TODO check expiry

    async def create_session(self) -> CreateSessionResponse:
        session_id = str(uuid.uuid4())
        response = await self.openvidu_connector.create_session(session_id)
        response.raise_for_status()
        response_json = response.json()
        return CreateSessionResponse(
            str(response_json["sessionId"]),
            self._signJwt(session_id=session_id, openviduRole=OpenviduRole.MODERATOR),
        )

    async def create_connection(self, session_id: str, secret_token: str | None) -> str:
        is_moderator = secret_token is not None and self._verifyJwt(
            session_id=session_id, token=secret_token
        )
        response = await self.openvidu_connector.create_connection(
            session_id,
            OpenviduRole.MODERATOR if is_moderator else OpenviduRole.PUBLISHER,
        )
        if response.status_code == 404:
            raise SessionNotFoundException(f"Session with id {session_id} not found")
        response_json = response.json()
        return str(response_json["token"])

    async def join_session(self, session_id: str) -> str:
        response = await self.openvidu_connector.get_session_info(session_id)
        if response.status_code == 404:
            raise SessionNotFoundException(f"Session with id {session_id} not found")
        return session_id
