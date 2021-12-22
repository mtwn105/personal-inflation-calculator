FROM node:14.15.5-alpine

WORKDIR /frontend

COPY /frontend/package.json .
COPY /frontend/package-lock.json .

RUN npm install -g @angular/cli@12.0.1
RUN npm install

COPY /frontend/. .

RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN ng build

RUN pwd

WORKDIR ../backend

COPY /backend/package.json .
COPY /backend/package-lock.json .

RUN npm install

COPY /backend/. .

RUN pwd

COPY ../frontend/dist/frontend ./public/frontend

EXPOSE 3000

ENTRYPOINT npm run start