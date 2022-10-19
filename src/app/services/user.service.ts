import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, firstValueFrom, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { apiUsers } = environment

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
        
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public findUserById(id: User): Observable<User> {
    return this.http.get<User>(apiUsers + "/" + id);
  }
}
