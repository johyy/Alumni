import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GroupsListComponent } from './pages/groups-list/groups-list.component';
import { LoginPage } from './pages/login/login.page';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimelinePage } from './pages/timeline/timeline.page';

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  },
  {
    path: "timeline",
    component: TimelinePage
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "groups",
    component: GroupsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
