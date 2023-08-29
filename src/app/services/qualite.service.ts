import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Qualite} from '../model/Qualite';

@Injectable({
  providedIn: 'root'
})
export class QualiteService {

  constructor(private http: HttpClient) { }

  getAllQualites(): Observable<Qualite[]> {
    return this.http.get<Qualite[]>(`${environment.apiUrl}/qualites`);
  }

  addQualite(qualite: Qualite): Observable<Qualite> {
    return this.http.post<Qualite>(`${environment.apiUrl}/qualites`, qualite);
  }

  getQualiteById(id: number): Observable<Qualite> {
    return this.http.get<Qualite>(`${environment.apiUrl}/qualites/${id}`);
  }

  updateQualite(id: number, qualite: Qualite): Observable<Qualite> {
    return this.http.put<Qualite>(`${environment.apiUrl}/qualites/${id}`, qualite);
  }
  deleteQualite(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/qualites/${id}`);
  }
}
