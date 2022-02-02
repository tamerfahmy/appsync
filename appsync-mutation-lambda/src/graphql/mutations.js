"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCity = exports.deleteCity = exports.addCity = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
var addCity =
/* GraphQL */
"\n  mutation AddCity($city: CityInput!) {\n    addCity(city: $city) {\n      state\n      city\n      parking_spaces\n      air_pollution\n      photovoltaic\n      biogas\n      datetime_utc\n    }\n  }\n";
exports.addCity = addCity;
var updateCity =
/* GraphQL */
"\n  mutation UpdateCity($city: CityInput!) {\n    updateCity(city: $city) {\n      state\n      city\n      parking_spaces\n      air_pollution\n      photovoltaic\n      biogas\n      datetime_utc\n    }\n  }\n";
exports.updateCity = updateCity;
var deleteCity =
/* GraphQL */
"\n  mutation DeleteCity($city: CityInput!) {\n    deleteCity(city: $city) {\n      state\n      city\n      parking_spaces\n      air_pollution\n      photovoltaic\n      biogas\n      datetime_utc\n    }\n  }\n";
exports.deleteCity = deleteCity;