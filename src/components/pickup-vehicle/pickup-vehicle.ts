import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {VehiclesProvider} from "../../providers/vehicles/vehicles";

/**
 * Generated class for the PickupVehicleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup-vehicle',
  templateUrl: 'pickup-vehicle.html'
})
export class PickupVehicleComponent implements OnInit, OnChanges {

  @Input() map: google.maps.Map;
  @Input() isRideRequested: boolean;
  @Input() pickupLocation: google.maps.LatLng;

  constructor(public vehicleService: VehiclesProvider) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.isRideRequested) {
      this.requestVehicle();
    } else {
      this.removeVehicle();
    }
  }

  requestVehicle() {
    console.log('Request vehicle: ' + this.pickupLocation);
    this.vehicleService.findPickupVehicle(this.pickupLocation)
      subscribe(vehicle => {
        // show car marker
        // show car direction/path to you
        // keep updating vehicle
      });
  }

  removeVehicle() {}
}
