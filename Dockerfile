FROM node:8-alpine

ENV API_PORT 8888

WORKDIR /app
COPY . /app

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
