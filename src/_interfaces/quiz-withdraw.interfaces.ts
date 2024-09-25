export interface QuizWithdrawReqI {
  page: number;
  limit: number;
  search: string;
  status: string;
  quiz_id?: string;
}

export interface QuizWithdrawResI {
  data: QuizWithdrawListI[];
  meta: MetaI;
}

export interface QuizWithdrawListI {
  id: string;
  rank: number;
  user_id: string;
  user_name: string;
  user_seeds_tag: string;
  quiz_id: string;
  quiz_name: string;
  quiz_score: number;
  description: string;
  amount: number;
  fee_amount: number;
  method: string;
  account_name: string;
  account_number: string;
  status: string;
  created_at: string;
}

export interface MetaI {
  page: number;
  per_page: number;
  total: number;
}

export interface QuizWithdrawUpdateI {
  quiz_id: string;
  user_id: string;
  status: "SUCCESS" | "REJECT";
  reject_reason: string;
}
