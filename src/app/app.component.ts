import { Component } from '@angular/core';
import { CalendarData, CalendarWeekStart, CalendarOptions, RandomDataService } from 'ng-calendar-heatmap';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public calendarData: CalendarData[];

  public calendarDataCustom: CalendarData[];
  public calendarOptionsCustom: CalendarOptions;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, protected randomDataService: RandomDataService) {

    iconRegistry.addSvgIcon(
      'github-circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github-circle.svg'));

    this.calendarOptionsCustom = {
      weekStart: CalendarWeekStart.MONDAY,
      responsive: true,
      onClick: (data: CalendarData) => console.log(data),
      colorRange: ['#D8E6E7', '#832124'],
      staticMax: true,
      max: 10
    };

    this.calendarData = randomDataService.generate(10, 20);
    this.calendarDataCustom = randomDataService.generate(5, 120);
  }

  openGithub() {
    window.open('https://github.com/fischer-matthias/ng-calendar-heatmap');
  }

  newData() {
    this.calendarData = this.randomDataService.generate(10, 20);
    this.calendarDataCustom = this.randomDataService.generate(5, 120);
  }

  clearData() {
    this.calendarData = [];
    this.calendarDataCustom = [];
  }
}
