import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';
import { GetCityQuery, OnAddCitySubscription, OnDeleteCitySubscription, OnUpdateCitySubscription } from 'src/graphql/types';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private cityService: CityService, private userService: UserService) { }

  /**
   * Gets all cities for page load
   * @returns
   */
  async getAllCities(): Promise<City[]> {
    let cities = await this.getCities();
    if (cities && cities.getCity && cities.getCity.items) {
      const citiesUiModels = cities.getCity.items.map(item => this.convertToUIModel(item));
      return citiesUiModels;
    }
    return [];
  }

  onAddCity(): Observable<OnAddCitySubscription> {
    return this.cityService.onAddCity({ state: this.userService.getUserTenant() });
  }

  onUpdateCity(): Observable<OnUpdateCitySubscription> {
    return this.cityService.onUpdateCity({ state: this.userService.getUserTenant() });
  }

  onDeleteCity(): Observable<OnDeleteCitySubscription> {
    return this.cityService.onDeleteCity({ state: this.userService.getUserTenant() });
  }

  convertToUIModel(item: any, currentCity?: City): City {
    if(!currentCity)
    {
      return {
        state: item.state,
        city : item.city,
        parking_spaces: item.parking_spaces,
        air_pollution: item.air_pollution,
        photovoltaic: item.photovoltaic,
        biogas : item.biogas,
        datetime_utc: item.datetime_utc
      };
    } else {
      currentCity.state = item.state,
      currentCity.city = item.city,
      currentCity.parking_spaces = item.parking_spaces,
      currentCity.air_pollution = item.air_pollution,
      currentCity.photovoltaic = item.photovoltaic,
      currentCity.biogas = item.biogas,
      currentCity.datetime_utc = item.datetime_utc

      return currentCity;
    }
  }


  private async getCities(): Promise<GetCityQuery> {
    return await this.cityService.getCities({ limit: 10000 });
  }
}
