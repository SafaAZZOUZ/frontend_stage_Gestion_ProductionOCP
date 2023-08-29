import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from '../model/user.model'; // Assurez-vous d'importer le modèle approprié

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8085'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.baseUrl}/users`);
  }

  // Supprimer un utilisateur par son ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, updatedUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.baseUrl}/users/${id}`, updatedUser);
  }

  // Récupérer un utilisateur par son ID
  getUserById(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/users/${id}`);
  }

  // Ajouter un nouvel utilisateur
  addUser(newUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.baseUrl}/users`, newUser);
  }
}
