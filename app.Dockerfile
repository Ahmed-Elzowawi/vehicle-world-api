FROM node:21.5-alpine3.18

WORKDIR /app

COPY ./package.json ./

RUN npm install

CMD [ "npm", "run", "dev" ]
