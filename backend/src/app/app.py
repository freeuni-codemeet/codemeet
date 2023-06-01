from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.src.api.openvidu_router import openvidu_router
from backend.src.app.containers import Container


def create_application() -> FastAPI:
    application = FastAPI()
    container = Container()
    application.container = container

    application.include_router(openvidu_router)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application


app = create_application()
