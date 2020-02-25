import { CalendarData } from './calendar-data';
import { CalendarWeekStart } from '../enums/calendar-weekstart';
import { CalendarLocale } from './calendar-locale';

export interface CalendarOptions {
  width?: number;
  height?: number;
  legendWidth?: number;
  selector?: string;
  SQUARE_LENGTH?: number;
  SQUARE_PADDING?: number;
  MONTH_LABEL_PADDING?: number;
  now?: Date;
  yearAgo?: Date;
  startDate?: Date;
  counterMap?: any;
  data?: CalendarData[];
  max?: number;
  colorRange?: any[];
  tooltipEnabled?: boolean;
  tooltipUnit?: any;
  legendEnabled?: boolean;
  onClick?: (data?: CalendarData) => void;
  weekStart?: CalendarWeekStart;
  locale?: CalendarLocale;
}
