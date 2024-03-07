export interface AdminFeeFilterI {
  category: string;
  priority: string;
  status: string;
  search: string;
}

export interface AdminFeeI {
  id: string;
  payment_gateway: string;
  payment_method: string;
  is_active: boolean;
  is_promo_active: boolean;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  service_fee: number;
  status: 'displayed' | 'hidden';
  priority: boolean;
  promo_price: number;
  promo_start_date: string;
  promo_end_date: string;
  max_promo_usage_per_month: number;
  used: number;
  multicurrency_admin_fee?: MulticurrencyAdminFeeI[];
  created_at: string;
  updated_at: string;
}

export interface MulticurrencyAdminFeeI {
  currency: string;
  admin_fee: number;
}

export interface AdminFeePayloadI {
  id: string;
  admin_fee: number;
  promo_price: number;
  service_fee: number;
  is_priority: boolean;
  is_promo_active: boolean;
  status: string;
  promo_start_date?: string;
  promo_end_date?: string;
  max_promo_usage_per_month: number;
}

export interface FormAdminFeeI {
  admin_fee: number;
  promo_price: number;
  service_fee: number;
  is_priority: boolean;
  is_active: boolean;
  status: 'displayed' | 'hidden';
  promo_start_date?: string;
  promo_end_date?: string;
  max_promo_usage_per_month: number;
}
