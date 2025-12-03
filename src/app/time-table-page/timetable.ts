export interface Venue {
  id: string;
  name: string;
}

export interface DayTab {
  date: string;
  label: string;
}

export interface EventItem {
  id: string;
  title: string;
  day: string;
  venueId: string[];
  start: string;
  end: string;
}
