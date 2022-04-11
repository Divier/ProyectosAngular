import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PrimengModule } from '../primeng/primeng.module';
import { LoadOrderComponent } from './components/load-order/load-order.component';
import { OrderSentComponent } from './components/order-sent/order-sent.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderProcessedComponent } from './components/order-processed/order-processed.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    LoadOrderComponent,
    OrderSentComponent,
    OrderProcessedComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    OrderRoutingModule
  ],
  exports: [
    PrincipalComponent
  ]
})
export class OrderModule { }
