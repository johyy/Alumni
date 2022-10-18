import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupListService } from 'src/app/services/group-list.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.page.html',
  styleUrls: ['./join-group.page.css']
})
export class JoinGroupPage implements OnInit {

  @Input() group!: Group;

  constructor(private groupListService: GroupListService, public router: Router) { }

  ngOnInit(): void {
    let parts = this.router.url.split("/")
    this.group = this.groupListService.groupById(parseInt(parts[2]))
  }

  onGroupPageClick(groupId: number) {
    this.groupListService.navigateToGroupPage(groupId);
  }

}
