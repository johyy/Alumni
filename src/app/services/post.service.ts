import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log((`${operation} failed: ${error.message}`));
      return of(result as T);
    };
  }
  
  constructor(private http: HttpClient) { }

  /**
   * Create a new post.
   * @param title title of the post
   * @param post posts text body
   * @param target target of post (e.g. group / event)
   * @param target_id id of target
   * @returns 
   */
  createPost(title: String, post: String,target: String ,target_id:number): Observable<string>{
    const body = {
      title:title,
      body:post,
      target_group_id:0,
      target_event_id:0
    }
    if(target === "group") body.target_group_id = target_id;
    else if(target === "event") body.target_event_id = target_id;

    return this.http.post<any>(`${environment.baseUrl}/post`,body,this.httpOptions).pipe(      
      catchError(this.handleError<string>('createPost'))
    )
  }
}
