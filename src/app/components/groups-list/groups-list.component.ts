import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  @Input() groups: Group[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
