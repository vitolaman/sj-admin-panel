import { GroupBase } from "react-select";
import { OptChild } from "./admin-fee.interfaces";

export interface PlayRes {
  playList: PlayI[];
  metadata: Metadata;
}

export interface PlayI {
  id: string;
  play_id: string;
  name: string;
  category: string | string[];
  all_category: string[];
  type: string;
  publish_time: string;
  open_registration_time: string;
  play_time: string;
  end_time: string;
  min_participant: number;
  max_participant: number;
  currency: string;
  opening_balance: number;
  admission_fee: number;
  fee_percentage: number;
  winners?: string[];
  gain_percentage: number;
  prize_fix_amount: number;
  prize_fix_percentages: number[];
  prize_pool_amount: number;
  prize_pool_percentages: number[];
  participants?: Participant[];
  is_joined: boolean;
  created_by: string;
  created_by_admin_id: string;
  status: string;
  tnc: {
    id: string;
    en: string;
  };
  banner: string;
  rank: number;
  created_at: string;
  updated_at: string;
  updated_by: string;
  sponsorship: Sponsorship;
  community: Community;
  featured_link: string;
  reward_url: string;
  promo_id: string;
  invitation_code: string;
  is_need_invitation_code: boolean;
  raw_asset_sub_type?: string[];
  payment_method: string[] | GroupBase<OptChild>[];
  is_free_voucher_claimed: boolean;
}

export interface Participant {
  photo_url: string;
  id: string;
  verified: boolean;
  label: string;
  name: string;
  seeds_tag: string;
  total_play: number;
  total_win: number;
  total_lose: number;
  win_rate: number;
}

export interface Sponsorship {
  name: string;
  image_url: string;
}

export interface Community {
  name: string;
  image_url: string;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}

export interface PlayReq {
  search: string;
  status: string;
  type: string;
  limit: number;
  page: number;
}

export interface EditArenaPayloadI {
  name?: string;
  category?: string[];
  asset_sub_type?: string[];
  type?: string;
  publish_time?: string;
  open_registration_time?: string;
  play_time?: string;
  end_time?: string;
  min_participant?: number;
  max_participant?: number;
  currency?: string;
  banner?: string;
  community?: {
    name?: string;
    image_url?: string;
  };
  sponsorship?: {
    name?: string;
    image_url?: string;
  };
  gain_percentage?: number;
  opening_balance?: number;
  admission_fee?: number;
  fee_percentage?: number;
  prize_fix_amount?: number;
  prize_fix_percentages?: number[];
  prize_pool_percentages?: number[];
  tnc?: { id?: string; en?: string };
  reward_url?: string;
  featured_link?: string;
  promo_id?: string;
  invitation_code?: string;
  payment_method: string[];
}

export interface CreatePlayPayload {
  name?: string;
  category?: string[];
  asset_sub_type?: string[];
  type?: string;
  publish_time?: string;
  open_registration_time?: string;
  play_time?: string;
  end_time?: string;
  min_participant?: number;
  max_participant?: number;
  currency?: string;
  banner?: string;
  community: {
    name?: string;
    image_url?: string;
  };
  sponsorship: {
    name?: string;
    image_url?: string;
  };
  gain_percentage?: number;
  opening_balance?: number;
  admission_fee?: number;
  fee_percentage?: number;
  prize_fix_amount?: number;
  prize_fix_percentages?: number[];
  prize_pool_percentages?: number[];
  tnc?: { id?: string; en?: string };
  reward_url?: string;
  featured_link?: string;
  promo_id?: string;
  invitation_code?: string;
  payment_method: string[];
}

export interface CreatePlayFormI {
  name: string;
  category: string[];
  asset_sub_type: string[];
  type: string;
  publish_time: string;
  open_registration_time: string;
  play_time: string;
  end_time: string;
  min_participant: number;
  max_participant: number;
  currency: string;
  banner: FileList;
  community: {
    name: string;
    image_url: FileList;
  };
  sponsorship: {
    name: string;
    image_url: FileList;
  };
  gain_percentage: number;
  opening_balance: number;
  admission_fee: number;
  fee_percentage: number;
  prize_fix_amount: number;
  prize_fix_percentages: number[];
  prize_pool_percentages: number[];
  tnc: { id: string; en: string };
  reward_url: string;
  featured_link: string;
  promo_id: string;
  invitation_code: string;
  payment_method: GroupBase<OptChild>[];
}

export interface PromoCodeRes {
  data: Daum[];
  metadata: MetadataPromoCode;
}

export interface Daum {
  id: string;
  name_promo_code: string;
  promo_code: string;
  start_date: string;
  end_date: string;
  expired_date: string;
  discount_percentage: number;
  initial_quantity: number;
  quantity?: number;
  is_active: boolean;
  institution: string;
  ref_code: string;
  feature_ids: string[];
  discount_type: string;
  description: string;
  category: string;
  min_exp: number;
}

export interface MetadataPromoCode {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}
