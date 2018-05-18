import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchString = '';
  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.search.emit(this.searchString);
  }

}
