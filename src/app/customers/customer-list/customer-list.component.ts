import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customers } from 'src/model/customers.model';
import * as customer from 'src/json/customer_list.json';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./customer-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CustomerListComponent implements OnInit {
  

    customersList: Array<Customers> = new Array<Customers>();

     customer: Customers;

     customerDialog: boolean;

     selectedCustomers: Customers[];

     submitted: boolean;
     customers: {};

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
   this.getCustomerList();
  }

  public getCustomerList()
  {
      console.log(customer);
    this.customersList = (customer as any).default;
  }
  openNew() {
    this.customers = {};
    this.submitted = false;
    this.customerDialog = true;
}

deleteSelectedCustomers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.customersList = this.customersList.filter(val => !this.selectedCustomers.includes(val));
            this.selectedCustomers = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000});
        }
    });
}

editCutsomer(customer: Customers) {
    this.customer = {...customer};
    this.customerDialog = true;
}

deleteCustomer(customer: Customers) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + customer.customer_name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.customersList = this.customersList.filter(val => !this.selectedCustomers.includes(val))
            this.customers = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.customer.customer_name.trim()) {
        if (this.customer.customer_id) {
            this.customersList[this.findIndexById(this.customer.customer_id)] = this.customer;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.customer.customer_id = this.createId();
            this.customersList.push(this.customer);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.customersList = [...this.customersList];
        this.customerDialog = false;
        this.customers = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.customersList.length; i++) {
        if (this.customersList[i].customer_id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
}


