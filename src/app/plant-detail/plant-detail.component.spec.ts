import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import { PlantDetailComponent } from './plant-detail.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {PlantService} from '../service/plant.service';


describe('PlantDetailComponent', () => {
  let component: PlantDetailComponent;
  let fixture: ComponentFixture<PlantDetailComponent>;
  let mockPlantService: jasmine.SpyObj<PlantService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockPlantService = jasmine.createSpyObj('PlantService', ['getPlantById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PlantDetailComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        { provide: PlantService, useValue: mockPlantService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadPlant', () => {

    it('should load plant and update loading states on success', () => {
      const mockPlant = { id: 1, name: 'Rose' };
      mockPlantService.getPlantById.and.returnValue(of(mockPlant));

      fixture.detectChanges();
      expect(component.loading).toBeFalse();

      mockPlantService.getPlantById(1).subscribe(() => {
        expect(component.plant).toEqual(mockPlant);
        expect(component.loading).toBeFalse();
      });
    });

    it('should set loading to false on error', () => {
      mockPlantService.getPlantById.and.returnValue(throwError(() => new Error('API error')));

      expect(component.loading).toBeFalse();

      fixture.detectChanges();

      // Pass the id 1 here as well:
      mockPlantService.getPlantById(1).subscribe({
        error: () => {
          expect(component.loading).toBeFalse();
        },
      });
    });

    it('should not call service if id is invalid', () => {
      (TestBed.inject(ActivatedRoute) as any).snapshot.paramMap = convertToParamMap({ id: null });

      component.loadPlant();

      expect(mockPlantService.getPlantById).not.toHaveBeenCalled();
    });

    it('should navigate to /plants', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/plants']);
    });

  });

});
