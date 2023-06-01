import httpx
from httpx import Response
from pydantic import Json

from backend.src.config.config import Configuration


class OpenviduConnector:
    def __init__(self, configuration: Configuration):
        self.configuration = configuration

    async def get_session_info(self, session_id: str) -> Response:
        async with httpx.AsyncClient() as client:
            return await client.get(
                f"{self.configuration.OPENVIDU_URL}openvidu/api/sessions/{session_id}",
                auth=(
                    self.configuration.OPENVIDU_USERNAME,
                    self.configuration.OPENVIDU_SECRET,
                ),
            )

    async def create_session(self, session_id: str) -> Response:
        async with httpx.AsyncClient() as client:
            return await client.post(
                f"{self.configuration.OPENVIDU_URL}openvidu/api/sessions",
                json={"customSessionId": session_id},
                headers={"Content-type": "application/json"},
                auth=(
                    self.configuration.OPENVIDU_USERNAME,
                    self.configuration.OPENVIDU_SECRET,
                ),
            )

    async def create_connection(self, session_id: str) -> Response:
        async with httpx.AsyncClient() as client:
            return await client.post(
                f"{self.configuration.OPENVIDU_URL}openvidu/api/sessions/{session_id}/connection",
                json={},
                headers={"Content-type": "application/json"},
                auth=(
                    self.configuration.OPENVIDU_USERNAME,
                    self.configuration.OPENVIDU_SECRET,
                ),
            )
