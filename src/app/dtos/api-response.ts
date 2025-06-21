import {Plant} from './plant';

export class ApiResponse{
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Plant[];
}
