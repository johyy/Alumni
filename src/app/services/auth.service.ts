import { Injectable } from '@angular/core';
import keycloak from 'src/keycloak';
import { KeycloakLoginOptions } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    return keycloak.authenticated;
  }

  login() {
    const keycloakLoginOptions: KeycloakLoginOptions = {
      redirectUri: location + '/timeline'
    }
    keycloak.login(keycloakLoginOptions);
  }

  logout() {
    keycloak.logout();
  }
}
