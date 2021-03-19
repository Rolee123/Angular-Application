import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  visibleSidebar;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo = (value: any) => {
    if(value == 'customer'){
      this.router.navigateByUrl("/customers/customer-list");
    }
    this.visibleSidebar = false;
  }
  
}
