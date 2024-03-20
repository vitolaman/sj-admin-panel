export interface GetCircleCategoriesRes {
  data: CircleCategory[];
  metadata: Metadata;
}

export interface CircleCategory {
  id: number;
  category: string;
}

export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface GetCircleTagRes {
  data: CircleTagI[];
  meta: Meta;
}

export interface CircleTagI {
  id: string;
  name: string;
  avatar: string;
  hashtags: string[];
  members: number;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
}
