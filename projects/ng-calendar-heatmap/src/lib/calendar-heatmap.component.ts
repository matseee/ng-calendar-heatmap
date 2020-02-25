import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';
import { CalendarWeekStart } from './enums/calendar-weekstart';
import { CalendarData } from './models/calendar-data';
import { CalendarOptions } from './models/calendar-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar-heatmap',
  template: `
    <div #container></div>
  `,
  styles: []
})
export class CalendarHeatmapComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('options') overwriteOptions: CalendarOptions;

  @Input() data: CalendarData[];

  protected dateRange: Date[];
  protected monthRange: Date[];
  protected firstDate: any;

  protected color: any;

  protected tooltip: any;
  protected dayRects: any;

  protected container: HTMLDivElement;
  protected options: CalendarOptions = {
    width: 750,
    height: 110,
    legendWidth: 150,
    selector: 'body',
    SQUARE_LENGTH: 11,
    SQUARE_PADDING: 2,
    MONTH_LABEL_PADDING: 6,
    now: moment().endOf('day').toDate(),
    yearAgo: moment().startOf('day').subtract(1, 'year').toDate(),
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

  constructor() { }

  ngOnInit(): void {
    // TODO: override options :)
  }

  render() {
    d3.select(this.options.selector)
      .selectAll('svg.calendar-heatmap')
      .remove();

    this.dateRange = d3.timeDays(this.options.yearAgo, this.options.now);
    this.monthRange = d3.timeMonths(moment(this.options.yearAgo).startOf('month').toDate(), this.options.now);
    this.firstDate = moment(this.dateRange[0]).toDate();
    if (this.options.data.length === 0) {
      this.options.max = 0;
    } else if (this.options.max === null) {
      this.options.max = d3.max(this.data, (d) => d.count);
    }

    // color range
    this.color = d3.scaleLinear()
      .range(this.options.colorRange)
      .domain([0, this.options.max]);

    this.renderChart();
  }

  protected renderChart() {
    const me = this;
    const svg = d3.select(this.options.selector)
      .style('position', 'relative')
      .append('svg')
      .attr('width', this.options.width)
      .attr('class', 'calendar-heatmap')
      .attr('height', this.options.height)
      .style('padding', '36px');

    this.dayRects = svg.selectAll('.day-cell')
      .data(this.dateRange);

    const enterSelection = this.dayRects.enter().append('rect')
      .attr('class', 'day-cell')
      .attr('width', this.options.SQUARE_LENGTH)
      .attr('height', this.options.SQUARE_LENGTH)
      .attr('fill', (d) => this.color(this.countForDate(d)))
      .attr('x', (d, i) => {
        const cellDate = moment(d);
        const result = cellDate.week() - this.firstDate.week()
          + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        return result * (this.options.SQUARE_LENGTH + this.options.SQUARE_PADDING);
      })
      .attr('y', (d, i) => {
        return me.options.MONTH_LABEL_PADDING + me.formatWeekday(d.getDay()) * (me.options.SQUARE_LENGTH + me.options.SQUARE_PADDING);
      });

    if (typeof this.options.onClick === 'function') {
      enterSelection.merge(this.dayRects).on('click', (d) => {
        const count = this.countForDate(d);
        this.options.onClick({ date: d, count });
      });
    }

    if (this.options.tooltipEnabled) {
      enterSelection.merge(this.dayRects).on('mouseover', (d, i) => {
        this.tooltip = d3.select(this.options.selector)
          .append('div')
          .attr('class', 'day-cell-tooltip')
          .html(this.tooltipHTMLForDate(d))
          .style('left', () => Math.floor(i / 7) * this.options.SQUARE_LENGTH + 'px')
          .style('top', () => {
            return this.formatWeekday(d.getDay())
              * (this.options.SQUARE_LENGTH + this.options.SQUARE_PADDING) + this.options.MONTH_LABEL_PADDING * 2 + 'px';
          });
      })
        .on('mouseout', (d, i) => {
          this.tooltip.remove();
        });
    }

    if (this.options.legendEnabled) {
      const colorRange = [this.color(0)];
      for (let i = 3; i > 0; i--) {
        colorRange.push(this.color(this.options.max / i));
      }

      const legendGroup = svg.append('g');
      legendGroup.selectAll('.calendar-heatmap-legend')
        .data(colorRange)
        .enter()
        .append('rect')
        .attr('class', 'calendar-heatmap-legend')
        .attr('width', this.options.SQUARE_LENGTH)
        .attr('height', this.options.SQUARE_LENGTH)
        .attr('x', (d, i) => (this.options.width - this.options.legendWidth) + (i + 1) * 13)
        .attr('y', this.options.height + this.options.SQUARE_PADDING)
        .attr('fill', (d) => d);

      legendGroup.append('text')
        .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-less')
        .attr('x', this.options.width - this.options.legendWidth - 13)
        .attr('y', this.options.height + this.options.SQUARE_LENGTH)
        .text(this.options.locale.less);

      legendGroup.append('text')
        .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-more')
        .attr('x', (this.options.width - this.options.legendWidth + this.options.SQUARE_PADDING) + (colorRange.length + 1) * 13)
        .attr('y', this.options.height + this.options.SQUARE_LENGTH)
        .text(this.options.locale.more);
    }

    this.dayRects.exit().remove();
    const monthLabels = svg.selectAll('.month')
      .data(this.monthRange)
      .enter().append('text')
      .attr('class', 'month-name')
      .text((d) => this.options.locale.months[d.getMonth()])
      .attr('x', (d, i) => {
        let matchIndex = 0;
        me.dateRange.find((element, index) => {
          matchIndex = index;
          return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
        });

        return Math.floor(matchIndex / 7) * (me.options.SQUARE_LENGTH + me.options.SQUARE_PADDING);
      })
      .attr('y', 0);  // fix these to the top

    this.options.locale.days.forEach((day, index) => {
      index = this.formatWeekday(index);
      if (index % 2) {
        svg.append('text')
          .attr('class', 'day-initial')
          .attr('transform', 'translate(-8,' + (this.options.SQUARE_LENGTH + this.options.SQUARE_PADDING) * (index + 1) + ')')
          .style('text-anchor', 'middle')
          .attr('dy', '2')
          .text(day);
      }
    });
  }

  protected countForDate(d: Date) {
    const key = moment(d).format('YYYY-MM-DD');
    return this.options.counterMap[key] || 0;
  }

  protected formatWeekday(weekDay) {
    if (this.options.weekStart === 1) {
      if (weekDay === 0) {
        return 6;
      } else {
        return weekDay - 1;
      }
    }
    return weekDay;
  }

  protected pluralizedTooltipUnit(count) {
    if ('string' === typeof this.options.tooltipUnit) {
      return (this.options.tooltipUnit + (count === 1 ? '' : 's'));
    }

    // tslint:disable-next-line:forin
    for (const i in this.options.tooltipUnit) {
      const _rule = this.options.tooltipUnit[i];
      let _min = _rule.min;
      let _max = _rule.max || _rule.min;
      _max = _max === 'Infinity' ? Infinity : _max;

      if (count >= _min && count <= _max) {
        return _rule.unit;
      }
    }
  }

  protected tooltipHTMLForDate(d: Date) {
    const dateStr = moment(d).format('ddd, MMM Do YYYY');
    const count = this.countForDate(d);
    return '<span><strong>'
      + (count ? count : this.options.locale.no)
      + ' ' + this.pluralizedTooltipUnit(count)
      + '</strong> ' + this.options.locale.on + ' ' + dateStr
      + '</span>';
  }
}
