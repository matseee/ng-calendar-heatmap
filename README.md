[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ffischer-matthias%2Fng-calendar-heatmap%2Fbadge&style=flat)](https://actions-badge.atrox.dev/fischer-matthias/ng-calendar-heatmap/goto) [![npm version](https://badge.fury.io/js/ng-calendar-heatmap.svg)](https://badge.fury.io/js/ng-calendar-heatmap) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# ng calendar heatmap [(live-demo)](http://fischer-matthias.github.io/ng-calendar-heatmap/)
![Example](./src/assets/ng-calendar-heatmap.png)

## How to use
1. Install `npm i --save ng-calendar-heatmap`
2. Install dependencies `npm i --save d3 momentjs`

2. Import module into `app.module.ts`:
```
...
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';
...
@NgModule({
  ...
  imports: [
    BrowserModule,
    CalendarHeatmapModule
  ],
  ...
```

3. Add calendar-heatmap component to your component:
```
<ng-calendar-heatmap [data]="calendarData" [options]="calendarOptions"></ng-calendar-heatmap>
```

4. Bind data (currently it only renders, when data is available)

## data structure

```
export interface CalendarData {
  date: Date;
  count: number;
}
```

```
export interface CalendarOptions {
  width?: number;
  height?: number;
  legendWidth?: number;
  SQUARE_LENGTH?: number;
  SQUARE_PADDING?: number;
  MONTH_LABEL_PADDING?: number;
  now?: Date;
  yearAgo?: Date;
  startDate?: Date;
  max?: number;
  colorRange?: any[];
  tooltipEnabled?: boolean;
  tooltipUnit?: any;
  legendEnabled?: boolean;
  onClick?: (data?: CalendarData) => void;
  weekStart?: CalendarWeekStart;
  locale?: CalendarLocale;
}
```

```
export enum CalendarWeekStart {
  SUNDAY = 0,
  MONDAY = 1
}
```

```
export interface CalendarLocale {
  months: string[];
  days: string[];
  no: string;
  on: string;
  less: string;
  more: string;
}
```

## angular wrapper for [calendar heatmap](https://github.com/DKirwan/calendar-heatmap)
