import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NetworkService} from './services/network.service';
import {AppMessage} from './constants/app-message';
import {AppConstant} from './constants/app-constant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'plant-directory';
  constructor(
    private networkService: NetworkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.networkService.isOnline$.subscribe((online) => {
      if (!online && this.router.url !== AppConstant.ROUTE_NETWORK_AVAILABILITY_NOTIFICATION) {
        this.router.navigate([AppConstant.ROUTE_NETWORK_AVAILABILITY_NOTIFICATION]).then(
          success => {
            if (!success) {
              console.error('Navigation to /offline failed');
            }
          },
          err => console.error(AppMessage.NAVIGATION_ERROR, err)
        );

      }

      if (online && this.router.url === AppConstant.ROUTE_NETWORK_AVAILABILITY_NOTIFICATION) {
        this.router.navigate([AppConstant.ROUTE_PLANTS]).then(
          success => {
            if (!success) {
              console.error('Navigation to /offline failed');
            }
          },
          err => console.error(AppMessage.NAVIGATION_ERROR, err)
        );

      }
    });
  }
}
