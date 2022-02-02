import { Injectable } from '@angular/core';
import { getCity } from 'src/graphql/queries';
import {
    GetCityQuery,
    GetCityQueryVariables,
    OnAddCitySubscription,
    OnAddCitySubscriptionVariables,
    OnDeleteCitySubscription,
    OnDeleteCitySubscriptionVariables,
    OnUpdateCitySubscription,
    OnUpdateCitySubscriptionVariables
  } from 'src/graphql/types';
import gql from 'graphql-tag';
import { AppSyncService } from './app-sync.service';
import { onAddCity, onDeleteCity, onUpdateCity } from 'src/graphql/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private appSyncService: AppSyncService) { }

  getCities(vars?: GetCityQueryVariables): Promise<GetCityQuery> {
    return this.appSyncService.query<GetCityQuery, GetCityQueryVariables>({
      query: gql(getCity),
      variables: vars,
      fetchPolicy: 'network-only'
    });
  }

  onDeleteCity(vars: OnDeleteCitySubscriptionVariables) {
    return this.appSyncService.subscribe<OnDeleteCitySubscription, OnDeleteCitySubscriptionVariables>({
      query: gql(onDeleteCity),
      variables: vars,
      fetchPolicy: 'network-only'
    });
  }

  onAddCity(vars: OnAddCitySubscriptionVariables) {
    return this.appSyncService.subscribe<OnAddCitySubscription, OnAddCitySubscriptionVariables>({
      query: gql(onAddCity),
      variables: vars,
      fetchPolicy: 'network-only'
    });
  }

  onUpdateCity(vars: OnUpdateCitySubscriptionVariables) {
    return this.appSyncService.subscribe<OnUpdateCitySubscription, OnUpdateCitySubscriptionVariables>({
      query: gql(onUpdateCity),
      variables: vars,
      fetchPolicy: 'network-only'
    });
  }
}
