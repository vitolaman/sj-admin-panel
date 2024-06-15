export interface GetEventsQuery {
  page: number;
  limit: number;
  search: string;
}

export interface EventsI {
  currency?: string;
  created_at: string;
  description: string;
  ended_at?: string;
  event_date: string;
  event_price: number;
  event_status: string;
  external_url: string;
  id: string;
  image_url: string;
  is_liked: boolean;
  likes: number;
  location_name: string;
  name: string;
  updated_at: string;
}

export interface EventsFormDataI {
  id?:string
  currency?: string;
  name: string;
  image_url: FileList | string;
  external_url: string;
  description: string;
  event_date: string;
  event_price?: number;
  location_name: string;
  event_status: string;
  ended_at?: string;
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
