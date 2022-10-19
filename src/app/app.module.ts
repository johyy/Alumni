import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ProfilePage } from './pages/profile/profile.page';
import { GroupListPage } from './pages/group-list/group-list.page';
import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';
import { RefreshTokenHttpInterceptor } from './interceptors/refresh-token-http.interceptor';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { JoinButtonComponent } from './components/join-button/join-button.component';
import { AddButtonsComponent } from './components/add-buttons/add-buttons.component';
import { PostPage } from './pages/post/post.page';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupsListItemComponent } from './components/groups-list-item/groups-list-item.component';
import { PostComposeComponent } from './components/post-compose/post-compose.component';
import { FormsModule } from '@angular/forms';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { LeaveGroupButtonComponent } from './components/leave-group-button/leave-group-button.component';
import { LeaveGroupPage } from './pages/leave-group/leave-group.page';
import { JoinGroupPage } from './pages/join-group/join-group.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TimelinePage,
    NavbarComponent,
    CalendarPage,
    ProfilePage,
    GroupListPage,
    UserInfoComponent,
    PostListComponent,
    GroupInfoComponent,
    JoinButtonComponent,
    PostPage,
    GroupsListComponent,
    GroupsListItemComponent,
    AddButtonsComponent,
    PostPage,
    PostComposeComponent,
    CreatePostPage,
    LeaveGroupButtonComponent,
    LeaveGroupPage,
    JoinGroupPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenHttpInterceptor,
      multi: true,
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
