import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-compose',
  templateUrl: './post-compose.component.html',
  styleUrls: ['./post-compose.component.css']
})
export class PostComposeComponent implements OnInit {
  title: String = "";
  post: String = "";

  constructor() { } 

  ngOnInit(): void {
  }

  createPost(): void {
    console.log("Submitted");
    
  }

}
