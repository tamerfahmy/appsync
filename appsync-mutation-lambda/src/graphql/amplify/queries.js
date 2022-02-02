/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCity = /* GraphQL */ `
  query GetCity($filter: CityFilterInput, $limit: Int, $nextToken: String) {
    getCity(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        state
        city
        parking_spaces
        air_pollution
        photovoltaic
        biogas
        datetime_utc
      }
      nextToken
    }
  }
`;
