export interface PromoCodeRes {
  data: PromoCodeI[];
  metadata: Metadata;
}

export interface PromoCodeI {
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

export interface Metadata {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}

export interface GetPromoCodeQuery {
  page: number;
  limit: number;
  search_promo_code: string;
}

export interface PromoCodeFormDataI {
  id?: string;
  promo_code?: string;
  name_promo_code?: string;
  start_date?: string;
  end_date?: string;
  expired_date?: string;
  discount_amount?: number;
  discount_percentage?: number;
  min_transaction?: number;
  max_discount?: number;
  quantity?: number;
  type?: string;
  institution?: string;
  segment_user?: string;
  ref_code?: string;
  feature_ids?: string[];
  spot: string[];
}
