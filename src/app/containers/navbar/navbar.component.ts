import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  linkItems = [
    { link: '/', content: 'Home', isActive: true },
    { link: '/stocks', content: 'Stocks', isActive: false },
    { link: '/portfolio', content: 'Portfolio', isActive: false },
    { link: '/settings', content: 'Settings', isActive: false },
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('routerUrl')
      .subscribe(routerUrl => {
        return this.linkItems = this.linkItems
          .map(item => {
            return {...item, isActive: this.isLinkActive(item.link, routerUrl)};
          });
      });
  }

  private isLinkActive(link, routerUrl) {
    if (routerUrl === '/' && link === '/') {
      return true;
    } else if (routerUrl !== '/') {
      return link.toLowerCase().startsWith(routerUrl.toLowerCase());
    }
  }

}
