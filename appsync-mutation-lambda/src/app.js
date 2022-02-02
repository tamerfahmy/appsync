const AWS = require('aws-sdk');
const { AWSAppSyncClient } = require('aws-appsync');
const appSyncHelper = require('./appsync-helper');
const debug = require('./debugger');

AWS.config.update({ region: process.env.REGION, credentials: new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_SESSION_TOKEN) });
const credentials = AWS.config.credentials;

/**
 * Dynamodb event handler
 * @param {Dynamodb event} event 
 * @returns 
 */
const app = async (event, context, callback) => {
    debug("######## new event ########");
    debug("Records count ", event.Records.length);
    let mutationPromises = [];
    // creating appsync client
    const graphqlClient = new AWSAppSyncClient({ url: process.env.APPSYNC_URL, region: process.env.AWS_REGION, auth: { type: 'AWS_IAM', credentials: credentials }, disableOffline: true });
    debug('appSync client created');
    // loop on affected db records
    for (const record of event.Records) {
        debug("######## new record ########");
        try {
            // get dynamodb table name from record eventSourceArn
            const ddbARN = record.eventSourceARN;
            const ddbTable = ddbARN.split(':')[5].split('/')[1];

            // validate if table name can be fetched from the source ARN
            if (!ddbTable) {
                console.log(`Failed to get record dynamodb table name from source ARN ${ddbARN}`);
                continue;
            }

            debug('dynamodb table name', ddbTable);
            debug('dynamodb event name', record.eventName);
            let dbItem;
            // get the new/old dynamodb item image
            switch (record.eventName) {
                case 'INSERT':
                case 'MODIFY':
                    dbItem = record.dynamodb.NewImage;
                    break;
                case 'REMOVE':
                    dbItem = record.dynamodb.OldImage;
                    break;
            }

            // validate if new db item is fetched from the event
            if (!dbItem) {
                console.log(`Can't find db item image for db record ${JSON.stringify(record)}`);
                continue;
            }

            // convert dynamodb record to JSON object
            const jsonItem = AWS.DynamoDB.Converter.unmarshall(dbItem);
            console.log(ddbTable);
            console.log(jsonItem);
            console.log(record.eventName);

            // get promise for sending a new mutation to appsync with the dynamodb item 
            let promise = appSyncHelper.executeMutation(graphqlClient, ddbTable, record.eventName, jsonItem);
            mutationPromises.push(promise);
        } catch (err) {
            console.log("Failed to process dynamodb item", err);
            continue;
        }
    } // End looping on records

    if (mutationPromises.length > 0) {
        debug('Processing all appsync promises with length: ', mutationPromises.length);
        await Promise.all(mutationPromises);
        debug('Appsync promises processed: ');
        return { statusCode: 200, body: JSON.stringify({ message: 'ok' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: 'ok' }) };
};


module.exports = app;