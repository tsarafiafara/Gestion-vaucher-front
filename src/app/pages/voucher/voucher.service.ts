import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiUrl = 'http://localhost:8080/api/vouchers';

  constructor(private http: HttpClient) {}

  // Récupérer tous les vouchers
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un voucher par id
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un voucher
  create(voucher: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, voucher);
  }

  // Mettre à jour un voucher
  update(id: number, voucher: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, voucher);
  }

  // Supprimer un voucher
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

