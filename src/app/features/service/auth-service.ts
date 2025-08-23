import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface AuthUser {
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users/me';
  private userSubject = new BehaviorSubject<AuthUser | null>(null);
  user$ = this.userSubject.asObservable();
  private credentials: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthUser> {
    this.credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.credentials}`
    });
    return new Observable<AuthUser>(observer => {
      this.http.get<AuthUser>(this.apiUrl, { headers }).subscribe({
        next: user => {
          this.userSubject.next(user);
          observer.next(user);
          observer.complete();
        },
        error: err => {
          this.userSubject.next(null);
          observer.error(err);
        }
      });
    });
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Basic ${this.credentials}`
    });
  }

  logout() {
    this.credentials = null;
    this.userSubject.next(null);
  }
}
