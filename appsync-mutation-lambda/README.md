# appsync-mutation-lambda
## Summary

This lambda function implementation is responsible to execute AppSync respective depending on dynamodb tables changes. This lambda function should transform the dynamodb events from dynamodb streams to AppSync mutations to inform AppSync subscribers about the dynamodb table updates which was done not through the AppSync mutations but directly throw the database itself or throw aws-sdk.

## Project Structure

This project is a nodejs project with `jest` as a testing framework.

## Development
1. Clone the repository
2. Use VSCode or any other code editor
3. Run `npm install`
4. Run `npm install -g grunt-cli` later needed if you want to zip the project for AWS deployment
5. Run `npm install -g @aws-amplify/cli@4.23.1` needed for code generation out of AppSync schema.graphql as in (step 7)
6. Run `npm run import-schema` for importing `schema.graphql` from root schema folder `../appsync/schema.graphql` to local project root directory, This is required only if generation of graphql objects is required in case of change of the AppSync schema
7. Run `npm run codegen` this will import schema as before step + running `amplify codegen` to generate *.js files for the types, mutations, quires and subscriptions as defined in the `schema.graphql` file.
8. Run `npm run test` to run the tests within the project
9.  Run `npm run build` will regenerate the graphql schema types and run the tests and finally zip the project for AWS lambda deployment

On the root of the project there one main entry point `lambda.js` and the logic for handling dynamodb event are in the `src` folder.

### Amplify
`Amplify` is used in this project to generate *.js files for the types, mutations, quires and subscriptions as defined in the `schema.graphql` file to assure that the lambda implementation meets the AppSync schema.

The features of this framework is much bigger than this which could include AppSync API deployments as well and could also enable the capability to MOCK the aws environment locally in development or testing scenarios.

For more information about `Amplify`, https://docs.amplify.aws/, https://docs.amplify.aws/cli/graphql-transformer/codegen#statement-depth

### Jest
Projects tests are build using `jest` framework, for more information https://jestjs.io/docs/en/getting-started.html

### Expectations
This lambda function expected to be hocked on dynamodb stream to recive old,new images and to have the right permissions on dynamodb as well as target AppSync API.

This lambda function will loop throw dynamodb events and execute an AppSync mutation for each affected record to dynamodb.

## Deployment to Lambda
### Packaging
You can package the source files locally using `npm run build` and the package zip file will be created under `dist` folder.


### Required information for AWS Lambda function
1. The entry point for the lambda function is `lambda.handler`
2. Attach the lambda function to dynamodb tables throw dynamodb streams.
3. Enable the required permissions to dynamodb as well as AppSync APIs.
4. AppSync schema must be equal to the `schema.graphql` attached with this project.
5. Environment variables must be set on the Lambda function
   a. `APPSYNC_URL={The AppSync API URL}`
   b. `DEBUG=false`
   c. `SENSOR_VALUES_TABLE_NAME={Sensor Values dynamodb table name}`