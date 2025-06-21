import {Component, OnInit} from '@angular/core';
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
export class PlantDetailComponent implements OnInit{
  plant: Plant | null = null;
  loading = false;

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.loadPlant();
  }

  /**
   * This method is taking active id from the router pram and pass it to the service
   */
  loadPlant(): void {
    const id = Number(this.activeRouter.snapshot.paramMap.get('id'));
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

  /**
   * this method go back to the plant list
   */
  goBack(): void {
    this.router.navigate(['/plants']);
  }
}
