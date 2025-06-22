import { Routes } from '@angular/router';
import {PlantListComponent} from './components/plant-list/plant-list.component';
import {PlantDetailComponent} from './components/plant-detail/plant-detail.component';
import {NetworkGuard} from './guard/network-gurd';
import {NetworkStatusToastComponent} from './components/network-status-toast/network-status-toast.component';

export const routes: Routes = [
  {
    path: '',
    component: PlantListComponent,
    pathMatch: 'full',
    canActivate: [NetworkGuard]
  },
  {
    path: 'plant/:id',
    component: PlantDetailComponent
  },
  {
    path: 'offline',
    component: NetworkStatusToastComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
