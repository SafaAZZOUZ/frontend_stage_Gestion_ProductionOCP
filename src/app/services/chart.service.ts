import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) {}
  fetchChartData() {
    const apiUrl = 'http://localhost:8085/qualites/time-series'; // Mettez l'URL correcte de votre API
    return this.http.get<any[]>(apiUrl);
  }
  getQuantiteExtractionTimeSeries(): Observable<any[]> {
    const apiUrl = 'http://localhost:8085/qualites/quantite-extraction-time-series';
    return this.http.get<any[]>(apiUrl);
  }
}
