import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation";
import {LoadingController} from "ionic-angular";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {

  @Input() isRideRequested: boolean;

  @ViewChild('mapEl') mapElement: ElementRef;

  public map: google.maps.Map;
  public isMapIdle: boolean;
  public currentLocation: google.maps.LatLng;

  constructor(public geolocation: Geolocation, public loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.createMap();
    this.addMapEventListeners();
    this.getCurrentLocation().subscribe(location => {
       this.centerLocation(location);
    });
  }

  updatePickupLocation(location) {
      this.currentLocation = location;
      this.centerLocation(location);
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
        this.isMapIdle = false;
    });

    google.maps.event.addListener(this.map, 'idle', () => {
        this.isMapIdle = true;
    });
  }

  getCurrentLocation() {
    let loading = this.loadingCtrl.create({
      content: 'Localizando...'
    });

    loading.present();

    let locationObs = Observable.create(observable => {
        let options = {
            timeout: 10000,
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(options)
            .then(position => {
                let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                observable.next(location);
                loading.dismiss();
            }, err => {
                console.log('Geolocation err: ' + err);
                loading.dismiss();
            });
    });

    return locationObs;
  }

  centerLocation(location) {
      if (location) {
          this.map.panTo(location);
      } else {
          this.getCurrentLocation().subscribe(currentLocation => {
              this.map.panTo(currentLocation);
          });
      }
  }

  createMap(location = new google.maps.LatLng(-19.912998, -43.940933)) {
      let mapOptions = {
          center: location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
