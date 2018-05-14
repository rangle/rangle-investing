import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  mockNewsfeed = [
    {
      heading: 'Apple announces iCar',
      summary: 'Live from Cupertino, Apple HQ, as Tim Cook announces the new iCar.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
