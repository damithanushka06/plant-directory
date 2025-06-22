import { Component } from '@angular/core';
import {NetworkService} from '../../services/network.service';
import {Router} from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-network-status-toast',
  imports: [
    NgIf,
    CommonModule
  ],
  templateUrl: './network-status-toast.component.html',
  standalone: true,
  styleUrls: ['./network-status-toast.component.scss']
})
export class NetworkStatusToastComponent {
  showToast = false;
  isOnline = true;

  constructor(private networkService: NetworkService, private router:Router) {
  }
  ngOnInit(): void {
    this.networkService.isOnline$.subscribe({
      next: (online) => {
        this.isOnline = online;
        this.showToast = true;

        if (online) {
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
