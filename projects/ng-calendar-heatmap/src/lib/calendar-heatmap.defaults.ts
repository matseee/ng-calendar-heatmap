import { CalendarOptions } from './models/calendar-options';
import { CalendarWeekStart } from './enums/calendar-weekstart';


export const calendarDefaults: CalendarOptions = {
  width: 750,
  height: 110,
  legendWidth: 150,
  selector: '.container',
  SQUARE_LENGTH: 11,
  SQUARE_PADDING: 2,
  MONTH_LABEL_PADDING: 6,
  now: new Date(),
  yearAgo: new Date(),
  startDate: null,
  counterMap: {},
  data: [],
  max: null,
  colorRange: ['#D8E6E7', '#218380'],
  tooltipEnabled: true,
  tooltipUnit: 'contribution',
  legendEnabled: true,
  onClick: null,
  weekStart: CalendarWeekStart.SUNDAY,
  locale: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    no: 'No',
    on: 'on',
    less: 'Less',
    more: 'More'
  }
};
