import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Voyage } from '../model/Voyage';
import {Camion} from '../model/Camion';
import {Conducteur} from '../model/Conducteur';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) { }

  getAllVoyages(): Observable<Voyage[]> {
    return this.http.get<Voyage[]>(`${environment.apiUrl}/voyages`);
  }

  addVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(`${environment.apiUrl}/voyages`, voyage);
  }

  getVoyageById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${environment.apiUrl}/voyages/${id}`);
  }

  updateVoyage(id: number, voyage: Voyage): Observable<Voyage> {
    return this.http.put<Voyage>(`${environment.apiUrl}/voyages/${id}`, voyage);
  }
  deleteVoyage(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/voyages/${id}`);
  }
  getCamionsForVoyage(id: number): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${environment.apiUrl}/voyages/${id}/camions`);
  }

  getConducteursForVoyage(id: number): Observable<Conducteur[]> {
    return this.http.get<Conducteur[]>(`${environment.apiUrl}/voyages/${id}/conducteurs`);
  }
  getAllCamions(): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${environment.apiUrl}/camions`);
  }
  getAllConducteurs(): Observable<Conducteur[]> {
    return this.http.get<Conducteur[]>(`${environment.apiUrl}/conducteurs`);
  }
  getAverageDurationData(): Observable<any[]> {
    const url = `${this.baseUrl}/voyages/average-duration-in-days`;
    return this.http.get<any[]>(url);
  }
}
