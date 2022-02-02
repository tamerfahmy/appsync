"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCity = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
var getCity =
/* GraphQL */
"\n  query GetCity($filter: CityFilterInput, $limit: Int, $nextToken: String) {\n    getCity(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        state\n        city\n        parking_spaces\n        air_pollution\n        photovoltaic\n        biogas\n        datetime_utc\n      }\n      nextToken\n    }\n  }\n";
exports.getCity = getCity;