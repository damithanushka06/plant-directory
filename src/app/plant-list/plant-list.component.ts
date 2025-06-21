import {Component, OnInit} from '@angular/core';
import {Plant} from '../dtos/plant';

import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PlantService} from '../service/plant.service';

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
export class PlantListComponent implements OnInit{
  plants: Plant[] = [];
  next: string | null = null;
  loading = false;

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
    this.plantService.getPlants(this.next ?? '').subscribe({
      next: ({ plants, next }) => {
        this.plants = [...this.plants, ...plants];
        this.next = next;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/plant', id]);
  }
}
