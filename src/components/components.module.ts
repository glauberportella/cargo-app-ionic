import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { PickupComponent } from './pickup/pickup';
import { AvailableVehiclesComponent } from './available-vehicles/available-vehicles';
import { PickupVehicleComponent } from './pickup-vehicle/pickup-vehicle';
import { DestinationAddressComponent } from './destination-address/destination-address';
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [MapComponent,
    PickupComponent,
    AvailableVehiclesComponent,
    PickupVehicleComponent,
    DestinationAddressComponent],
	imports: [
	    IonicModule
    ],
	exports: [MapComponent,
    PickupComponent,
    AvailableVehiclesComponent,
    PickupVehicleComponent,
    DestinationAddressComponent]
})
export class ComponentsModule {}
