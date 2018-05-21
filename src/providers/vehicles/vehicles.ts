import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/switchMap";
import {SimulateProvider} from "../simulate/simulate";
import "rxjs/add/operator/share";

/*
  Generated class for the VehiclesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiclesProvider {

  public simulate: SimulateProvider;

  constructor() {
    this.simulate = new SimulateProvider();
  }

  pollForRiderPickup() {
    return this.simulate.riderPickedUp();
  }

  pollForRiderDropoff() {
    return this.simulate.riderDroppedOff();
  }

  getPickupVehicle() {
    return this.simulate.getPickupVehicle();
  }

  getVehicles(lat, lng) {
    return Observable
        .interval(2000)
        .switchMap(() => this.simulate.getVehicles(lat, lng))
        .share();
  }

  findPickupVehicle(pickupLocation) {
    return this.simulate.findPickupVehicle(pickupLocation);
  }
}
