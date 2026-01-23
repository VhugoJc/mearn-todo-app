import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Todo {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<ApiResponse<Todo[]>>(`${this.apiUrl}/todos`)
      .pipe(
        map(response => response.data.map(todo => ({
          ...todo,
          id: todo._id ? parseInt(todo._id.slice(-6), 16) : Date.now(),
          createdAt: new Date(todo.createdAt)
        }))),
        catchError(this.handleError)
      );
  }

  // Get todo by ID
  getTodoById(id: string): Observable<Todo> {
    return this.http.get<ApiResponse<Todo>>(`${this.apiUrl}/todos/${id}`)
      .pipe(
        map(response => ({
          ...response.data,
          id: response.data._id ? parseInt(response.data._id.slice(-6), 16) : Date.now(),
          createdAt: new Date(response.data.createdAt)
        })),
        catchError(this.handleError)
      );
  }

  // Get todos by status
  getTodosByStatus(status: 'todo' | 'in-progress' | 'completed'): Observable<Todo[]> {
    return this.http.get<ApiResponse<Todo[]>>(`${this.apiUrl}/todos/status/${status}`)
      .pipe(
        map(response => response.data.map(todo => ({
          ...todo,
          id: todo._id ? parseInt(todo._id.slice(-6), 16) : Date.now(),
          createdAt: new Date(todo.createdAt)
        }))),
        catchError(this.handleError)
      );
  }

  // Create new todo
  createTodo(todo: Omit<Todo, 'id' | 'createdAt' | '_id'>): Observable<Todo> {
    return this.http.post<ApiResponse<Todo>>(`${this.apiUrl}/todos`, todo)
      .pipe(
        map(response => ({
          ...response.data,
          id: response.data._id ? parseInt(response.data._id.slice(-6), 16) : Date.now(),
          createdAt: new Date(response.data.createdAt)
        })),
        catchError(this.handleError)
      );
  }

  // Update todo
  updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt' | '_id'>>): Observable<Todo> {
    return this.http.put<ApiResponse<Todo>>(`${this.apiUrl}/todos/${id}`, updates)
      .pipe(
        map(response => ({
          ...response.data,
          id: response.data._id ? parseInt(response.data._id.slice(-6), 16) : Date.now(),
          createdAt: new Date(response.data.createdAt)
        })),
        catchError(this.handleError)
      );
  }

  // Delete todo
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/todos/${id}`)
      .pipe(
        map(() => void 0),
        catchError(this.handleError)
      );
  }

  // Health check
  healthCheck(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/health`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('TodoService Error:', errorMessage);
    return throwError(() => errorMessage);
  }
}
