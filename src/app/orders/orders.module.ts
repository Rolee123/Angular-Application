import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';
import { SuccessfullOrderComponent } from './successfull-order/successfull-order.component';


@NgModule({
  declarations: [NewOrderComponent, PendingOrderComponent, SuccessfullOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
