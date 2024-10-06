FROM node:21.5-alpine3.18

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "run", "dev" ]
