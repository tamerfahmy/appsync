const appSyncHelper = require('../src/appsync-helper');
const Mutation = require('../src/graphql/mutations');

describe('Resolve AppSync Mutations', function () {
  beforeAll(() => {
    process.env.SENSOR_TABLE_NAME = "sensor_values";
  });

  it("Should return undefined when table name is unknown", () => {
    const mutation = appSyncHelper.resolveMutation("any_other_table", "INSERT");
    expect(mutation).toEqual(undefined);
  });

  it("Should return undefined when dynamodb event is unknown", () => {
    const mutation = appSyncHelper.resolveMutation("sensor_values", "any_event");
    expect(mutation).toEqual(undefined);
  });

  it("Should return the add sensor value mutation when table name is sensor_value and dynamodb event name is INSERT", () => {
    const actualMutation = appSyncHelper.resolveMutation("sensor_values", "INSERT");
    expect(actualMutation).toEqual(Mutation.addSensor);
  });

  it("Should return the update sensor value mutation when table name is sensor_value and dynamodb event name is MODIFY", () => {
    const actualMutation = appSyncHelper.resolveMutation("sensor_values", "MODIFY");
    expect(actualMutation).toEqual(Mutation.updateSensor);
  });

  it("Should return the delete sensor value mutation when table name is sensor_value and dynamodb event name is REMOVE", () => {
    const actualMutation = appSyncHelper.resolveMutation("sensor_values", "REMOVE");
    expect(actualMutation).toEqual(Mutation.deleteSensor);
  });
});