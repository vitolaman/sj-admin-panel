export interface TokenReportRes {
  data: TokenReportData[];
  metadata: CircleMetadata;
}

export interface TokenReportData {
  id: string;
  name: string;
  owner: {
    name: string;
    seeds_tag: string;
  };
  raised_by: {
    name: string;
    seeds_tag: string;
  };
  ticket: string;
  status: string;
  created_at: string;
}

export interface CircleMetadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface TokenReportReq {
  search: string;
  limit: number;
  page: number;
  sort_by: string;
  order: string;
  ticket: string;
  circle_owner_id: string;
  created_at_from: string;
  created_at_to: string;
  status: string[];
}

export interface CircleRes {
  data: CircleList[];
  metadata: CircleMetadata;
}

export interface CircleReq {
  search: string;
  limit: number;
  page: number;
  sort_by: string;
  order: string;
  type: string;
  total_member_from: string;
  total_member_to: string;
  total_post_from: string;
  total_post_to: string;
  total_like_from: string;
  total_like_to: string;
  total_share_from: string;
  total_share_to: string;
  created_at_from: string;
  created_at_to: string;
}

export interface CircleList {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  description: string;
  description_rules: string;
  type: string;
  premium_fee: number;
  admin_fee: number;
  monthly_time: number;
  total_rating: number;
  total_member: number;
  total_post: number;
  created_at: string;
  updated_at: string;
  like: string;
  share: string;
}

export interface CircleOwnerRes {
  data: CircleOwner[];
  metadata: CircleMetadata;
}

export interface CircleOwner {
  id: string;
  name: string;
  seeds_tag: string;
}
