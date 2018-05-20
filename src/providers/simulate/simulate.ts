import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the SimulateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SimulateProvider {

    public directionService: google.maps.DirectionsService;
    public myRoute: any;
    public myRouteIndex: number;

    constructor() {
        this.directionService = new google.maps.DirectionsService();
    }

    getPickupVehicle() {
        return Observable.create(observable => {
           let car = this.myRoute[this.myRouteIndex];
           observable.next(car);
           this.myRouteIndex++;
        });
    }

    getSegmentedDirections(directions) {
        let route = directions.routes[0];
        let legs = route.legs;
        let path = [];
        let increments = [];
        let duration = 0;

        let numOfLegs = legs.length;

        // work backwards through each leg in directions route
        while (numOfLegs--) {
            let leg = legs[numOfLegs];
            let steps = leg.steps;
            let numOfSteps = steps.length;

            while (numOfSteps--) {
                let step = steps[numOfSteps];
                let points = step.path;
                let numOfPoints = points.length;

                duration +=  step.duration.value;
                while (numOfPoints--) {
                    let point = points[numOfPoints];

                    path.push(point);

                    increments.unshift({
                        position: point, // car position
                        time: duration, // time left before arrival
                        path: path.slice(0) // clone array to prevent referencing final path array
                    });
                }
            }
        }

        return increments;
    }

    calculateRoute(start, end) {

      return Observable.create(observable => {
          this.directionService.route({
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.DRIVING
          }, (response, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                  observable.next(response);
              } else {
                  observable.error(status);
              }
          })
      })
    }

    simulateRoute(start, end) {
        return Observable.create(observable => {
            this.calculateRoute(start, end).subscribe(directions => {
                // get route path
                this.myRoute = this.getSegmentedDirections(directions);
                // return pickup car
                this.getPickupVehicle().subscribe(vehicle => {
                    observable.next(vehicle); // first increment in vehicle path
                });
            });
        });
    }


    findPickupVehicle(pickupLocation) {
        this.myRouteIndex = 0;

        let car = this.cars1.cars[0]; // get first car to simulate pickup car
        let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
        let end = pickupLocation;

        return this.simulateRoute(start, end);
    }


    getVehicles(lat, lng) {
        let carData = this.cars[this.carIndex];

        this.carIndex++;

        if (this.carIndex > this.cars.length - 1) {
            this.carIndex = 0;
        }

        return Observable.create(
            observer => observer.next(carData)
        )
    }


    private carIndex: number = 0;

  private cars1 = {
    cars: [
      {
        id: 1,
        coord: {
          lat: -19.844351,
          lng: -43.929245
        }
      },
      {
        id: 2,
        coord: {
            lat: -19.842817,
            lng: -43.925211
        }
      }
    ]
  };

  private cars2 = {
      cars: [
          {
              id: 1,
              coord: {
                  lat: -19.846490,
                  lng: -43.925254
              }
          },
          {
              id: 2,
              coord: {
                  lat: -19.848508,
                  lng: -43.927228
              }
          }
      ]
  };

  private cars3 = {
      cars: [
          {
              id: 1,
              coord: {
                  lat: -19.844775,
                  lng: -43.931606
              }
          },
          {
              id: 2,
              coord: {
                  lat: -19.843039,
                  lng: -43.921950
              }
          }
      ]
  };

  private cars4 = {
      cars: [
          {
              id: 1,
              coord: {
                  lat: -19.844169,
                  lng: -43.925319
              }
          },
          {
              id: 2,
              coord: {
                  lat: -19.846591,
                  lng: -43.925340
              }
          }
      ]
  };

  private cars5 = {
      cars: [
          {
              id: 1,
              coord: {
                  lat: -19.841586,
                  lng: -43.928902
              }
          },
          {
              id: 2,
              coord: {
                  lat: -19.840614,
                  lng: -43.924804
              }
          }
      ]
  };

  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];

}
