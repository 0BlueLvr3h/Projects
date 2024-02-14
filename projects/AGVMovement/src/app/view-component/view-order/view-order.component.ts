import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderServiceService } from '../../services/order.service.service';
import { Subscription } from 'rxjs';
import { Order } from '../../order/Order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public orders: Order[] = [];

  constructor(private orderService: OrderServiceService) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      orders.forEach(function(order){
        console.log("///////////////////////////");
        console.log(order);
        console.log("///////////////////////////");
        
      })
    })



  }

}
