import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PickupPubSubProvider} from "../../providers/pickup-pub-sub/pickup-pub-sub";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isRideRequested: boolean;
  public isRiderPickedUp: boolean;
  public pickupSubscription: any;
  public timeTillArrival: number;
  public destination: string;

  constructor(
      public navCtrl: NavController,
      private pickupPubSub: PickupPubSubProvider) {
    this.isRideRequested = false;
    this.isRiderPickedUp = false;
    this.timeTillArrival = 5;
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      this.processPickupSubscription(e);
    });
  }

  setDestination(destination) {
    this.destination = destination;
  }

  confirmRide() {
    this.isRideRequested = true;
  }

  cancelRide() {
    this.isRideRequested = false;
  }

  processPickupSubscription(e) {
    switch (e.event) {
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
        break;
      case this.pickupPubSub.EVENTS.PICKUP:
        this.riderPickedUp();
        break;
    }
  }

  riderPickedUp() {
    this.isRiderPickedUp = true;
  }

  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    this.timeTillArrival = minutes;
  }

}
