import { Component, OnInit, Input } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist-button',
  templateUrl: './watchlist-button.component.html',
  styleUrls: ['./watchlist-button.component.css']
})
export class WatchlistButtonComponent implements OnInit {
  @Input() stockSymbol = '';
  iconClass = '';
  inWatchlist = false;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.setInWatchlist();
  }

  setInWatchlist() {
    this.inWatchlist = this.watchlistService.inWatchlist(this.stockSymbol);
  }

  onWatchlistAction() {
    if (this.watchlistService.inWatchlist(this.stockSymbol)) {
      this.watchlistService.remove(this.stockSymbol);
    } else {
      this.watchlistService.add(this.stockSymbol);
    }
    this.setInWatchlist();
  }
}
