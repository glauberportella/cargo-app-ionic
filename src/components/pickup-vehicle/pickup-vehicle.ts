import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {VehiclesProvider} from "../../providers/vehicles/vehicles";
import {PickupPubSubProvider} from "../../providers/pickup-pub-sub/pickup-pub-sub";
const SlidingMarker = require('marker-animate-unobtrusive');

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

  public pickupVehicleMarker: any;
  public polylinePath: google.maps.Polyline;

  constructor(
      public vehicleService: VehiclesProvider,
      private pickupPubSub: PickupPubSubProvider
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.isRideRequested) {
      this.requestVehicle();
    } else {
      this.removeVehicle();
      this.removeDirections();
    }
  }

  updateVehicle(cbDone) {
    this.vehicleService.getPickupVehicle().subscribe(vehicle => {
      // animate car to next point
      this.pickupVehicleMarker.setPosition(vehicle.position);
      // set direction path to car
      this.polylinePath.setPath(vehicle.path);

      // update arrival time
      this.pickupPubSub.emitArrivalTime(vehicle.time);

      // keep updating car
      if (vehicle.path.length > 1) {
        setTimeout(() => {
          this.updateVehicle(cbDone);
        }, 1000);
      } else {
        // car arrived
        cbDone();
      }
    });
  }

  showDirections(path) {
    this.polylinePath = new google.maps.Polyline({
      path: path,
      strokeColor: '#000',
      strokeWeight: 3
    });
    this.polylinePath.setMap(this.map);
  }

  addVehicleMarker(position) {
    this.pickupVehicleMarker = new SlidingMarker({
        map: this.map,
        position: position,
        icon: 'assets/icon/vehicle.png'
    });

    this.pickupVehicleMarker.setDuration(1000);
    this.pickupVehicleMarker.setEasing('linear');
  }

  checkForRiderPickup() {
    this.vehicleService.pollForRiderPickup().subscribe(data => {
      this.pickupPubSub.emitPickUp();
    });
  }

  requestVehicle() {
    this.vehicleService.findPickupVehicle(this.pickupLocation)
        .subscribe(vehicle => {
          // show car marker
          this.addVehicleMarker(vehicle.position);
          // show car direction/path to you
          this.showDirections(vehicle.path);
          // keep updating vehicle
          this.updateVehicle(() => this.checkForRiderPickup() );
        });
  }

  removeDirections() {
    if (this.polylinePath) {
      this.polylinePath.setMap(null);
      this.polylinePath = null;
    }
  }

  removeVehicle() {
    if (this.pickupVehicleMarker) {
      this.pickupVehicleMarker.setMap(null);
      this.pickupVehicleMarker = null;
    }
  }
}
