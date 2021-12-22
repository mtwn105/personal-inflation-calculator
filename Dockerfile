FROM node:14.15.5-alpine

WORKDIR /app

RUN mkdir frontend

RUN ls -lart

RUN pwd

COPY /frontend/package.json ./frontend
COPY /frontend/package-lock.json ./frontend

RUN cd /frontend

RUN npm install -g @angular/cli@12.0.1
RUN npm install

RUN cd ..

COPY /frontend/. /frontend/.

RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN cd /frontend
RUN ng build

RUN pwd

RUN ls -lart

RUN cd ..

RUN mkdir backend

COPY /backend/package.json /backend
COPY /backend/package-lock.json /backend

RUN npm install

COPY /backend/. /backend/.

RUN pwd

COPY /frontend/dist/frontend /backend/public/frontend/.

EXPOSE 3000

ENTRYPOINT npm run start