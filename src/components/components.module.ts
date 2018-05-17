import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { PickupComponent } from './pickup/pickup';
@NgModule({
	declarations: [MapComponent,
    PickupComponent],
	imports: [],
	exports: [MapComponent,
    PickupComponent]
})
export class ComponentsModule {}
