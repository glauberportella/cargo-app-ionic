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

  constructor() {
  }

  onSubmit() {

  }

}
