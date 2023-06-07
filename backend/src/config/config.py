from pydantic import BaseSettings


class Configuration(BaseSettings):
    CORE_API_PORT: int
    OPENVIDU_URL: str
    OPENVIDU_USERNAME: str
    OPENVIDU_SECRET: str

    class Config:
        env_file = ".env"


def get_settings() -> Configuration:
    return Configuration()
