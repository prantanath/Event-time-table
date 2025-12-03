import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DayTab, EventItem, Venue} from './timetable';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-time-table-page',
  imports: [MatIconModule, MatButtonModule, MatTabsModule, MatTooltipModule, NgClass],
  templateUrl: './time-table-page.html',
  styleUrl: './time-table-page.css',
  standalone: true
})
export class TimeTablePage implements OnInit {
  days: DayTab[] = [
    {label: 'Monday', date: '2025-12-01'},
    {label: 'Tuesday', date: '2025-12-02'},
    {label: 'Wednesday', date: '2025-12-03'},
    {label: 'Thursday', date: '2025-12-04'},
    {label: 'Friday', date: '2025-12-05'},
    {label: 'Saturday', date: '2025-12-06'},
    {label: 'Sunday', date: '2025-12-07'},
    {label: 'Monday', date: '2025-12-08'},
    {label: 'Tuesday', date: '2025-12-09'},
    {label: 'Wednesday', date: '2025-12-10'},
    {label: 'Thursday', date: '2025-12-11'},
    {label: 'Friday', date: '2025-12-12'},
    {label: 'Saturday', date: '2025-12-13'},
    {label: 'Sunday', date: '2025-12-14'},
  ];

  venues: Venue[] = [
    {id: 'v1', name: 'Venue 1'},
    {id: 'v2', name: 'Venue 2'},
    {id: 'v3', name: 'Venue 3'},
    {id: 'v4', name: 'Venue 4'},
    {id: 'v5', name: 'Venue 5'},
    {id: 'v6', name: 'Venue 6'},
    {id: 'v7', name: 'Venue 7'},
    {id: 'v8', name: 'Venue 8'},
  ];

  timeSlots: string[] = [];

  events: EventItem[] = [];
  selectedDayIndex = 0;
  venueWidth = 300;
  contentScrollLeft = 0;

  // height for a 15-minute slot (px); card height depends on duration
  readonly slotHeight = 20;

  constructor() {
  }

  ngOnInit(): void {
    this.buildTimeSlots();
    // demo data
    if (this.events.length === 0) {
      this.seedDemoEvents();
    }
  }

  private buildTimeSlots(): void {
    let h = 9;
    let m = 0;
    while (h < 18 || (h === 18 && m === 0)) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      this.timeSlots.push(`${hh}:${mm}`);
      m += 15;
      if (m === 60) {
        m = 0;
        h++;
      }
    }
  }

  private seedDemoEvents() {
    this.events = [
      {
        id: 'e3',
        title: 'Event 3',
        day: this.days[0].date,
        venueId: ['v1', 'v2'],
        start: '14:00',
        end: '15:30',
      },
      {
        id: 'e2',
        title: 'Event 2',
        day: this.days[0].date,
        venueId: ['v2'],
        start: '10:00',
        end: '10:30',
      },
      {
        id: 'e1',
        title: 'Event 1',
        day: this.days[0].date,
        venueId: ['v3'],
        start: '09:00',
        end: '11:00',
      }, {
        id: 'e4',
        title: 'Event 4',
        day: this.days[1].date,
        venueId: ['v4'],
        start: '10:00',
        end: '11:00',
      },
    ];
  }

  get eventsForSelectedDay(): EventItem[] {
    const date = this.days[this.selectedDayIndex].date;
    return this.events.filter(e => e.day === date);
  }

  getEventTopPx(ev: EventItem): number {
    const minutesFromStart =
      this.timeToMinutes(ev.start) - this.timeToMinutes(this.timeSlots[0]);
    return (minutesFromStart / 15) * this.slotHeight;
  }

  getEventHeightPx(ev: EventItem): number {
    const durationMinutes =
      this.timeToMinutes(ev.end) - this.timeToMinutes(ev.start);
    return (durationMinutes / 15) * this.slotHeight + this.slotHeight;
  }

  getLeftPercent(ev: EventItem): number {
    const venues = Array.isArray(ev.venueId) ? ev.venueId : [ev.venueId];
    if (venues.length === 0) return this.venueWidth;


    const sortedVenueIds = [...ev.venueId].sort((a, b) =>
      this.venues.findIndex(v => v.id === a) -
      this.venues.findIndex(v => v.id === b)
    );

    const startIndex = this.venues.findIndex(v => v.id === sortedVenueIds[0]);

    return startIndex * this.venueWidth;
  }

  getEventWidthPx(ev: EventItem): number {
    const venues = Array.isArray(ev.venueId) ? ev.venueId : [ev.venueId];
    if (venues.length === 0) return this.venueWidth;
    return ev.venueId.length * this.venueWidth;
  }

  private timeToMinutes(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  onContentScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.contentScrollLeft = target.scrollLeft;
  }

}
