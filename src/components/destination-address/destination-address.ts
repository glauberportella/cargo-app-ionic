import {Component, EventEmitter, Output} from '@angular/core';

/**
 * Generated class for the DestinationAddressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'destination-address',
  templateUrl: 'destination-address.html'
})
export class DestinationAddressComponent {

  @Output() newDest: EventEmitter<string> = new EventEmitter();

  public enteredAddress: string;
  public geocoder: google.maps.Geocoder;
  public results: Array<any>;

  constructor() {
    this.enteredAddress = "";
    this.geocoder = new google.maps.Geocoder();
    this.results = [];
  }

  onSubmit() {
    this.results = [];

    this.geocoder.geocode({address: this.enteredAddress}, (destination, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.results = destination.slice(0, 4); // show top 4 results
      } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
        alert("Destino não encontrado.");
      }
    });
  }

  selectDestination(destination) {
    this.results = [];
    this.enteredAddress = destination.formatted_address;
    // pass the destination lat/lng to parent
    this.newDest.next(destination.geometry.location);
  }

}
