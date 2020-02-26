import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';
import { CalendarData, CalendarWeekStart, CalendarOptions } from 'ng-calendar-heatmap';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public calendarData: CalendarData[];
  public calendarData2: CalendarData[];

  public calendarOptions: CalendarOptions;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon(
      'github-circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github-circle.svg'));

    const now: Date = moment()
      .endOf('day')
      .toDate();
    const yearAgo: Date = moment()
      .startOf('day')
      .subtract(1, 'year')
      .toDate();

    this.calendarOptions = {
      weekStart: CalendarWeekStart.MONDAY,
      onClick: (data: CalendarData) => console.log(data),
      colorRange: ['#D8E6E7', '#832124']
    };

    this.calendarData = d3.timeDays(yearAgo, now).map(dateElement => {
      return {
        date: dateElement,
        count:
          dateElement.getDay() !== 0 && dateElement.getDay() !== 6
            ? Math.floor(Math.random() * 120)
            : Math.floor(Math.random() * 20)
      } as CalendarData;
    });

    this.calendarData2 = d3.timeDays(yearAgo, now).map(dateElement => {
      return {
        date: dateElement,
        count:
          dateElement.getDay() !== 0 && dateElement.getDay() !== 6
            ? Math.floor(Math.random() * 60)
            : Math.floor(Math.random() * 10)
      } as CalendarData;
    });
  }

  openGithub() {
    window.open('https://github.com/fischer-matthias/ng-calendar-heatmap');
  }
}
