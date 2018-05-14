import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {
	balance = 1474507.23;
	currency = "CAD";
	
  constructor() { }

  ngOnInit() {
  }

}
