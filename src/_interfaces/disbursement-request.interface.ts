export interface GetDisbursementRequestQuery {
  page: number;
  limit: number;
  search: string;
}

export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}
export interface DisbursementRequestI {
  id: string;
  user_id: string;
  payment_method: string;
  account_name: string;
  account_number: string;
  status: string;
  description: string;
  nett_amount: number;
  fee: number;
  created_at: string;
  updated_at: string;
}

export interface DisbursementRequestRes {
  configurations: DisbursementRequestI[];
  metadata: Metadata;
}
