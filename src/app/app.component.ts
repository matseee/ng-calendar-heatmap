import { CalendarOptions } from './../../projects/ng-calendar-heatmap/src/lib/models/calendar-options';
import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';
import { CalendarData } from 'ng-calendar-heatmap';
import { CalendarWeekStart } from 'projects/ng-calendar-heatmap/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public chartData: CalendarData[];
  public chartData2: CalendarData[];

  public calendarOptions: CalendarOptions;

  constructor() {
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

    this.chartData = d3.timeDays(yearAgo, now).map(dateElement => {
      return {
        date: dateElement,
        count:
          dateElement.getDay() !== 0 && dateElement.getDay() !== 6
            ? Math.floor(Math.random() * 120)
            : Math.floor(Math.random() * 20)
      } as CalendarData;
    });

    this.chartData2 = d3.timeDays(yearAgo, now).map(dateElement => {
      return {
        date: dateElement,
        count:
          dateElement.getDay() !== 0 && dateElement.getDay() !== 6
            ? Math.floor(Math.random() * 60)
            : Math.floor(Math.random() * 10)
      } as CalendarData;
    });
  }
}
