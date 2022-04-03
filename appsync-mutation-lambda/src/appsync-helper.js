const gql = require('graphql-tag');
require('cross-fetch/polyfill');
const Mutation = require('./graphql/mutations');
const debug = require('./debugger');

/**
 * Runs an appsync mutation with the passed dynamodb item
 * @param {the source dynamodb table name} ddbTable 
 * @param {the source dynamodb table event name "INSERT, MODIFY, DELETE"} eventName
 * @param {the dynamodb item to mutate to appsync} jsonItem 
 * @returns appsync mutation response
 */
function executeMutation(graphqlClient, ddbTable, eventName, jsonItem) {
    try {
        if (!ddbTable) throw new Error("Table name is invalid");
        if (!process.env.APPSYNC_URL) throw new Error("APPSYNC_URL is not defined");

        checkValidTableName(ddbTable, eventName);
        const mutationQuery = resolveMutation(ddbTable, eventName);
        const mutationVariable = resolveMutationVariable(ddbTable, jsonItem);

        if (!mutationQuery || !mutationVariable) {
            console.log(`Failed to retrieve mutation query or variable for dynamodb record`)
        }
        else {
            // creating mutation object
            const mutation = gql(mutationQuery);
            debug('mutation resolved');

            // promise of sending mutation to appsync
            console.log(mutation);
            console.log(mutationVariable);
            
            return graphqlClient.mutate({ mutation: mutation, variables: mutationVariable, fetchPolicy: 'no-cache' });
            return null;
        }
    } catch (err) {
        console.log("Error while trying to execute appsync mutation", err);
        return;
    }
}

/**
 * Gets the respective mutation query for the passed dynamodb table name
 * @param {Dynamodb table name} ddbTable
 * @param {the source dynamodb table event name "INSERT, MODIFY, DELETE"} eventName
 * @returns the respective mutation query
 */
function resolveMutation(ddbTable, eventName) {
    let mutation;
    switch (ddbTable) {
        case process.env.SENSOR_TABLE_NAME:
            {
                switch (eventName) {
                    case "INSERT":
                        mutation = Mutation.addCity;
                        break;
                    case "MODIFY":
                        mutation = "\n  mutation UpdateCity($city: CityInput!) {\n    updateCity(city: $city) {\n      city\n    }\n  }\n";;
                        break;
                    case "REMOVE":
                        mutation = Mutation.deleteCity;
                        break;
                }
                break;
            }
    }

    return mutation;
}

/**
 * 
 * @param {Dynamodb table name} ddbTable
 * @param {the json item to send to mutation} jsonItem 
 * @returns mutation variable
 */
function resolveMutationVariable(ddbTable, jsonItem) {
    console.log(jsonItem);
    switch (ddbTable) {
        case process.env.SENSOR_TABLE_NAME:
            {
                return { city: jsonItem }
            }
        default:
            return;
    }
}

/**
 * 
 * @param {Dynamodb table name} ddbTable
 * @returns if the table name is unknown
 */
function checkValidTableName(ddbTable, eventName) {
    debug("SENSOR_VALUES_TABLE_NAME", process.env.SENSOR_TABLE_NAME);

    if (!eventName || (eventName !== "INSERT" && eventName !== "MODIFY" && eventName !== "REMOVE")) {
        console.log("Invalid dynamodb event name");
        return;
    }

    if (!ddbTable || (ddbTable !== process.env.SENSOR_TABLE_NAME )) {
        console.log("Invalid dynamodb table name");
        return;
    }
}

module.exports = {
    executeMutation: executeMutation,
    resolveMutation: resolveMutation
};