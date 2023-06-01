import uuid
from typing import Any

from backend.src.exception.exceptions import SessionNotFoundException
from backend.src.openvidu.openvidu_connector import OpenviduConnector


class OpenviduService:
    def __init__(self, openvidu_connector: OpenviduConnector):
        self.openvidu_connector = openvidu_connector

    async def create_session(self) -> str:
        session_id = str(uuid.uuid4())
        response = await self.openvidu_connector.create_session(session_id)
        response.raise_for_status()
        response_json = response.json()
        return str(response_json["sessionId"])

    async def create_connection(
        self,
        session_id: str,
    ) -> str:
        response = await self.openvidu_connector.create_connection(session_id)
        if response.status_code == 404:
            raise SessionNotFoundException(f"Session with id {session_id} not found")
        response_json = response.json()
        return str(response_json["token"])

    async def join_session(self, session_id: str) -> str:
        response = await self.openvidu_connector.get_session_info(session_id)
        if response.status_code == 404:
            raise SessionNotFoundException(f"Session with id {session_id} not found")
        return session_id
