import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/model/product.model';
import * as products from 'src/json/product_list.json';
import { Carts } from 'src/model/carts.model';
 
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  public productList: Array<Product> = new Array<Product>();
  public carts: Array<Carts> = new Array<Carts>();
  public subtotal: number = 0;
  public tax: number = 0;
  public total: number = 0;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList = () => {
    this.productList = (products as any).default;
  }

  public addToCart = (product: Product) => {
    let isProductAlreadyOnCart = false;
    for(let cart of this.carts) {
      if(product.product_id == cart.product_id) {
          cart.product_quantity = cart.product_quantity + 1;
          isProductAlreadyOnCart = true;
          break;
      }

    }
    if(!isProductAlreadyOnCart) {
      this.carts.push({
        "product_id": product.product_id,
        "product_image": product.product_image,
        "product_name": product.product_name,
        "product_price": product.product_price,
        "product_quantity": 1,
        "product_tax": product.product_tax,
        "product_type": product.product_type
      });
    }
    this.calculatePayment(product.product_price, product.product_tax, 'add');
  }

  public removeFromCart = (i: number) => {
    if(this.carts[i].product_quantity == 1) {
      this.carts.splice(i, 1);
    }
    else {
      this.carts[i].product_quantity = this.carts[i].product_quantity - 1;
    }
    this.calculatePayment(this.carts[i].product_price, this.carts[i].product_tax, 'remove');
  }

  public addFromCart = (i: number) => {
    this.carts[i].product_quantity = this.carts[i].product_quantity + 1;
    this.calculatePayment(this.carts[i].product_price, this.carts[i].product_tax, 'add');
  }

  public calculatePayment = (price: number, tax: number, type: string) => {
    if(type == 'add')  {
      this.subtotal = this.subtotal + price; 
      this.tax = this.tax + (price * tax/100);
    }
    else {
      this.subtotal = this.subtotal - price;
      this.tax = this.tax - (price * tax/100);
    }
    this.subtotal = Number(this.subtotal.toFixed(2));
    this.tax = Number(this.tax.toFixed(2));
    this.total = Number((this.subtotal + this.tax).toFixed(2));
  }
}
