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
  status: "displayed" | "hidden";
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
  status: "displayed" | "hidden";
  promo_start_date?: string;
  promo_end_date?: string;
  max_promo_usage_per_month: number;
}

export interface PaymentChannelRes {
  total: number;
  recommendation: Recommendation[];
  type_va: TypeVa[];
  type_cc: TypeCc[];
  type_ewallet: TypeEwallet[];
  type_qris: TypeQri[];
}

export interface Recommendation {
  id: string;
  payment_gateway: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  service_fee: number;
  promo_price: number;
  is_active: boolean;
  is_promo_available: boolean;
  is_priority: boolean;
}

export interface TypeVa {
  id: string;
  payment_gateway: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  service_fee: number;
  promo_price: number;
  is_active: boolean;
  is_promo_available: boolean;
  is_priority: boolean;
}

export interface TypeEwallet {
  id: string;
  payment_gateway: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  service_fee: number;
  promo_price: number;
  is_active: boolean;
  is_promo_available: boolean;
  is_priority: boolean;
}

export interface TypeQri {
  id: string;
  payment_gateway: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  service_fee: number;
  promo_price: number;
  is_active: boolean;
  is_promo_available: boolean;
  is_priority: boolean;
}

export interface TypeCc {
  id: string;
  payment_gateway: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  service_fee: number;
  promo_price: number;
  is_active: boolean;
  is_promo_available: boolean;
  is_priority: boolean;
}

export interface PaymentChannelOpt {
  label: string | JSX.Element;
  options: OptChild[];
}

export interface OptChild {
  label: string | JSX.Element;
  value: string;
}
