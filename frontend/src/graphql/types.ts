/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CityInput = {
  state: string,
  city: string,
  parking_spaces?: number | null,
  air_pollution?: number | null,
  photovoltaic?: number | null,
  biogas?: number | null,
  datetime_utc?: string | null,
};

export type CityFilterInput = {
  state?: StringFilterInput | null,
  city?: StringFilterInput | null,
  parking_spaces?: IntFilterInput | null,
  air_pollution?: FloatFilterInput | null,
  photovoltaic?: FloatFilterInput | null,
  biogas?: FloatFilterInput | null,
  datetime_utc?: StringFilterInput | null,
};

export type StringFilterInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
};

export type IntFilterInput = {
  between?: Array< number | null > | null,
  contains?: number | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notContains?: number | null,
};

export type FloatFilterInput = {
  between?: Array< number | null > | null,
  contains?: number | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notContains?: number | null,
};

export type AddCityMutationVariables = {
  city: CityInput,
};

export type AddCityMutation = {
  addCity:  {
    __typename: "City",
    state: string | null,
    city: string | null,
    parking_spaces: number | null,
    air_pollution: number | null,
    photovoltaic: number | null,
    biogas: number | null,
    datetime_utc: string | null,
  } | null,
};

export type UpdateCityMutationVariables = {
  city: CityInput,
};

export type UpdateCityMutation = {
  updateCity:  {
    __typename: "City",
    state: string | null,
    city: string | null,
    parking_spaces: number | null,
    air_pollution: number | null,
    photovoltaic: number | null,
    biogas: number | null,
    datetime_utc: string | null,
  } | null,
};

export type DeleteCityMutationVariables = {
  city: CityInput,
};

export type DeleteCityMutation = {
  deleteCity:  {
    __typename: "City",
    state: string | null,
    city: string | null,
    parking_spaces: number | null,
    air_pollution: number | null,
    photovoltaic: number | null,
    biogas: number | null,
    datetime_utc: string | null,
  } | null,
};

export type GetCityQueryVariables = {
  filter?: CityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetCityQuery = {
  getCity:  {
    __typename: "CityConnection",
    items:  Array< {
      __typename: "City",
      state: string | null,
      city: string | null,
      parking_spaces: number | null,
      air_pollution: number | null,
      photovoltaic: number | null,
      biogas: number | null,
      datetime_utc: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnAddCitySubscriptionVariables = {
  state: string,
};

export type OnAddCitySubscription = {
  onAddCity:  {
    __typename: "City",
    state: string | null,
    city: string | null,
    parking_spaces: number | null,
    air_pollution: number | null,
    photovoltaic: number | null,
    biogas: number | null,
    datetime_utc: string | null,
  } | null,
};

export type OnUpdateCitySubscriptionVariables = {
  state: string,
};

export type OnUpdateCitySubscription = {
  onUpdateCity:  {
    __typename: "City",
    state: string | null,
    city: string | null,
    parking_spaces: number | null,
    air_pollution: number | null,
    photovoltaic: number | null,
    biogas: number | null,
    datetime_utc: string | null,
  } | null,
};

export type OnDeleteCitySubscriptionVariables = {
  state: string,
};

export type OnDeleteCitySubscription = {
  onDeleteCity:  {
    __typename: "City",
    state: string | null,
    city: string | null,
    parking_spaces: number | null,
    air_pollution: number | null,
    photovoltaic: number | null,
    biogas: number | null,
    datetime_utc: string | null,
  } | null,
};
