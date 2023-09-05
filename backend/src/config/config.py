from pydantic import BaseSettings


class Configuration(BaseSettings):
    PORT: int
    OPENVIDU_URL: str
    OPENVIDU_USERNAME: str
    OPENVIDU_SECRET: str
    JUDGE0_RAPID_API_EXECUTOR_ENDPOINT_URL: str
    JUDGE0_RAPID_API_KEY: str
    JUDGE0_RAPID_API_HOST: str
    JWT_SECRET: str

    class Config:
        env_file = ".env"


def get_settings() -> Configuration:
    return Configuration()
