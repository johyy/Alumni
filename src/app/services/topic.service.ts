import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private _topics: Topic[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      })
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log((`${operation} failed: ${error.message}`));
      return of(result as T);
    };
  }
  
  get topics(): Topic[] {
    return this._topics;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient, private router: Router) { }

  findAllTopics(): void {
    this._loading = true;
    this.http.get<Topic[]>(environment.apiTopics)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (topics: Topic[]) => {
        this._topics = topics
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  findTopicById(id: number): Topic {
    const topic = this.topics.find((topic: Topic) => topic.id === id);
    return topic!
  }

  checkIfUserInTopic(userId: number, topic: Topic) {
    for (let user of topic.users) {
      if (user == userId) {
        return true
      } 
    }
    return false
  }

  navigateToTopicPage(topicId: number) {
    this.router.navigate(['/topic', topicId])
  }
  
  navigateToPage(boolean: boolean, topicId: number) {
    if (boolean === true) {
      this.router.navigate(['/join_topic', topicId])
    } else {
      this.router.navigate(['/exit_topic', topicId])
    }
  }

  createTopic(title: String, description: String): Observable<string>{
    const body = {
      title:title,
      description:description,
    }

    return this.http.post<any>(`${environment.baseUrl}/topic`,body,this.httpOptions).pipe(      
      catchError(this.handleError<string>('createTopic'))
    )
  }
}
