FROM node:14
COPY ./appinfo-lambda/. /app

WORKDIR /app

ENV NODE_ENV=development

RUN npm install

EXPOSE 8080

CMD [ "node", "local.js" ]