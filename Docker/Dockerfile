FROM node:20-slim AS builder

WORKDIR /app

COPY frontend/ .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "dev"]