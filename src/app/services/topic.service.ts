import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private _topics: Topic[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get topics(): Topic[] {
    return this._topics;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

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

  findTopicById(id: number): Topic | undefined {
    return this.topics.find((topic: Topic) => topic.id === id);
  }
}
