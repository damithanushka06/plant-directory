import { Component } from '@angular/core';
import {Plant} from '../dtos/plant';
import {ActivatedRoute, Router} from '@angular/router';
import {PlantService} from '../service/plant.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent {
  plant: Plant | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.loadPlant();
  }

  loadPlant(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loading = true;
    this.plantService.getPlantById(id).subscribe({
      next: (plant) => {
        this.plant = plant;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Optionally handle error (show message, navigate away)
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/plants']);
  }
}
