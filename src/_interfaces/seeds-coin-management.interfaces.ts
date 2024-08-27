import {
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

export interface GetSeedsCoinQuery {
  page: number;
  limit: number;
  search: string;
}

export interface SeedsCoinManagementI {
  id: string;
  coins: number;
  name: string;
  started_at: string;
  expired_at: string;
  started_period: string;
  expired_period: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SeedsCoinManagementReq {
  id: string;
  name: string;
  coin_value: number;
  started_at: string;
  expired_at: string | null;
  is_active: boolean;
}

export interface SeedsCoinRes {
  configurations: SeedsCoinManagementI[];
  metadata: Metadata;
}

export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface SeedsCoinModal {
  data: SeedsCoinManagementI;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      GetSeedsCoinQuery,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      SeedsCoinRes,
      "api"
    >
  >;
}
