import { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  FetchArgs,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { BaseSyntheticEvent } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CircleReq } from "./circle.interface";
import { PlayReq } from "./play.interfaces";
import { GetQuizQuery } from "./quiz.interfaces";
import { GetArticleQuery } from "./article.interfaces";

export interface CategoryModalPromoCodeI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  loadingUpsert: boolean;
  promoCodeData?: PromoCodeI;
  setValue: UseFormSetValue<PromoCodeFormDataI>;
  handleCreate: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  handleUpdate: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  handleResetFilter: () => void;
  handleResetForm: () => void;
  selectAll: string[];
  setSelectAll: React.Dispatch<React.SetStateAction<string[]>>;
  checkedFeature: {
    id: string;
    name: string;
    type: string;
  }[];
  setCheckedFeature: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
        type: string;
      }[]
    >
  >;
  typeCategoryPromo: string[];
  filterCircle: CircleReq;
  setFilterCircle: React.Dispatch<React.SetStateAction<CircleReq>>;
  filterPlay: PlayReq;
  setFilterPlay: React.Dispatch<React.SetStateAction<PlayReq>>;
  filterQuiz: GetQuizQuery;
  setFilterQuiz: React.Dispatch<React.SetStateAction<GetQuizQuery>>;
  filterArticle: GetArticleQuery;
  setFilterArticle: React.Dispatch<React.SetStateAction<GetArticleQuery>>;
  watch: UseFormWatch<PromoCodeFormDataI>;
}

export interface PromoCodeModalFormI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  promoCodeData?: PromoCodeI;
  setPromoCodeData: React.Dispatch<
    React.SetStateAction<PromoCodeI | undefined>
  >;
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

export interface PromoCodeRadioInputData {
  label: string;
  value: string;
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
}

export interface PromoCodeFilter {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setParams: React.Dispatch<React.SetStateAction<GetPromoCodeQuery>>;
  defaultValue: GetPromoCodeQuery;
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
  tnc: string;
  max_redeem: number;
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
  start_date_from: string;
  start_date_until: string;
}

export interface PromoCodeFormDataI {
  id?: string;
  name_promo_code?: string;
  promo_code?: string;
  start_date: string;
  end_date: string | null;
  expired_date: string | null;
  discount_amount?: number;
  discount_percentage?: number;
  min_transaction: number;
  max_discount?: number;
  initial_quantity?: number;
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
  tnc: string;
  max_redeem: number;
  is_active: boolean;
}
