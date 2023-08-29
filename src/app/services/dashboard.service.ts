import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  getVoyagesCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/voyages/count`);
  }
  getConducteursCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/conducteurs/count`);
  }
  getCamionsCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/camions/count`);
  }
  getArretCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/arrets-camion/count`);
  }
  getTotalTravelTime(): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/voyages/total-travel-time`);
  }
  getVoyagesByDay(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/voyages/by-day`);
  }
  getTotalDistance(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/voyages/total-distance`);
  }
  getAverageDurations(): Observable<any[]> {
    const url = `${environment.apiUrl}/voyages/average-duration`;
    return this.http.get<any[]>(url);
  }
}
