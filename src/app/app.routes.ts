import { Routes } from '@angular/router';
import {PlantListComponent} from './plant-list/plant-list.component';
import {PlantDetailComponent} from './plant-detail/plant-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: PlantListComponent,
    pathMatch: 'full'
  },
  {
    path: 'plant/:id',
    component: PlantDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
