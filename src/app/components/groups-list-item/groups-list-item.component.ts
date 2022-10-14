import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupListService } from 'src/app/services/group-list.service';

@Component({
  selector: 'app-groups-list-item',
  templateUrl: './groups-list-item.component.html',
  styleUrls: ['./groups-list-item.component.css']
})
export class GroupsListItemComponent implements OnInit {

  @Input() group?: Group;

  constructor(private groupListService: GroupListService) { }

  ngOnInit(): void {
  }

  onGroupClicked(groupId: number) {
    this.groupListService.navigateToGroupPage(groupId);
  }

}
