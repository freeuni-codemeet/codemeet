import base64

from fastapi import APIRouter
from backend.src.service.compiler_service import CompilerService

compiler_router = APIRouter(prefix="/api/compiler")


@compiler_router.get("/compile")
def compile_code(language_id: int, code: str):
    encoded_code = base64.b64encode(code.encode('utf-8')).decode('utf-8')
    return CompilerService.compile_code(language_id, encoded_code)