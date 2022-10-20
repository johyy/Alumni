import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { Group } from 'src/app/models/group.model';
import { Topic } from 'src/app/models/topic.model';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html',
  styleUrls: ['./add-buttons.component.css']
})
export class AddButtonsComponent implements OnInit {

  @Input() entity!: Group | Event | Topic;
  @Input() target!: String;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  newPost():void{
    if(this.entity && this.target){
      this.router.navigate(['post',this.target,this.entity.id])
    }
  }
  newEvent():void{
    if(this.entity && this.target){
      this.router.navigate(['event',this.target,this.entity.id])
    }
  }

}
