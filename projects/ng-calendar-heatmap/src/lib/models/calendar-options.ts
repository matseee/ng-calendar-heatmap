import { CalendarData } from './calendar-data';
import { CalendarWeekStart } from '../enums/calendar-weekstart';
import { CalendarLocale } from './calendar-locale';

export function getDefaultOptions(): CalendarOptions {
  return {
    width: 705,
    height: 110,
    responsive: false,
    legendWidth: 95,
    SQUARE_LENGTH: 11,
    SQUARE_PADDING: 2,
    MONTH_LABEL_PADDING: 6,
    DAY_WIDTH: 12,
    MONTH_LABEL_HEIGHT: 10,
    now: new Date(),
    yearAgo: new Date(),
    startDate: null,
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
}

export interface CalendarOptions {
  width?: number;
  height?: number;
  responsive?: boolean;
  legendWidth?: number;
  SQUARE_LENGTH?: number;
  SQUARE_PADDING?: number;
  MONTH_LABEL_PADDING?: number;
  DAY_WIDTH?: number;
  MONTH_LABEL_HEIGHT?: number;
  now?: Date;
  yearAgo?: Date;
  startDate?: Date;
  max?: number;
  staticMax?: boolean;
  colorRange?: any[];
  tooltipEnabled?: boolean;
  tooltipUnit?: any;
  legendEnabled?: boolean;
  onClick?: (data?: CalendarData) => void;
  weekStart?: CalendarWeekStart;
  locale?: CalendarLocale;
}
