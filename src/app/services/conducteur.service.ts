import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Conducteur} from '../model/Conducteur';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  constructor(private http: HttpClient) { }

  getAllConducteurs(): Observable<Conducteur[]> {
    return this.http.get<Conducteur[]>(`${environment.apiUrl}/conducteurs`);
  }

  addConducteur(conducteur: Conducteur): Observable<Conducteur> {
    return this.http.post<Conducteur>(`${environment.apiUrl}/conducteurs`, conducteur);
  }

  getConducteurById(id: number): Observable<Conducteur> {
    return this.http.get<Conducteur>(`${environment.apiUrl}/conducteurs/${id}`);
  }

  updateConducteur(id: number, conducteur: Conducteur): Observable<Conducteur> {
    return this.http.put<Conducteur>(`${environment.apiUrl}/conducteurs/${id}`, conducteur);
  }
  deleteConducteur(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/conducteurs/${id}`);
  }
  getConducteurConsommation(id: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/conducteurs/${id}/consommation`);
  }

  getConducteurVitesse(id: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/conducteurs/${id}/vitesse`);
  }
}

