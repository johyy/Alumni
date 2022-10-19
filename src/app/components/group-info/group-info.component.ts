import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupListService } from 'src/app/services/group-list.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {

  @Input() group!: Group;

  constructor(private groupListService: GroupListService, public router: Router) { }

  ngOnInit(): void { 
    let parts = this.router.url.split("/")
    this.group = this.groupListService.groupById(parseInt(parts[2]))!
  }

}
