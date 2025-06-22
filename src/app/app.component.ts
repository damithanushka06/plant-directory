import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NetworkService} from './services/network.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'plant-directory';
  constructor(
    private networkService: NetworkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.networkService.isOnline$.subscribe((online) => {
      if (!online && this.router.url !== '/offline') {
        this.router.navigate(['/offline']);
      }

      if (online && this.router.url === '/offline') {
        this.router.navigate(['/plants']);
      }
    });
  }
}
