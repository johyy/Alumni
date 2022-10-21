import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, firstValueFrom, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Group } from '../models/group.model';
import { Topic } from '../models/topic.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { apiUsers } = environment

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',})
  };

  private _user!: User;
  private _error: string = "";
  private _loading: boolean = false;

  get user(): User {
    return this._user;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { } 

  public findProfile(): void {
    if (this._user) return;
    if (StorageUtil.storageReadOne(StorageKeys.User)) {
      this._user = StorageUtil.storageReadOne(StorageKeys.User)!;
      return;
    }
    this._loading = true;
    this.http.get<User>(apiUsers)
    .pipe( 
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (user: User) => {
        this._user = user
        StorageUtil.StorageSaveOne(StorageKeys.User, user);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  // -------- Test method --------
  public userFindTest(): Observable<User>{
    return this.http.get<User>(apiUsers).pipe(
      tap(resp => {StorageUtil.StorageSaveOne(StorageKeys.User,resp);})      
    )
  }

  /**
   * (POST) Get list of users takes in params as: { "userIds" : [1, 2, 3] }
   * @param userIdList 
   * @returns 
   */
  findUsersByIdList(userIdList: Object): Observable<User[]>{
    return this.http.post<User[]>(`${environment.apiUsers}/list`,userIdList,).pipe(
      //tap(resp => console.log(resp)),
    )
  }


  public findUserById(id: User | number): Observable<User> {
    if (!StorageUtil.storageReadOne<User>(StorageKeys.User)) {
      this.findProfile();
    }
    return this.http.get<User>(apiUsers + "/" + id);
  }

  public addToGroup(userId: number, group: Group): void {
    if (group) {
      group.users.push(userId);
    }
  }

  public removeFromGroup(userId: number, group: Group): void {
    if (group) {
      group.users = group.users.filter((userId: number) => this.user.id !== userId)
    }
  }

  public addToTopic(userId: number, topic: Topic): void {
    if (topic) {
      topic.users.push(userId);
    }
  }

  public removeFromTopic(userId: number, topic: Topic): void {
    if (topic) {
      topic.users = topic.users.filter((userId: number) => this.user.id !== userId)
    }
  }
}
