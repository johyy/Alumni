import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ProfilePage } from './pages/profile/profile.page';
import { GroupListPage } from './pages/group-list/group-list.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TimelinePage,
    NavbarComponent,
    CalendarPage,
    ProfilePage,
    GroupListPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
