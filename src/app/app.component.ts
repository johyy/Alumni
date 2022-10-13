import { Component } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alumni-front';

  get isLoggedIn() : Boolean | undefined {
    return keycloak.authenticated;
  }

  get token() : string | undefined {
    console.log(keycloak.token)
    return keycloak.token;
  }
}
