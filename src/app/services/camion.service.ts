import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Camion} from '../model/Camion';
import {Voyage} from '../model/Voyage';

@Injectable({
  providedIn: 'root'
})
export class CamionService {
  constructor(private http: HttpClient) { }

  getAllCamions(): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${environment.apiUrl}/camions`);
  }

  addCamion(camion: Camion): Observable<Camion> {
    return this.http.post<Camion>(`${environment.apiUrl}/camions`, camion);
  }

  getCamionById(id: number): Observable<Camion> {
    return this.http.get<Camion>(`${environment.apiUrl}/camions/${id}`);
  }

  updateCamion(id: number, camion: Camion): Observable<Camion> {
    return this.http.put<Camion>(`${environment.apiUrl}/camions/${id}`, camion);
  }
  deleteCamion(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/camions/${id}`);
  }
}
