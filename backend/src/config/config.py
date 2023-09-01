from pydantic import BaseSettings


class Configuration(BaseSettings):
    PORT: int
    OPENVIDU_URL: str
    OPENVIDU_USERNAME: str
    OPENVIDU_SECRET: str
    SERVER_URL: str

    class Config:
        env_file = ".env"


def get_settings() -> Configuration:
    return Configuration()
