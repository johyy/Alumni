import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
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
import { CalendarComponent } from './components/calendar/calendar.component';
import { PostPage } from './pages/post/post.page';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupsListItemComponent } from './components/groups-list-item/groups-list-item.component';
import { PostComposeComponent } from './components/post-compose/post-compose.component';
import { FormsModule } from '@angular/forms';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveGroupButtonComponent } from './components/leave-group-button/leave-group-button.component';
import { LeaveGroupPage } from './pages/leave-group/leave-group.page';
import { JoinGroupPage } from './pages/join-group/join-group.page';
import { TopicListPage } from './pages/topic-list/topic-list.page';
import { TopicsListComponent } from './components/topics-list/topics-list.component';
import { TopicsListItemComponent } from './components/topics-list-item/topics-list-item.component';
import { TopicInfoComponent } from './components/topic-info/topic-info.component';
import { ExitTopicButtonComponent } from './components/exit-topic-button/exit-topic-button.component';
import { JoinTopicPage } from './pages/join-topic/join-topic.page';
import { ExitTopicPage } from './pages/exit-topic/exit-topic.page';
import { AddTopicButtonComponent } from './components/add-topic-button/add-topic-button.component';
import { AddGroupButtonComponent } from './components/add-group-button/add-group-button.component';
import { CreateEventPage } from './pages/create-event/create-event.page';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { AddTopicPage } from './pages/add-topic/add-topic.page';
import { TopicComposeComponent } from './components/topic-compose/topic-compose.component';
import { GroupComposeComponent } from './components/group-compose/group-compose.component';
import { EventPage } from './pages/event/event.page';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form.component';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { SearchComponent } from './components/search/search.component';
import { AddGroupPage } from './pages/add-group/add-group.page';
import { UserPage } from './pages/user/user.page';
import { ErrorPage } from './pages/error/error.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TimelinePage,
    NavbarComponent,
    CalendarPage,
    CalendarComponent,
    ProfilePage,
    GroupListPage,
    UserInfoComponent,
    PostListComponent,
    GroupInfoComponent,
    JoinButtonComponent,
    PostPage,
    GroupsListComponent,
    GroupsListItemComponent,
    JoinGroupPage,
    LeaveGroupPage,
    AddButtonsComponent,
    PostPage,
    PostComposeComponent,
    CreatePostPage,
    LeaveGroupButtonComponent,
    TopicListPage,
    TopicsListComponent,
    TopicsListItemComponent,
    TopicInfoComponent,
    ExitTopicButtonComponent,
    JoinTopicPage,
    ExitTopicPage,
    AddTopicButtonComponent,
    AddGroupButtonComponent,
    CreateEventPage,
    EventCreateComponent,
    AddTopicPage,
    TopicComposeComponent,
    AddGroupPage,
    GroupComposeComponent,
    EventPage,
    EventInfoComponent,
    PostListItemComponent,
    SearchComponent,
    EditProfilePage,
    EditProfileFormComponent,
    UserPage,
    ErrorPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
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
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
