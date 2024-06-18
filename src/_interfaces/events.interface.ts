export interface GetEventsQuery {
  page: number;
  limit: number;
  search: string;
}

export interface EventsI {
  created_at: string;
  description: string;
  event_date: string;
  external_url: string;
  id: string;
  image_url: string;
  is_liked: boolean;
  likes: number;
  name: string;
  updated_at: string;
}

export interface EventDetailI {
  id: string;
  user_id: string;
  name: string;
  seeds_tag: string;
  event_id: string;
  ticket_code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EventsFormDataI {
  id?: string;
  name: string;
  image_url: FileList | string;
  external_url: string;
  description: string;
  event_date: string;
}

export interface TicketFormDataI{
  ticket_code:string
}

export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface EventsRes {
  data: EventsI[];
  metadata: Metadata;
}

export interface EventDetailRes {
  data: EventDetailI[];
  metadata: Metadata;
}
