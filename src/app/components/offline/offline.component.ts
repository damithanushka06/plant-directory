import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {NetworkService} from '../../services/network.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offline',
  imports: [
    NgIf,
    CommonModule
  ],
  templateUrl: './offline.component.html',
  standalone: true,
  styleUrl: './offline.component.scss'
})
export class OfflineComponent implements OnInit{
  showToast = false;
  isOnline = true;

  constructor(private networkService: NetworkService, private router:Router) {
  }
  ngOnInit(): void {
    this.networkService.isOnline$.subscribe((online) => {
      this.isOnline = online;
      if (online) {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      } else {
        this.showToast = true;
      }
    });
  }
}
