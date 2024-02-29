export interface PlayRes {
  playList: PlayList[];
  metadata: Metadata;
}

export interface PlayList {
  id: string;
  play_id: string;
  name: string;
  category: string;
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
  created_by_user_id: string;
  created_by_admin_id: string;
  status: string;
  tnc: string;
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
  is_need_invitation_code: boolean;
  raw_asset_sub_type?: string;
  payment_method?: string[];
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
