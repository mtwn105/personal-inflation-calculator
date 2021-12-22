FROM node:latest

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . /

EXPOSE 3000

ENTRYPOINT npm run start