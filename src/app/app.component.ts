import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInIt() {
  
  }
  
}
