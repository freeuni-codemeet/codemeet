import uvicorn as uvicorn

from backend.src.app.app import app
from backend.src.config.config import get_settings

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=get_settings().CORE_API_PORT)
