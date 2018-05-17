import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isRideRequested: boolean;

  constructor(public navCtrl: NavController) {
    this.isRideRequested = false;
  }

  confirmRide() {
    this.isRideRequested = true;
  }

  cancelRide() {
    this.isRideRequested = false;
  }

}
