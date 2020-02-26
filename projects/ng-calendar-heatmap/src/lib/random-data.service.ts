import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as _moment from 'moment';

const moment = _moment;

import { CalendarData } from './models/calendar-data';

@Injectable({
    providedIn: 'root',
})
export class RandomDataService {
    constructor() { }

    generate(minCount: number = 10, maxCount: number = 60): CalendarData[] {
        let calendarData = [];

        const now: Date = moment()
            .endOf('day')
            .toDate();
        const yearAgo: Date = moment()
            .startOf('day')
            .subtract(1, 'year')
            .toDate();

        calendarData = d3.timeDays(yearAgo, now).map(dateElement => {
            return {
                date: dateElement,
                count:
                    dateElement.getDay() !== 0 && dateElement.getDay() !== 6
                        ? Math.floor(Math.random() * maxCount)
                        : Math.floor(Math.random() * minCount)
            } as CalendarData;
        });

        return calendarData;
    }
}