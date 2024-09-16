import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query";

export interface GetXPManagementQuery {
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

export interface XPManagementI {
  task_code: string;
  name: string;
  description: string;
  exp_gained: number;
  exp_required: number;
  max_exp: number;
  is_daily_task: boolean | string;
  is_treasure: boolean;
  is_active: boolean | string;
  started_at: string;
  expired_at: string;
}

export interface XPManagementRes {
  data: XPManagementI[];
  metadata: Metadata;
}

export interface XPManagementModal {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      GetXPManagementQuery,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      XPManagementRes,
      "api"
    >
  >;
}
