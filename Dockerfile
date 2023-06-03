FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./backend /code/backend

COPY ./.env /code/backend/src/config/.env

ENV PORT=5000

CMD ["uvicorn", "backend.src.app.app:app", "--host", "0.0.0.0", "--port", "$PORT"]