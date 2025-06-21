import {Plant} from './Plant';

export class ApiResponse{
  count: number;
  next: string | null;
  previous: string | null;
  results: Plant[];
}
