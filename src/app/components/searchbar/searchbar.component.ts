import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchString = '';
  queryChanged: Subject<string> = new Subject<string>();
  constructor() { }

  ngOnInit() {
    this.queryChanged
    .pipe(debounceTime(200), distinctUntilChanged())
    .subscribe(this.emitSearch);
  }

  // Creating Arrow function to ensure binding of 'this'
  emitSearch = query => this.search.emit(query);

  onChange(query: string) {
    this.queryChanged.next(query);
  }

}
