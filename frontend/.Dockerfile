FROM docker.siemens.com/evo-uk-digital-cloud-projects/incident-management/zulu-node-sls-angular
RUN mkdir -p /app
COPY ./. /app/.

WORKDIR /app/appinfo-lambda
RUN npm install

WORKDIR /app/appsync-mutation-lambda
RUN npm install

WORKDIR /app/frontend
RUN npm install
RUN sls dynamodb install

ENV SLS_DEBUG=true
ENV DYNAMO_ENDPOINT=http://localhost:8000
ENV AWS_ACCESS_KEY_ID=fakeMyKeyId
ENV AWS_SECRET_ACCESS_KEY=fakeSecretAccessKey

# AppSync
EXPOSE 20002
# AppSync ws
EXPOSE 20003
# api gateway
EXPOSE 3000
# dynamodb
EXPOSE 8000
# dynamodb ui
EXPOSE 8001
# anglar frontend app in dev mode
EXPOSE 4200

ENTRYPOINT ["npm","run","docker:start:dev"]
