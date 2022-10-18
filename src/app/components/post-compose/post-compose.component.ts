import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'


@Component({
  selector: 'app-post-compose',
  templateUrl: './post-compose.component.html',
  styleUrls: ['./post-compose.component.css']
})
export class PostComposeComponent implements OnInit {

  constructor(public router: Router, private location: Location) { } 

  ngOnInit(): void {
  }

  createPost(createPostForm: NgForm): void {
    const {title,post} = createPostForm.value;    
    if(createPostForm.valid){

    }
    
  }

  // Navigate a step back on cancel post
  cancel(): void {
    this.location.back()
  }

}
