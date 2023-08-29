import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ArretCamion} from '../model/ArretCamion';
import {Camion} from '../model/Camion';

@Injectable({
  providedIn: 'root'
})
export class ArretService {

  constructor(private http: HttpClient) { }

  getAllArret(): Observable<ArretCamion[]> {
    return this.http.get<ArretCamion[]>(`${environment.apiUrl}/arrets-camion`);
  }

  addArret(arret: ArretCamion): Observable<ArretCamion> {
    return this.http.post<ArretCamion>(`${environment.apiUrl}/arrets-camion`, arret);
  }
  getCamionOfArret(id: number): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${environment.apiUrl}/arrets-camion/${id}/camion`);
  }
  getAllCamions(): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${environment.apiUrl}/camions`);
  }
  getArretById(id: number): Observable<ArretCamion> {
    return this.http.get<ArretCamion>(`${environment.apiUrl}/arrets-camion/${id}`);
  }

  updateArret(id: number, arret: ArretCamion): Observable<ArretCamion> {
    return this.http.put<ArretCamion>(`${environment.apiUrl}/arrets-camion/${id}`, arret);
  }
  deleteArret(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/arrets-camion/${id}`);
  }

}
