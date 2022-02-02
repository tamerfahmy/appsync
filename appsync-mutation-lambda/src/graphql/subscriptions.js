"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUpdateCity = exports.onDeleteCity = exports.onAddCity = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
var onAddCity =
/* GraphQL */
"\n  subscription OnAddCity($state: String!) {\n    onAddCity(state: $state) {\n      state\n      city\n      parking_spaces\n      air_pollution\n      photovoltaic\n      biogas\n      datetime_utc\n    }\n  }\n";
exports.onAddCity = onAddCity;
var onUpdateCity =
/* GraphQL */
"\n  subscription OnUpdateCity($state: String!) {\n    onUpdateCity(state: $state) {\n      state\n      city\n      parking_spaces\n      air_pollution\n      photovoltaic\n      biogas\n      datetime_utc\n    }\n  }\n";
exports.onUpdateCity = onUpdateCity;
var onDeleteCity =
/* GraphQL */
"\n  subscription OnDeleteCity($state: String!) {\n    onDeleteCity(state: $state) {\n      state\n      city\n      parking_spaces\n      air_pollution\n      photovoltaic\n      biogas\n      datetime_utc\n    }\n  }\n";
exports.onDeleteCity = onDeleteCity;