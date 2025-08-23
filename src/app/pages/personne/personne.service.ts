import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Personne {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  etablissementSanitaireId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = 'http://localhost:8080/api/personne';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.apiUrl);
  }

  create(personne: Personne): Observable<Personne> {
    return this.http.post<Personne>(this.apiUrl, personne);
  }

  update(id: number, personne: Personne): Observable<Personne> {
    return this.http.put<Personne>(`${this.apiUrl}/${id}`, personne);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

