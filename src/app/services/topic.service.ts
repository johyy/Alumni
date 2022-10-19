import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
}
