import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { finalize, firstValueFrom, Observable, take, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class PostService { 
  private _posts!: Post[];
  private _error: string = "";
  private _loading: boolean = false;

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

  public findPosts(): void {
    if(this._posts) return;
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
        this._posts = posts;
        StorageUtil.storageSave(StorageKeys.Posts, posts);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  findAuthors() {
    if(typeof this._posts[0].author === "object") return;
    const posts = this._posts;
    posts.forEach(post => {
      const author = post.author;
      this.userService.findUserById(author).subscribe(user => post.author = user);
    })
    StorageUtil.storageSave(StorageKeys.Posts, posts);
    this._posts = posts;
  }


  findPostById(postId: number): Post {
    if(!StorageUtil.storageRead<Post>(StorageKeys.Posts)) {
      this.findPosts();
    }
    const post = this._posts.find((p: Post) => p.id === postId);
    return post!;
  }
}
