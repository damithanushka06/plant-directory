import { Routes } from '@angular/router';
import {PlantListComponent} from './components/plant-list/plant-list.component';
import {PlantDetailComponent} from './components/plant-detail/plant-detail.component';
import {NetworkGuard} from './guard/network-gurd';
import {OfflineComponent} from './components/offline/offline.component';

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
    component: OfflineComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
