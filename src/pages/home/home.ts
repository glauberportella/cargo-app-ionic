import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
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
      public alertCtrl: AlertController,
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
        case this.pickupPubSub.EVENTS.DROPOFF:
          this.riderDroppedOff();
          break;
    }
  }

  riderPickedUp() {
    this.isRiderPickedUp = true;
  }

  rateDriver() {
    let prompt = this.alertCtrl.create({
      title: 'Avalie o motorista',
      message: 'Selecione uma avaliação',
      inputs: [
          {
              type: 'radio',
              label: 'Ótimo',
              value: '5',
              checked: true
          },
          {
              type: 'radio',
              label: 'Muito Bom',
              value: '4'
          },
          {
              type: 'radio',
              label: 'Bom',
              value: '3'
          },
          {
              type: 'radio',
              label: 'Regular',
              value: '2'
          },
          {
              type: 'radio',
              label: 'Ruim',
              value: '1'
          },
          {
              type: 'radio',
              label: 'Péssimo',
              value: '0'
          }
      ],
      buttons: [
          {
              text: 'Avaliar',
              handler: rating => {
                // TODO: send to server
                console.log(rating);
              }
          }
      ]
    });

    prompt.present();
  }

  riderDroppedOff() {
    this.rateDriver();
    this.isRiderPickedUp = false;
    this.isRideRequested = false;
    this.destination = null;
    this.timeTillArrival = 5;
  }

  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    this.timeTillArrival = minutes;
  }

}
