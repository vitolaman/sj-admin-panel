export interface PlayWithdrawRes {
  data: WithDrawListI[];
  meta: Meta;
}

export interface WithDrawListI {
  id: string;
  rank: number;
  user_id: string;
  user_name: string;
  play_id: string;
  play_name: string;
  gnl_percentage: number;
  amount: number;
  method: string;
  account_name: string;
  account_number: string;
  status: string;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
}

export interface PlayWithdrawReq {
  limit: number;
  page: number;
}

export interface WithdrawUpdateI {
  play_id: string;
  user_id: string;
  status: "SUCCESS" | "REJECT";
  reject_reason: string;
}
