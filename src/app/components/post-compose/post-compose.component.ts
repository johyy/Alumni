import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { NewPost } from 'src/app/models/new-post.model';

@Component({
  selector: 'app-post-compose',
  templateUrl: './post-compose.component.html',
  styleUrls: ['./post-compose.component.css']
})
export class PostComposeComponent implements OnInit {
  private ogPostId: number = 0;
  private postTargetId: number = 0;
  private target: String = "";
  public errorMsg: String | null = null;
  public postInEdit: Post | null = null;

  constructor(public router: Router, private location: Location,private route: ActivatedRoute, 
    private postService:PostService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postTargetId = params['id'];      
      this.target = params['target'];
      if(params['postId']) this.postInEdit = this.postService.findPostById(params['postId']);      
      if(params['ogId']) this.ogPostId = params['ogId'];  
    });
  }

  // Create a new post. 
  createPost(createPostForm: NgForm): void {
    const {title,post} = createPostForm.value;
    const newPost: NewPost = {
      title:title,
      body:post,
      target_group_id:0,
      target_topic_id: 0,
      target_event_id:0,
      original_post_id:0
    } // Set values depending on if we are creating an original post or a reply and
      // whether the post is targeting group/topic or event
    if(this.ogPostId != 0) newPost.original_post_id = this.ogPostId;
    if(this.target === "group") newPost.target_group_id = this.postTargetId;
    else if(this.target === "event") newPost.target_event_id = this.postTargetId;
    else if (this.target === "topic") newPost.target_topic_id = this.postTargetId;
    // Call createPost and navigate to post/{post_id} on success
    if(createPostForm.valid){      
      this.postService.createPost(newPost).subscribe( 
        resp => {if(resp.status == 201){
          this.router.navigate(['post',resp.body])
        }else this.errorMsg = "Failed to send post"}
      )        
    }    
  }

  // Edit existing post. 
  editPost(createPostForm: NgForm): void {
    if (this.postInEdit && createPostForm.valid) {
      const {title,post} = createPostForm.value;
      const editedPost = this.postInEdit;
      editedPost.title = title;
      editedPost.body = post;
      // Call editPost and navigate to post/{post_id}
      this.postService.editPost(this.postInEdit.id,editedPost).subscribe(
        ()=> this.router.navigate(['post',editedPost.id])
      )
    }   
  }

  // Navigate a step back
  cancel(): void {
    this.location.back()
  }

}
