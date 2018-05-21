import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PickupPubSubProvider} from "../../providers/pickup-pub-sub/pickup-pub-sub";

/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent implements OnInit, OnChanges {

  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  @Input() isRideRequested: boolean;
  @Output() updatedPickupLocation: EventEmitter<google.maps.LatLng> = new EventEmitter();

  private pickupMarker: google.maps.Marker;
  private popup: google.maps.InfoWindow;
  private pickupSubscription: any;

  constructor(private pickupPubSub: PickupPubSubProvider) {
  }

  ngOnInit() {
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      if (e.event === this.pickupPubSub.EVENTS.ARRIVAL_TIME) {
        this.updateTime(e.data);
      }
    });
  }

  ngOnChanges(changes) {
    // do not allow pickup pin location
    // to change if ride is requested
    if (!this.isRideRequested) {
      if (this.isPinSet) {
        this.showPickupMarker();
      } else {
        this.removePickupMarker();
      }
    }
  }

  showPickupMarker() {

    this.removePickupMarker();

    this.pickupMarker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.BOUNCE,
       position: this.map.getCenter(),
       icon: 'assets/icon/current-location.png'
    });

    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 750);

    this.showPickupTime();

    // send pickup location
    this.updatedPickupLocation.next(this.pickupMarker.getPosition());
  }

  removePickupMarker() {
    if (this.pickupMarker) {
      this.pickupMarker.setMap(null);
    }
  }

  showPickupTime() {
    this.popup = new google.maps.InfoWindow({
        content: '<h5>Você está aqui</h5>'
    });

    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    });
  }

  updateTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    this.popup.setContent(`<h5>${minutes} min.</h5>`)
  }
}
