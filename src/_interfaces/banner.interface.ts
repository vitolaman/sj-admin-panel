export interface MainBannerRes {
  data: BannerList[];
  metadata: Metadata;
}

export interface BannerList {
  id: string;
  name: string;
  external_url: string;
  image_url: string;
  type: string;
  title: string;
  description: string;
  tnc: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface MainBannerReq {
  search: string;
  status: string;
  type: string;
  limit: number;
  page: number;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}
