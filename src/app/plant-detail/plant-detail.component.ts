import {Component, OnDestroy, OnInit} from '@angular/core';
import {Plant} from '../dtos/plant';
import {ActivatedRoute, Router} from '@angular/router';
import {PlantService} from '../service/plant.service';
import {NgIf} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent implements OnInit, OnDestroy{
  plant: Plant | null = null;
  loading = false;
  private destroy$ = new Subject<void>();

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
    this.plantService.getPlantById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (plant) => {
          this.plant = plant;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
  /**
   * this method go back to the plant list
   */
  goBack(): void {
    this.router.navigate(['/plants']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
