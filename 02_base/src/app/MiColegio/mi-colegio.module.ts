import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MiColegioComponent } from './MiColegio/mi-colegio.component';


@NgModule({
  declarations: [
    MiColegioComponent
  ],
  exports: [
    MiColegioComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MiColegioModule {

}
