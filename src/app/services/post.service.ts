import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { finalize, Observable } from 'rxjs';
import { UserService } from './user.service';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Post[] | undefined = undefined;
  private _error: string = "";
  private _loading: boolean = false;

  get posts(): Post[] | undefined {
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
    if(StorageUtil.storageRead(StorageKeys.Posts)) {
      this._posts = StorageUtil.storageRead(StorageKeys.Posts)!;
      return;
    }
    this._loading = true;
    this.http.get<Post[]>(environment.apiPosts)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (posts: Post[]) => {
        posts.forEach(post => {
          const author = post.author;
          this.userService.findUserById(author).subscribe(user => post.author = user);
        })
        this._posts = posts;
        StorageUtil.storageSave(StorageKeys.Posts, posts);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  findPostById(postId: number): Post {
    if(!this.posts) {
      this.findPosts();
    }
    return this.posts?.find(post => post.id === postId)!;
  }
}
