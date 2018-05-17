import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { PickupComponent } from './pickup/pickup';
import { AvailableVehiclesComponent } from './available-vehicles/available-vehicles';
@NgModule({
	declarations: [MapComponent,
    PickupComponent,
    AvailableVehiclesComponent],
	imports: [],
	exports: [MapComponent,
    PickupComponent,
    AvailableVehiclesComponent]
})
export class ComponentsModule {}
