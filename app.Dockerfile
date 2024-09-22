FROM node:21.5-alpine3.18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY ./ /app

CMD [ "npm", "run", "dev" ]
