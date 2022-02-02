/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addCity = /* GraphQL */ `
  mutation AddCity($city: CityInput!) {
    addCity(city: $city) {
      state
      city
      parking_spaces
      air_pollution
      photovoltaic
      biogas
      datetime_utc
    }
  }
`;
export const updateCity = /* GraphQL */ `
  mutation UpdateCity($city: CityInput!) {
    updateCity(city: $city) {
      state
      city
      parking_spaces
      air_pollution
      photovoltaic
      biogas
      datetime_utc
    }
  }
`;
export const deleteCity = /* GraphQL */ `
  mutation DeleteCity($city: CityInput!) {
    deleteCity(city: $city) {
      state
      city
      parking_spaces
      air_pollution
      photovoltaic
      biogas
      datetime_utc
    }
  }
`;
