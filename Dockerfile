FROM node:14.15.5-alpine

WORKDIR /frontend

# RUN mkdir frontend

# RUN ls -lart

# RUN pwd

COPY /frontend/package.json .
COPY /frontend/package-lock.json .

# RUN cd /frontend

RUN npm install -g @angular/cli@12.0.1
RUN npm install

# RUN cd ..

COPY /frontend/. .

RUN export NODE_OPTIONS=--openssl-legacy-provider
# RUN cd /frontend
RUN ng build

# RUN pwd

# RUN ls -lart

# RUN cd ..

# RUN mkdir backend

WORKDIR /backend

COPY /backend/package.json .
COPY /backend/package-lock.json .

RUN npm install

COPY /backend/. .

RUN pwd

RUN cp -R /frontend/dist/frontend /backend/public/.

EXPOSE 3000

ENTRYPOINT npm run start