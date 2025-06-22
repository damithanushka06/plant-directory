import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Plant} from '../../dtos/plant';
import {ActivatedRoute, Router} from '@angular/router';
import {PlantService} from '../../services/plant.service';
import {NgIf} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {AppConstant} from '../../constants/app-constant';
import {AppMessage} from '../../constants/app-message';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantDetailComponent implements OnInit, OnDestroy{
  plant: Plant | null = null;
  loading = false;
  private destroy$:Subject<void> = new Subject<void>();

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private plantService: PlantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPlant();
  }

  /**
   * This method is taking active id from the router pram and pass it to the service
   */

  loadPlant(): void {
    const id = Number(this.activeRouter.snapshot.paramMap.get(AppConstant.ID_STRING));
    if (!id) return;

    this.loading = true;
    this.plantService.getPlantById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (plant) => {
          this.plant = plant;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }
  /**
   * this method go back to the plant list
   */
  goBack(): void {
    this.router.navigate([AppConstant.ROUTE_PLANTS])
      .then(success => {
        if (success) {
          console.log(AppMessage.NAVIGATION_SUCCESS);
        } else {
          console.warn(AppMessage.NAVIGATION_FAIL);
        }
      })
      .catch(error => {
        console.error(AppMessage.NAVIGATION_ERROR, error);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
