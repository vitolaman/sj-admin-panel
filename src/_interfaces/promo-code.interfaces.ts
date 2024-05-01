import { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  FetchArgs,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query";

export interface PromoCodeModalFormI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  setPromoCodeId: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      GetPromoCodeQuery,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      PromoCodeRes,
      "api"
    >
  >;
}

export interface PromoCodeCustomInputI {
  label: string;
  registerName:
    | "name_promo_code"
    | "promo_code"
    | "start_date"
    | "end_date"
    | "expired_date"
    | "discount_amount"
    | "discount_percentage"
    | "min_transaction"
    | "max_discount"
    | "quantity"
    | "type"
    | "institution"
    | "segment_user"
    | "ref_code"
    | "feature_ids"
    | "discount_type"
    | "description"
    | "category"
    | "min_exp";
  type?: string;
  maxLength?: number;
  placeholder?: string;
  extraElement?: React.ReactNode;
}

export interface PromoCodeRadioInputData {
  label: string;
  value: string;
}

export interface PromoCodeRadioI {
  label: string;
  registerName:
    | "name_promo_code"
    | "promo_code"
    | "start_date"
    | "end_date"
    | "expired_date"
    | "discount_amount"
    | "discount_percentage"
    | "min_transaction"
    | "max_discount"
    | "quantity"
    | "type"
    | "institution"
    | "segment_user"
    | "ref_code"
    | "feature_ids"
    | "discount_type"
    | "description"
    | "category"
    | "min_exp";
  name: string;
  disabled?: boolean;
  data: PromoCodeRadioInputData[];
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}

export interface PromoCodeTabData {
  id: string;
  name: string;
  type: string;
}
export interface PromoCodeTabI {
  data: PromoCodeTabData[] | undefined;
  onSubmit: (formData: { text: string }) => void;
  onClick: () => void;
  onClickSelectAll: () => void;
  label: string;
  isLoading: boolean;
  extraElement?: React.ReactNode;
  typePromoCategory: string;
  openTab: string;
  selectAll: string[];
  checkedFeature: checkedFeatureI[];
  setCheckedFeature: React.Dispatch<React.SetStateAction<checkedFeatureI[]>>;
  setSelectIdType: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface checkedFeatureI {
  id: string;
  name: string;
  type: string;
}

export interface FeatureIdI {
  index: number;
  indexId: number;
  id: string;
  name: string;
  type: string;
  logic: string;
  checkedFeature: checkedFeatureI[];
  setCheckedFeature: React.Dispatch<React.SetStateAction<checkedFeatureI[]>>;
  setSelectIdType: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface PromoCodeFilter {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
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
  discount_amount: number;
  min_transaction: number;
  max_discount: number;
  initial_quantity: number;
  quantity?: number;
  type: string;
  raw_type: [];
  is_active: boolean;
  institution: string;
  segment_user: string;
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
  name_promo_code?: string;
  promo_code?: string;
  start_date: string;
  end_date: string;
  expired_date: string;
  discount_amount?: number;
  discount_percentage?: number;
  min_transaction: number;
  max_discount?: number;
  quantity?: number;
  type: string;
  institution: string;
  segment_user?: string;
  ref_code: string;
  feature_ids: string[];
  discount_type?: string;
  description: string;
  category: string;
  min_exp: number;
}
