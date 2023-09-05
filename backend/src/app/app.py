from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.src.api.auth_router import auth_router
from backend.src.api.code_execution_router import code_execution_router
from backend.src.api.openvidu_router import openvidu_router
from backend.src.app.containers import Container


def create_application() -> FastAPI:
    application = FastAPI()
    container = Container()
    application.container = container

    application.include_router(openvidu_router)

    application.include_router(auth_router)

    application.include_router(code_execution_router)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application


app = create_application()
