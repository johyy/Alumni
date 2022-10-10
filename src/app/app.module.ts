import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GroupsListComponent } from './pages/groups-list/groups-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TimelinePage,
    NavbarComponent,
    CalendarComponent,
    ProfileComponent,
    GroupsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
