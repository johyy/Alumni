import { Injectable } from '@angular/core';
import keycloak from 'src/keycloak';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    return keycloak.authenticated;
  }

  login() {
    keycloak.login();
  }

  logout() {
    keycloak.logout();
  }
}
