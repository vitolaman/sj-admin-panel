export interface GetCompanyParams {
  page: number;
  limit: number;
}

export interface GetCompanyResI {
  data: CompanyI[];
  metadata: Metadata;
}

export interface CompanyI {
  id: string;
  name: string;
  api_key: string;
  secret_key: string;
  plan: string;
  plan_expiry_date: string;
  plan_sandbox_expiry_date: string;
  is_production_eligible: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Metadata {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}

