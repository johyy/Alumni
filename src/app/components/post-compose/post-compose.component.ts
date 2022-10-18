import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-compose',
  templateUrl: './post-compose.component.html',
  styleUrls: ['./post-compose.component.css']
})
export class PostComposeComponent implements OnInit {
  private postTargetId:number = 0;
  private target:String = "";

  constructor(public router: Router, private location: Location,private route: ActivatedRoute, 
    private postService:PostService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postTargetId = params['id'];
      this.target = params['target'];
    });
  }

  // Create a new post
  createPost(createPostForm: NgForm): void {
    const {title,post} = createPostForm.value;    
    if(createPostForm.valid){
      this.postService.createPost(title,post,this.target,this.postTargetId).subscribe(
        resp => console.log("post-compose: createPost response: "+resp));
    }    
  }

  // Navigate a step back on cancel post
  cancel(): void {
    this.location.back()
  }

}
