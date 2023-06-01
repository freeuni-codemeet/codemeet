from pydantic import BaseSettings


class Configuration(BaseSettings):
    SERVER_PORT: int = 5000
    OPENVIDU_URL: str = "http://localhost:4443/"
    OPENVIDU_USERNAME: str = "OPENVIDUAPP"
    OPENVIDU_SECRET: str = "MY_SECRET"

    # class Config:
    #     env_file = "../.env"


def get_settings() -> Configuration:
    return Configuration()
