import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  isTopName(): boolean {
    let name = this.router.url.charAt(1).toUpperCase() + this.router.url.substring(2)
    if (name === "Timeline" || name === "Groups" || name === "Topics" || name === "Calendar" || name === "Profile") {
      return true;
    }
    return false
  }
}
