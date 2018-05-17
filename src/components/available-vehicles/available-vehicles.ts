import {Component, Input, OnInit} from '@angular/core';

declare var google;

/**
 * Generated class for the AvailableVehiclesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'available-vehicles',
  templateUrl: 'available-vehicles.html'
})
export class AvailableVehiclesComponent implements OnInit{

  @Input() map: google.maps.Map;
  @Input() isRideRequested: boolean;

  constructor() {

  }

  ngOnInit() {
    this.fetchAndRefreshVehicles();
  }

  fetchAndRefreshVehicles() {

  }

}
