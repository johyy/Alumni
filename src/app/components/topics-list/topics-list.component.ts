import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {

  @Input() topics: Topic[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
