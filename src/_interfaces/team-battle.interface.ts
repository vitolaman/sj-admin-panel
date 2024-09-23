import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query";

export interface GetTeamBattleQuery {
  page: number;
  limit: number;
  category: string;
  type: string;
}
interface Sponsors {
  name: string;
  logo: string | FileList;
}

interface Prize {
  amount: number;
  description: string;
}

interface Tnc {
  id: string;
  en: string;
}

interface Groups {
  id: string;
  name: string;
  type: string;
  logo: string | FileList;
  province_id?: string;
}

interface ExtraDisplay {
  participant?: number | string;
  periode?: string;
  stage?: string;
  sponsor?: string;
  university?: Omit<Groups, "id">[];
  community?: Omit<Groups, "id">[];
}

export interface TeamBattleI {
  id: string;
  title: string;
  category: string[];
  min_participant: number;
  semifinal_participant: number;
  final_participant: number;
  sponsors: Sponsors[];
  registration_start: string;
  registration_end: string;
  elimination_start: string;
  elimination_end: string;
  semifinal_start: string;
  semifinal_end: string;
  final_start: string;
  final_end: string;
  banner: string | FileList;
  prize: Prize[];
  tnc: Tnc;
  status: string;
  initial_balance: number;
  groups: Groups[];
  max_participant: number;
  joined_participant: number;
}

export interface TeamBattleId extends Omit<TeamBattleI, "max_participant"> {
  public_max_participant: number;
  community_max_participant: number;
  university_max_participant: number;
  community_invitation_code: string;
  university_invitation_code: string;
}

export interface TeamBattleReq
  extends ExtraDisplay,
    Omit<TeamBattleI, "id" | "groups" | "max_participant" | "joined_participant">,
    Partial<Pick<TeamBattleI, "id">> {
  groups: Omit<Groups, "id">[];
  public_max_participant: number;
  community_max_participant: number;
  university_max_participant: number;
  province_max_participant: number;
  community_invitation_code: string;
  university_invitation_code: string;
  province_invitation_code: string;
  province_ids: string[];
  type: string;
}

export interface TeamBattleRes {
  data: TeamBattleI[];
  metadata: {
    current_page: number;
    limit: number;
    total_page: number;
    total: number;
  };
}

export interface TeamBattleModal {
  data: TeamBattleId;
  requestId: string;
  loading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      GetTeamBattleQuery,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      TeamBattleRes,
      "api"
    >
  >;
}

export interface RegionListI {
  id: string;
  name: string;
  logo: string | FileList;
}

export interface RegionListReq extends Omit<RegionListI, "id"> {
  id?: string;
}

export interface GetRegionListQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface RegionListRes {
  data: RegionListI[];
  metadata: {
    current_page: number;
    limit: number;
    total_page: number;
    total: number;
  };
}
