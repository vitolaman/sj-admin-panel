export interface GetXPManagementQuery {
  page: number;
  limit: number;
  search:string
}

export interface Metadata {
    total: number;
    current_page: number;
    limit: number;
    total_page: number;
  }

export interface XPManagementI {
  task_code: string;
  name: string;
  description: string;
  exp_gained: number;
  exp_required: number;
  max_exp: number;
  is_daily_task: boolean;
  is_treasure: boolean;
  is_active: boolean;
  started_at: string;
  expired_at: string;
}

export interface XPManagementRes {
  data: XPManagementI[];
  metadata: Metadata;
}
