import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { TopicInfoComponent } from './components/topic-info/topic-info.component';

import { AuthGuard } from './guards/auth.guard';
import { AddGroupPage } from './pages/add-group/add-group.page';
import { AddTopicPage } from './pages/add-topic/add-topic.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { ExitTopicPage } from './pages/exit-topic/exit-topic.page';
import { GroupListPage } from './pages/group-list/group-list.page';
import { JoinGroupPage } from './pages/join-group/join-group.page';
import { JoinTopicPage } from './pages/join-topic/join-topic.page';
import { LeaveGroupPage } from './pages/leave-group/leave-group.page';
import { LoginPage } from './pages/login/login.page';
import { PostPage } from './pages/post/post.page';
import { ProfilePage } from './pages/profile/profile.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import { TopicListPage } from './pages/topic-list/topic-list.page';
import { EventsResolver } from './resolvers/events.resolver';

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  },
  {
    path: "timeline",
    component: TimelinePage,
    canActivate: [AuthGuard]
  },
  {
    path: "calendar",
    component: CalendarPage,
    canActivate: [AuthGuard],
    resolve: { events: EventsResolver }
  },
  {
    path: "profile",
    component: ProfilePage,
    canActivate: [AuthGuard]
  },
  {
    path: "groups",
    component: GroupListPage,
    canActivate: [AuthGuard]
  },
  {// New post ( e.g. post/group/1 | :id = group.id)
    path: "post/:target/:id", 
    component: CreatePostPage,
    canActivate: [AuthGuard]
  },
  {// Edit post ( e.g. post/group/1/2 | :id = group.id)
    path: "post/:target/:id/:postId", 
    component: CreatePostPage,
    canActivate: [AuthGuard]
  },
  {// Reply to post (e.g. post/reply/group/1/3 | :id = group.id | :ogId = originalpost.id)
    path: "post-reply/:target/:id/:ogId", 
    component: CreatePostPage,
    canActivate: [AuthGuard]
  },
  {
    path: "group/:id",
    component: GroupInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "post/:id",
    component: PostPage,
    canActivate: [AuthGuard]
  },
  {
    path: "join_group/:id",
    component: JoinGroupPage,
    canActivate: [AuthGuard]
  },
  {
    path: "leave_group/:id",
    component: LeaveGroupPage,
    canActivate: [AuthGuard]
  },
  {
    path: "topics",
    component: TopicListPage,
    canActivate: [AuthGuard]
  },
  {
  path: "topic/:id",
  component: TopicInfoComponent,
  canActivate: [AuthGuard]
  },
  {
    path: "join_topic/:id",
    component: JoinTopicPage,
    canActivate: [AuthGuard]
  },
  {
    path: "exit_topic/:id",
    component: ExitTopicPage,
    canActivate: [AuthGuard]
  },
  {
    path: "add_topic",
    component: AddTopicPage,
    canActivate: [AuthGuard]
  },
  {
    path: "add_group",
    component: AddGroupPage,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
