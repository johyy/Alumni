import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupListService } from 'src/app/services/group-list.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.page.html',
  styleUrls: ['./group-list.page.css']
})
export class GroupListPage implements OnInit {

  get groups(): Group[] {
    return this.groupListService.groups;
  }

  get loading(): boolean {
    return this.groupListService.loading;
  }

  get error(): string {
    return this.groupListService.error;
  }

  constructor(
    private readonly groupListService: GroupListService
  ) { }

  ngOnInit(): void {
    this.groupListService.findAllGroups();
  }

}
