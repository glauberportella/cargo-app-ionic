import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/switchMap";

/*
  Generated class for the VehiclesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiclesProvider {

  constructor(public http: HttpClient) {
  }

  getVehicles(lat, lng) {
    return Observable
        .interval(2000)
        .switchMap(() => {

        })
        .share();
  }
}
