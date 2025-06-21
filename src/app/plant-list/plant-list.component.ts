import {Component, OnDestroy, OnInit} from '@angular/core';
import {Plant} from '../dtos/plant';

import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PlantService} from '../service/plant.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    CommonModule
  ],
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit, OnDestroy{
  plants: Plant[] = [];
  next: string | null = null;
  loading = false;
  private plantsSub?: Subscription;

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  /**
   * Loads the next set of plants from the API and appends them to the existing list.
   */
  loadPlants(): void {
    if (this.loading) return;
    this.loading = true;
    this.plantsSub = this.plantService.getPlants(this.next ?? '').subscribe({
      next: ({ plants, next }) => {
        this.plants = [...this.plants, ...plants];
        this.next = next;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  trackByPlantId(index: number, plant: Plant): number {
    return plant.id ?? index;
  }

  ngOnDestroy(): void {
    this.plantsSub?.unsubscribe();
  }

}
