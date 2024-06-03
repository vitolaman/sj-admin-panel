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

export interface ChangeStatusBannerReq {
  is_active: boolean;
  id: string;
}

export interface MainBannerFormData {
  name: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  external_url: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ExclussiveBannerFormData {
  name: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  external_url: string;
  type: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  tnc: string;
}

export interface OpenAccountFromData {
  name: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  external_url: string;
  type: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBannerReq {
  name: string;
  image_url: string;
  external_url: string;
  is_active: string;
  type: string;
  title: string;
  description: string;
  tnc: string;
  created_at: string;
  updated_at: string;
}
