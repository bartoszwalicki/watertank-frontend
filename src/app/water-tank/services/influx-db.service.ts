import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfluxDbService {
  constructor(private httpClient: HttpClient) {}

  public getMeasurment(): Observable<any> {
    return this.httpClient.get('/api/water-level');
  }
}
