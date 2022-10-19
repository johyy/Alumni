import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-compose',
  templateUrl: './post-compose.component.html',
  styleUrls: ['./post-compose.component.css']
})
export class PostComposeComponent implements OnInit {
  private postTargetId: number = 0;
  private target: String = "";
  private errorMsg: String | null = null;
  public postInEdit: Post | null = null;

  constructor(public router: Router, private location: Location,private route: ActivatedRoute, 
    private postService:PostService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.postTargetId = params['id'];
      this.target = params['target'];
      if(params['postId']){       
        this.postInEdit = this.postService.findPostById(params['postId']);
      }
    });
  }

  // Create a new post
  createPost(createPostForm: NgForm): void {
    const {title,post} = createPostForm.value;    
    if(createPostForm.valid){
      this.postService.createPost(title,post,this.target,this.postTargetId).subscribe(        
        resp => {if(resp.status == 201){
          const newPostId = resp.location.split("/").pop();
          this.router.navigate(['post',newPostId])
        }else this.errorMsg = "Could not create post"}
      )        
    }    
  }

  // Edit existing post
  editPost(createPostForm: NgForm): void {
    if (this.postInEdit && createPostForm.valid) {
      const {title,post} = createPostForm.value;
      const editedPost = this.postInEdit;
      editedPost.title = title;
      editedPost.body = post;

      this.postService.editPost(this.postInEdit.id,editedPost).subscribe(
        resp => console.log("post-compose: editPost response: " + resp)
      )
    }   
  }

  // Navigate a step back on cancel post
  cancel(): void {
    this.location.back()
  }

}
