import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive'


@NgModule({
  declarations: [
    AppComponent,
    IntersectionObserverDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
