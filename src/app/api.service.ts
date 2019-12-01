import {Injectable} from '@angular/core';
import {Todo} from './todo';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL + '/todos').pipe(
      catchError(this.handleError)
    );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL + '/todos', todo).pipe(
      catchError(this.handleError)
    );
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(this.API_URL + '/todos/' + todoId).pipe(
      catchError(this.handleError)
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.API_URL + '/todos/' + todo.id, todo).pipe(
      catchError(this.handleError)
    );
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http.delete<null>(this.API_URL + '/todos/' + todoId).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
