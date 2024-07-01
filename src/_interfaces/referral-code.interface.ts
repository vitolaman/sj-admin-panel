export interface ReferralCodeI {
  ref_code: string;
  phone_number: string;
  name: string;
  seeds_tag: string;
  notes: string;
  users: number;
}

export interface ReferralCodeFormDataI {
  ref_code: string;
  phone_number: string;
  name: string;
  seeds_tag: string;
  notes: string;
  users: number;
}
export interface Metadata {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}

export interface ReferralCodeRes {
  data: ReferralCodeI[];
  metadata: Metadata;
}

export interface GetReferralCodeQuery {
  search :string,
  minDate:string,
  maxDate:string,
  limit: number,
  page: number,
  }
