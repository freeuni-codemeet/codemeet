class SessionNotFoundException(Exception):
    def __init__(self, message: str):
        self.message = message
        self.code = "SESSION_NOT_FOUND"
