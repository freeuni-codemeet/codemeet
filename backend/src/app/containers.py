from dependency_injector import containers, providers

from backend.src.config.config import Configuration
from backend.src.openvidu.openvidu_connector import OpenviduConnector
from backend.src.service.openvidu_service import OpenviduService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(modules=["..api.openvidu_router"])

    configuration = providers.Singleton(Configuration)

    openvidu_connector = providers.Singleton(OpenviduConnector, configuration)

    openvidu_service = providers.Singleton(OpenviduService, openvidu_connector)
