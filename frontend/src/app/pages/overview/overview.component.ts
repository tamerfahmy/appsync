import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { UserService } from '../../services/user.service';
import { OverviewService } from './overview.service';
import { City } from 'src/app/models/City';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  onAddCitySubscription!: Subscription;
  onUpdateCitySubscription!: Subscription;
  onDeleteCitySubscription!: Subscription;

  cities: City[] = [];
  selectedCity: City = {
    air_pollution: 0,
    biogas: 0,
    parking_spaces: 0,
    photovoltaic: 0,
    state: '',
    city: '',
    datetime_utc: ''
  };
  selectedCityVal: any = {};


  interval: any;

  constructor(private overviewService: OverviewService, private notificationService: NotificationService) {

   }

  async ngOnInit() {
    await this.loadCities();
    this.subscribeToAppSyncEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromEvents();
  }

  private async loadCities() {
    this.cities = await this.overviewService.getAllCities();
    this.selectedCity = this.cities[0];
  }

  /**
   * Subscribes to app sync events
   */
  private subscribeToAppSyncEvents() {
    this.onAddCitySubscription = this.overviewService.onAddCity().subscribe({
      next: newCity => this.handleOnAddCity(newCity),
      error: error => this.handleSubscriptionError(error)
    });

    this.onUpdateCitySubscription = this.overviewService.onUpdateCity().subscribe({
      next: updatedCity => this.handleOnUpdateCity(updatedCity),
      error: error => this.handleSubscriptionError(error)
    });

    this.onDeleteCitySubscription = this.overviewService.onDeleteCity().subscribe({
      next: deletedCity => this.handleOnDeleteCity(deletedCity),
      error: error => this.handleSubscriptionError(error)
    });
  }

  /**
   * Unsubscribes from events
   */
  private unsubscribeFromEvents() {
    if (this.onAddCitySubscription) { this.onAddCitySubscription.unsubscribe(); }
    if (this.onUpdateCitySubscription) { this.onUpdateCitySubscription.unsubscribe(); }
    if (this.onDeleteCitySubscription) { this.onDeleteCitySubscription.unsubscribe(); }
  }

    async handleOnAddCity(newCity: any) {
    if (newCity['data'] && newCity['data']?.onAddCity && newCity['data']?.onAddCity?.city) {
      const city = newCity['data'].onAddCity.city;
      let currentCities = this.cities?.filter(t => t.city === city);
      if (currentCities && currentCities.length > 0) { // if the added value belongs to a city already exists on the page
        this.overviewService.convertToUIModel(newCity['data'].onAddCity, currentCities[0]);
      } else { // if the added value is for another City which is not on the page
        let newCityUIModel = this.overviewService.convertToUIModel(newCity['data'].onAddCity);
        this.cities.push(newCityUIModel);
      }
    }
  }

  async handleOnUpdateCity(updatedCity: any) {
    if (updatedCity['data'] && updatedCity['data'].onUpdateCity && updatedCity['data']?.onUpdateCity?.city) {
      const city = updatedCity['data'].onUpdateCity.city;

      let currentCities = this.cities?.filter(t => t.city === city);
      if (currentCities && currentCities.length > 0) { // if the updated value belongs to a city already exists on the page
        this.overviewService.convertToUIModel(updatedCity['data'].onUpdateCity, currentCities[0]);
      } else { // if the updated value is for another city which is not on the page
        let newCityUIModel = this.overviewService.convertToUIModel(updatedCity['data'].onUpdateCity);
        this.cities.push(newCityUIModel);
      }
    }
  }

  async handleOnDeleteCity(deletedCity: any) {
    if (deletedCity['data'] && deletedCity['data'].onDeleteCity && deletedCity['data']?.onDeleteCity?.city) {
      const city = deletedCity['data'].onDeleteCity.city;
      let currentCities = this.cities?.filter(t => t.city === city);

      if (currentCities && currentCities.length > 0) { // if the deleted value belongs to a city already exists on the page
        // remove the city from the list
        const index = this.cities.findIndex(c => c.city == city);
        this.cities.splice(index, 1);
      }
    }
  }

  /**
   * Handles AppSync subscription errors
   * @param error
   */
  handleSubscriptionError(error: any) {
    this.notificationService.showError('Error', 'Error occurred during updating page contents!')
    console.log(error);
  }

  getCurrentCity(): City {
    return this.cities[0];
  }

  getCities() {
    return this.cities.map(c=> ({ name: c.city, code: c.city}));
  }

  selectedCityChanged(event:any) {
    this.selectedCity = this.cities.filter(c=> c.city == event.value.name )[0];
  }
}
