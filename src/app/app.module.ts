import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { TimelinePage } from './pages/timeline/timeline.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TimelinePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
