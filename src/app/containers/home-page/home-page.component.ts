import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  stocks$: Observable<any[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.stocks$ = this.store.select('stocks');
  }

}
