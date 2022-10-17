import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Post[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get posts(): Post[] {
    return this._posts;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) { }

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
        posts.forEach(post => {
          const author = post.author;
          this.userService.findUserById(author).subscribe(user => post.author = user);
        })
        this._posts = posts;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
