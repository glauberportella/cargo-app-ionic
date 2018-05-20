import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {VehiclesProvider} from "../../providers/vehicles/vehicles";
import SlidingMarker from 'marker-animate-unobtrusive';


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
export class AvailableVehiclesComponent implements OnInit, OnChanges {

  @Input() map: google.maps.Map;
  @Input() isRideRequested: boolean;

  public vehicleMarkers: Array<google.maps.Marker>;

  constructor(public vehicleService: VehiclesProvider) {
    this.vehicleMarkers = [];
  }

  ngOnInit() {
    this.fetchAndRefreshVehicles();
  }

  ngOnChanges() {
      if (this.isRideRequested) {
          this.removeVehicleMarkers();
      }
  }

  removeVehicleMarkers() {
      let numVehicles = this.vehicleMarkers.length;
      while (numVehicles--) {
          let vehicle = this.vehicleMarkers.pop();
          vehicle.setMap(null);
      }
  }

  addVehicleMarker(vehicle) {
      let vehicleMarker = new SlidingMarker({
          map: this.map,
          position: new google.maps.LatLng(vehicle.coord.lat, vehicle.coord.lng),
          icon: 'assets/icon/vehicle.png'
      });

      vehicleMarker.setDuration(2000);
      vehicleMarker.setEasing('linear');

      vehicleMarker.set('id', vehicle.id); // MVCObject

      this.vehicleMarkers.push(vehicleMarker);
  }

  updateVehicleMarker(vehicle) {
    for (var i = 0, numVehicles = this.vehicleMarkers.length; i < numVehicles; i++) {
      // find vehicle and update it
      if (this.vehicleMarkers[i].get('id') === vehicle.id) {
          this.vehicleMarkers[i].setPosition(new google.maps.LatLng(vehicle.coord.lat, vehicle.coord.lng));
          return;
      }
    }

    // vehicle does not exist in vehicleMarkers
    this.addVehicleMarker(vehicle);
  }

  fetchAndRefreshVehicles() {
    this.vehicleService.getVehicles(-19.845141, -43.927722)
        .subscribe(vehicles => {
            console.log(vehicles);
            if (vehicles) {
              vehicles.cars.forEach(car => {
                this.updateVehicleMarker(car);
              });
            }
        });
  }

}
