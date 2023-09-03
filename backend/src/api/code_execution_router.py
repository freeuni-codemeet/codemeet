import base64
from dataclasses import dataclass

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from backend.src.app.containers import Container
from backend.src.service.code_execution_service import CodeExecutionService

code_execution_router = APIRouter(prefix="/api/executor")


@dataclass
class ExecuteRequest:
    language_id: str
    source_code: str
    stdin: str


@code_execution_router.post("/execute")
@inject
async def execute(request: ExecuteRequest,
                  compiler_service: CodeExecutionService = Depends(Provide[Container.code_execution_service])):
    response = await compiler_service.execute(request.language_id, request.source_code, request.stdin)
    return response.json()
