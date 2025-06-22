import { TestBed } from '@angular/core/testing';
import { PlantService } from './plant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Plant} from '../dtos/plant';


describe('PlantService', () => {
  let service: PlantService;
  let httpMock: HttpTestingController;

  const mockPlant: Plant = { id: 1, name: 'Rose' } as Plant;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService],
    });

    service = TestBed.inject(PlantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPlants', () => {
    it('should fetch list of plants and next URL', () => {
      const mockResponse = {
        results: [mockPlant],
        next: 'next-page',
      };

      service.getPlants().subscribe((res) => {
        expect(res.plants.length).toBe(1);
        expect(res.plants[0]).toEqual(mockPlant);
        expect(res.next).toBe('next-page');
      });

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should use nextSuffix when provided', () => {
      const suffix = '?page=2';
      const mockResponse = { results: [], next: null };

      service.getPlants(suffix).subscribe((res) => {
        expect(res.plants).toEqual([]);
        expect(res.next).toBeNull();
      });

      const req = httpMock.expectOne(`${service['baseUrl']}${suffix}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPlantById', () => {
    it('should fetch a single plant by ID', () => {
      service.getPlantById(1).subscribe((plant) => {
        expect(plant).toEqual(mockPlant);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/1/`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPlant);
    });
  });
});
