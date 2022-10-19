import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { AuthGuard } from './guards/auth.guard';
import { CalendarPage } from './pages/calendar/calendar.page';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { GroupListPage } from './pages/group-list/group-list.page';
import { JoinGroupPage } from './pages/join-group/join-group.page';
import { LeaveGroupPage } from './pages/leave-group/leave-group.page';
import { LoginPage } from './pages/login/login.page';
import { PostPage } from './pages/post/post.page';
import { ProfilePage } from './pages/profile/profile.page';
import { TimelinePage } from './pages/timeline/timeline.page';

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
    canActivate: [AuthGuard]
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
  {
    path: "post/:target/:id",
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
