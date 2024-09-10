export interface GetCompanyParams {
  page: number;
  limit: number;
  search?: string;
}

export interface GetCompanyRes {
  data: CompanyI[];
  metadata: Metadata;
}

export interface CompanyI {
  id: string;
  name: string;
  logo: string;
  api_key: string;
  secret_key: string;
  payment: boolean;
  withdrawal: boolean;
  color_palette: ColorPalette;
  share?: number;
  share_percentage?: number;
  plan: string;
  plan_expiry_date: string;
  plan_sandbox_expiry_date: string;
  is_production_eligible: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  play: string;
}

export interface Metadata {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}

export interface UpdateCompanyForm {
  payment: boolean;
  withdrawal: boolean;
  share?: number;
  share_percentage?: number;
  share_option?: string;
  plan_expiry_date: string;
  plan_sandbox_expiry_date?: string;
  is_production_eligible?: boolean;
  is_active: boolean;
}

export type UpdateCompanyPayload = Omit<UpdateCompanyForm, "share_option">;

export interface SummaryReport {
  income: number;
  transaction: number;
  participant: number;
  quiz: number;
  transactions_detail?: TransactionStatus;
}

export type SummaryReportByDate = Omit<SummaryReport, "transactions_detail">;

export interface GetSummaryReportByDateParams {
  id: string;
  start_date: string;
  end_date: string;
}

export interface TransactionStatus {
  success: number;
  pending: number;
  failed: number;
}

export interface GetTransactionHistoryParams {
  id: string;
  page: number;
  limit: number;
}

export interface GetTransactionHistoryRes {
  transactions: TransactionHistoryI[];
  metadata: TransactionHistoryMetaData;
}

export interface TransactionHistoryI {
  id: string;
  user_id: string;
  user_name: string;
  item_id: string;
  item_name: string;
  transaction_status: string;
  transaction_ref: string;
  amount: number;
  payment_method: string;
  merchant_id: string;
  payment_gateway: string;
  va_number: string;
  created_at: string;
}

export interface TransactionHistoryMetaData {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface PeriodDateParams {
  id: string;
  frame: string;
}

export interface PeriodDataResult {
  data: Record<string, number | null>;
  total: number;
}
