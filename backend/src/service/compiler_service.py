import requests
import os
from backend.src.config.config import get_settings

config = get_settings()

class CompilerService:

    def compile_code(encoded_code: str):

        url = config.SERVER_URL

        querystring = {"base64_encoded": "true", "fields": "*"}

        payload = {
            "language_id": 52,
            "source_code": encoded_code,
            "stdin": ""
        }
        headers = {
            "content-type": "application/json",
            "Content-Type": "application/json",
            # "X-RapidAPI-Key": secret_key,
            # "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }

        response = requests.post(url, json=payload, headers=headers, params=querystring)

        token_value = response.json()['token']
        url += "/" + token_value

        headers = {
            # "X-RapidAPI-Key": secret_key,
            # "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
        final_response = requests.get(url, headers=headers, params=querystring)
        output = final_response.json()['stdout']
        return output
