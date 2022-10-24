import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { finalize, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';
import { NewPost } from '../models/new-post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService { 
  private _posts!: Post[];
  private _error: string = "";
  private _loading: boolean = false;
  private _refreshPosts: boolean = false;

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
   * Create a new post. (POST). Id of created post in response.body.
   * @param post NewPost model
   * @returns http response
   */
   createPost(post: NewPost): Observable<any>{
    this._refreshPosts = true;
    return this.http.post<any>(`${environment.baseUrl}/post`,post,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response', }).pipe( 
        //tap(resp => console.log("post service createPost response: ",resp)),
        catchError(this.handleError<string>('createPost'))
    )
   };

   /**
    * Edit existing post (PUT)
    * @param postId 
    * @param post 
    * @returns 
    */
   editPost(postId: number, post: Post): Observable<string>{
    this._refreshPosts = true;
    const body: any = post;
    body.author = post.author.id;
    return this.http.put<any>(`${environment.baseUrl}/post/${postId}`,body,this.httpOptions).pipe(
      //tap(resp => console.log("post service editPost response: ",resp)), 
      catchError(this.handleError<string>('editPost'))
    )
   }

  
   /**
    * (GET) get all posts targeted to an event
    * @param eventId 
    * @returns 
    */
   findPostsByEvent(eventId:number): Observable<Post[]>{         
    return this.http.get<any>(`${environment.apiPosts}/event/${eventId}`).pipe(
      //tap(resp => console.log(resp)),
    )
  }

  public findPosts(): void {
    // If posts should be refreshed (after edit or new post), force fetching them from backend
    if(!this._refreshPosts) {
      // If posts are already fetched return
      if(this._posts) return;
      if(StorageUtil.storageRead(StorageKeys.Posts)) {
        this._posts = StorageUtil.storageRead(StorageKeys.Posts)!;
        this.findAuthors();
        return;
      }
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
        this._refreshPosts = false;
        this._posts = posts;
        StorageUtil.storageSave(StorageKeys.Posts, posts);
        this.findAuthors();
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  findAuthors() {
    const posts = this._posts;
    posts.forEach(post => {
      const author = post.author;
      this.userService.findUserById(author).subscribe(user => post.author = user);
    })
    this._posts = posts;
  }


  findPostById(postId: number): Post {
    if(!StorageUtil.storageRead<Post>(StorageKeys.Posts)) {      
      this.findPosts();
    }
    const post = this._posts.find((p: Post) => p.id == postId);
    
    return post!;
  }
}
