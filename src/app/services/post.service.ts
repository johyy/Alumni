import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Post[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get posts(): Post[] {
    console.log(typeof(this._posts))
    return this._posts;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  public findPosts(): void {
    this._loading = true;
    this.http.get<Post[]>(environment.apiPosts)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (posts: Post[]) => {
        console.log(posts);
        this._posts = posts;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
