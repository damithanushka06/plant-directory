import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Plant} from '../dtos/plant';
import {ApiResponse} from '../dtos/api-response';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private baseUrl = 'https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient) {}


  /**
   * Fetches a paginated list of plants from the API.
   *
   * @param nextSuffix Optional query string suffix for pagination (e.g. "?offset=10").
   *                   If provided, fetches the next page of results; otherwise fetches the first page.
   * @returns An Observable emitting an object containing:
   *          - plants: Array of Plant objects retrieved from the API.
   *          - next: The query string suffix for the next page, or null if no more pages.
   */
  getPlants(nextSuffix: string = ''): Observable<{ plants: Plant[]; next: string | null }> {
    const url = nextSuffix ? `${this.baseUrl}${nextSuffix}` : this.baseUrl;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => ({
        plants: response.results ?? [],
        next: response.next ?? null
      }))
    );
  }

  /**
   * Fetches the details of a single plant by its ID.
   *
   * @param id The unique identifier of the plant to retrieve.
   * @returns An Observable emitting the Plant object matching the specified ID.
   */
  getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.baseUrl}/${id}/`);
  }
}
