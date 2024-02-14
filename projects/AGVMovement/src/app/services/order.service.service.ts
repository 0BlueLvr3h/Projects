import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../order/Order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private url : string = "http://localhost:8080/api/v1/order";
  private datas : BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  

  constructor(private http : HttpClient) { 
  }

  getAllOrders() : Observable<Array<Order>>{
    return this.http.get<Array<Order>>(this.url).pipe(
      map(data => {
        console.log(data);
        
        return data;
      })
    )
  }
}
