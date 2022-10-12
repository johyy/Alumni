import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dropDownText = "Timeline";
  showTimelineOption = false;
  showGroupsOption = true;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  handleClickTimelineButton() {
    this.dropDownText = "Timeline";
    this.showTimelineOption = false;
    this.showGroupsOption = true;
  }

  handleClickGroupsButton() {
    this.dropDownText = "Groups";
    this.showGroupsOption = false;
    this.showTimelineOption = true;
  }

}
