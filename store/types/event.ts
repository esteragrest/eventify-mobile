export interface EventItem {
  id: number;
  title: string;
  organizerFirstName: string;
  organizerLastName?: string;
  eventDate: string;
  description: string;
  photo: any;
}

export interface EventsResponse {
  events: EventItem[];
  lastPage: number;
}
