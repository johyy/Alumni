import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css']
})
export class PostPage implements OnInit {
  postId: number = 0;

  get posts(): Post[] {
    return this.postService.posts;
  }

  get post(): Post {
    return this.postService.findPostById(this.postId);
  }

  constructor(
    private readonly postService: PostService,
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.groupListService.findAllGroups();
    this.topicService.findAllTopics();
    this.userService.findProfile();
    let parts = this.router.url.split("/");
    this.postId = parseInt(parts[2]);
  }

  // Handle edit post click, navigate -> CreatePostPage
  handleEditClick(post: Post):void {
    if(post){
      const {target, targetId} = this.checkTarget(post);
      this.router.navigate(['post',target,targetId,post.id])
    }
  }

  // Handle reply to post, navigate -> CreatePostPage
  replyPost(post: Post):void{ 
    if(post){
      const {target, targetId} = this.checkTarget(post);
      this.router.navigate(['post-reply',target,targetId,post.id])
    }
  }

  // Determine what is the target audience of a post (group,event or topic) and id of that target
  private checkTarget(post: Post): {target: string, targetId: number}{
      let targetId = post.target_group_id;
      let target = "group";
      if(post.target_event_id != 0) {
        target = "event";
        targetId = post.target_event_id;
      }else if(post.target_topic_id != 0) {
        target = "topic";
        targetId = post.target_topic_id;
      }
    return {target, targetId}
  }

  loading(): boolean {
    let stillLoading = false;
    if(this.postService.loading) stillLoading = true;
    if(this.groupListService.loading) stillLoading = true;
    if(this.topicService.loading) stillLoading = true;
    if(this.userService.loading) stillLoading = true;
    return stillLoading;
  }

  navigateToUser(userId: number) {
    this.router.navigateByUrl(`/user/${userId}`);
  }
}
