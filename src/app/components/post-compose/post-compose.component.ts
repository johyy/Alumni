import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { NewPost } from 'src/app/models/new-post.model';
import { TopicService } from 'src/app/services/topic.service';
import { GroupListService } from 'src/app/services/group-list.service';

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
  public targetTitle: String | undefined = undefined;

  constructor(public router: Router, private location: Location,private route: ActivatedRoute, 
    private postService:PostService, private topicService: TopicService, private glService: GroupListService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postTargetId = params['id'];      
      this.target = params['target'];
      if(params['postId']) this.postInEdit = this.postService.findPostById(params['postId']);      
      if(params['ogId']) this.ogPostId = params['ogId'];  
    });
    // Get target title for header h1 
    if(this.target == "group") this.targetTitle = this.glService.groups?.find(g=> g.id == this.postTargetId)?.title ?? this.targetTitle;
    if(this.target == "topic") this.targetTitle = this.topicService.topics?.find(t=> t.id == this.postTargetId)?.title ?? this.targetTitle;
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
          // If post is a reply navigate to thread, else to created post itself
          if((this.target === "event")){
            this.router.navigate(['event',this.postTargetId]);
          }else{
            const navigateToPostId = newPost.original_post_id != 0? newPost.original_post_id : resp.body;
            this.router.navigate(['post',navigateToPostId]);
          }
         
        } else this.errorMsg = "Failed to send post"}
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
