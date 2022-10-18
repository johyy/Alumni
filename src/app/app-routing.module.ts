import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { AuthGuard } from './guards/auth.guard';
import { CalendarPage } from './pages/calendar/calendar.page';
import { GroupListPage } from './pages/group-list/group-list.page';
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
    path: "group/:id",
    component: GroupInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "post/:id",
    component: PostPage,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
