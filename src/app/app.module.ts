import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarHeatmapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
