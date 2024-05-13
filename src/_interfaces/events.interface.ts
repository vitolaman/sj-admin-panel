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
