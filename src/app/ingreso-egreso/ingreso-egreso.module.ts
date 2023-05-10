import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { NgChartsModule } from "ng2-charts";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutesModule } from "../dashboard/dashboard-routes.module";
import { StoreModule } from "@ngrx/store";
import { entryExitReducer } from "./ingreso-egreso.reducer";

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature("entryExit", entryExitReducer),
  ],
})
export class IngresoEgresoModule {}
