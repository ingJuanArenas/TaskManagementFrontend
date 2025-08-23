import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`, { headers: this.authService.getAuthHeaders() });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, task, { headers: this.authService.getAuthHeaders() });
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task, { headers: this.authService.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/status/${status}`, { headers: this.authService.getAuthHeaders() });
  }

  updateTaskStatus(id: number, status: string): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}/status/${status}`,{} ,{ headers: this.authService.getAuthHeaders() });
  }

}
