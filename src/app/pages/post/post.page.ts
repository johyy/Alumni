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
  post: any;

  get posts(): Post[] {
    return this.postService.posts;
  }

  constructor(
    private readonly postService: PostService,
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.postService.findAuthors();
    this.activatedRoute.params.subscribe(params => {
      const id = parseInt(params["id"]);
      this.post = this.postService.findPostById(id);
    });
    this.groupListService.findAllGroups();
    this.topicService.findAllTopics();
    this.userService.findProfile();
  }

  handleEditClick() {
    this.router.navigateByUrl("/");
  }

}
