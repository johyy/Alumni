import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic } from '../models/topic.model';
import { TopicService } from './topic.service';
import { UserService } from './user.service';

const { apiTopics } = environment

@Injectable({
  providedIn: 'root'
})
export class JoinTopicService {

  constructor(private http: HttpClient, 
              private readonly userService: UserService,
              private readonly topicService: TopicService
            ) { }

  public addToTopic(topicId: number): Observable<Topic> {
    if (!this.topicService.findTopicById(topicId)) {
      throw new Error("addToTopic: There is no Topic with this id")
    }

    const user: number = this.userService.user.id;
    const topic: Topic = this.topicService.findTopicById(topicId);

    if (!user) {
      throw new Error("addToTopic: No user")
    }

    this.userService.addToTopic(user, topic)

    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })

    return this.http.post<Topic>(`${apiTopics}/${topic.id}/join`, {
      users: [...topic.users]
    }, {
      headers
    })
  }

  public removeFromTopic(topicId: number): Observable<Topic> {
    if (!this.topicService.findTopicById(topicId)) {
      throw new Error("addToTopic: There is no Topic with this id")
    }

    const user: number = this.userService.user.id;
    const topic: Topic = this.topicService.findTopicById(topicId);

    if (!user) {
      throw new Error("addToTopic: No user")
    }

    this.userService.removeFromTopic(user, topic)

    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })

    return this.http.delete<Topic>(`${apiTopics}/${topic.id}/leave`, {
      headers
    })
  }
}        

