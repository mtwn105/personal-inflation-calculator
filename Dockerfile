FROM node:latest

WORKDIR /frontend

COPY /frontend/package.json .
COPY /frontend/package-lock.json .

RUN npm install -g @angular/cli@12.0.1
RUN npm install

COPY /frontend/. .

RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN ng build

WORKDIR ../backend

COPY /backend/package.json .
COPY /backend/package-lock.json .

RUN npm install

COPY /backend/. .
COPY /frontend/dist/frontend /backend/public/frontend

EXPOSE 3000

ENTRYPOINT npm run start