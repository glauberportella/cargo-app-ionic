import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { PickupComponent } from './pickup/pickup';
import { AvailableVehiclesComponent } from './available-vehicles/available-vehicles';
import { PickupVehicleComponent } from './pickup-vehicle/pickup-vehicle';
@NgModule({
	declarations: [MapComponent,
    PickupComponent,
    AvailableVehiclesComponent,
    PickupVehicleComponent],
	imports: [],
	exports: [MapComponent,
    PickupComponent,
    AvailableVehiclesComponent,
    PickupVehicleComponent]
})
export class ComponentsModule {}
