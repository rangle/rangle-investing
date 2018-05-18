import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit {

  @Input() routerLink: string;
  @Input() active: boolean;
  @Input() icon: string;
  iconClass: string;
  constructor() { }

  ngOnInit() {
    this.iconClass = `fas fa-${this.icon}`;
  }

}
