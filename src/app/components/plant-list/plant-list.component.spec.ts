import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantListComponent } from './plant-list.component';
import { of, throwError } from 'rxjs';
import {PlantService} from '../../services/plant.service';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantServiceSpy: jasmine.SpyObj<PlantService>;
  let navigateSpy: jasmine.Spy;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);


  const mockPlantsResponse = {
    plants: [
      { id: 1, name: 'Aloe Vera', division: 'Herbs', address: 'USA', country: 'US' },
      { id: 2, name: 'Bamboo', division: 'Grass', address: 'India', country: 'IN' }
    ],
    next: 'page2'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PlantService', ['getPlants']);

    await TestBed.configureTestingModule({
      imports: [PlantListComponent],
      providers: [{ provide: PlantService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    plantServiceSpy = TestBed.inject(PlantService) as jasmine.SpyObj<PlantService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load plants successfully and update state', () => {
    plantServiceSpy.getPlants.and.returnValue(of(mockPlantsResponse));

    component.loadPlants();

    expect(plantServiceSpy.getPlants).toHaveBeenCalledWith('');
    expect(component.plants.length).toBe(2);
    expect(component.next).toBe('page2');
    expect(component.loading).toBeFalse();
  });

  it('should prevent concurrent loads if already loading', () => {
    component.loading = true;
    component.loadPlants();

    expect(plantServiceSpy.getPlants).not.toHaveBeenCalled();
  });

  it('should handle API error gracefully and reset loading', () => {
    plantServiceSpy.getPlants.and.returnValue(throwError(() => new Error('API error')));

    component.loadPlants();

    expect(component.loading).toBeFalse();
  });

  it('should append new plants to existing list', () => {
    component.plants = [{ id: 10, name: 'Existing', division: '', address: '', country: '' }];
    plantServiceSpy.getPlants.and.returnValue(of(mockPlantsResponse));

    component.loadPlants();

    expect(component.plants.length).toBe(3);
    expect(component.plants[0].name).toBe('Existing');
    expect(component.plants[1].name).toBe('Aloe Vera');
  });

});
