import httpx
from httpx import Response

from backend.src.config.config import Configuration


class CodeExecutionService:
    def __init__(self, configuration: Configuration):
        self.configuration = configuration

    async def execute(
        self, language_id: int, encoded_code: str, stdin: str
    ) -> Response:
        payload = {
            "language_id": language_id,
            "source_code": encoded_code,
            "stdin": stdin,
        }

        headers = {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Key": self.configuration.JUDGE0_RAPID_API_KEY,
            "X-RapidAPI-Host": self.configuration.JUDGE0_RAPID_API_HOST,
        }

        async with httpx.AsyncClient() as client:
            return await client.post(
                self.configuration.JUDGE0_RAPID_API_EXECUTOR_ENDPOINT_URL,
                json=payload,
                headers=headers,
            )
