const appSyncHelper = require('../src/appsync-helper');

const appsync = require('aws-appsync');
const { AWSAppSyncClient } = require('aws-appsync');
jest.mock('aws-appsync');

describe('AppSync Mutations Suite', function () {

  const mutationResponse = `"addSensor": {
    "value": null,
    "train_id": "70001",
    "tenant": "TenantA",
    "sensor_name": "Sensor1",
    "running_id": null,
    "mode_of_operation": null,
    "longitude": null,
    "latitude": null,
    "headcode": null,
    "datetime_utc": null,
    "closest_station": null
  }`;

  beforeAll(() => {
    process.env.SENSOR_TABLE_NAME = "sensor_values";
    process.env.APPSYNC_URL = "asdasd";
    process.env.AWS_REGION = "eu-central-1";

    const mutate = jest.fn().mockImplementation((options) => {
      return new Promise({
        resolve: () => mutationResponse
      });
    });



    appsync.AWSAppSyncClient.mockImplementation(() => ({
      mutate: mutate
    }));
  });

  it("Should return mutation response", async () => {
    const graphqlClient = new AWSAppSyncClient({ url: process.env.APPSYNC_URL, region: process.env.AWS_REGION, auth: { type: 'AWS_IAM' }, disableOffline: true });
    const dbRecord = {
      "state": "bayern",
      "city": "Munich",
      "parking_spaces": 10,
      "air_pollution": 8,
      "photovoltaic": 9,
      "datetime_utc": "2022-01-24T10:58:25.845"
    };

    var response = appSyncHelper.executeMutation(graphqlClient, 'sensor_values', 'INSERT', dbRecord);
    console.log(response);
    //expect(response).resolves.toEqual(mutationResponse);
  });
});