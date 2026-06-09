export interface GetEventsParams {
  page: number;
  limit: number;
  title?: string;
  dateFrom?: string;
  dateTo?: string;
  payment?: string;
  address?: string;
}

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

export interface CommentItem {
  id: number;
  commentatorId: number;
  commentatorFirstName: string;
  commentatorLastName?: string;
  commentatorPhoto: string | null;
  eventId: number;
  parentId: number | null;
  content: string;
  createdAt: string;
}

type EventType = "open" | "closed";
type PaymentType = "free" | "paid";

export interface Event {
  id: number;
  title: string;
  organizerId: number;
  organizerFirstName: string;
  organizerLastName?: string;
  eventDate: string;
  eventTime: string;
  description: string;
  type: EventType;
  payment: PaymentType;
  address: string;
  ageLimit: string;
  maxParticipants: number | null;
  photo: string | null;
}

export interface EventByIdResponse {
  event: Event;
  comments: CommentItem[];
}

export type DeleteEventResponse = { message: string } | void;

