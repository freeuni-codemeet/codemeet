from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from backend.src.app.containers import Container
from backend.src.service.openvidu_service import OpenviduService

openvidu_router = APIRouter(prefix="/api/sessions")


@openvidu_router.post("/create")
@inject
async def create_session(
    openvidu_service: OpenviduService = Depends(Provide[Container.openvidu_service]),
) -> str:
    return await openvidu_service.create_session()


@openvidu_router.post("/join/{session_id}")
@inject
async def join_session(
    session_id: str,
    openvidu_service: OpenviduService = Depends(Provide[Container.openvidu_service]),
) -> str:
    return await openvidu_service.join_session(session_id)


@openvidu_router.post("/{session_id}/connections/create")
@inject
async def create_connection(
    session_id: str,
    openvidu_service: OpenviduService = Depends(Provide[Container.openvidu_service]),
) -> str:
    return await openvidu_service.create_connection(session_id)
