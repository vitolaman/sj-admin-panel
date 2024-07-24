export interface GetCompanyParams {
  page: number;
  limit: number;
  search?: string;
}

export interface GetCompanyResI {
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
