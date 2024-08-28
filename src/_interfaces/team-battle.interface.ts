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
}

interface ExtraDisplay {
  participant?: number;
  periode?: string;
  stage?: string;
  sponsor?: string;
  university?: Omit<Groups, "id">[];
  community?: Omit<Groups, "id">[];
}

export interface TeamBattleI extends ExtraDisplay {
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
  groups: Groups[];
  initial_balance: number;
  max_participant: number;
  joined_participant: number;
}

export interface TeamBattleReq
  extends Omit<TeamBattleI, "id" | "groups">,
    Partial<Pick<TeamBattleI, "id">> {
  groups: Omit<Groups, "id">[];
  public_max_participant: number;
  community_max_participant: number;
  university_max_participant: number;
  community_invitation_code: string;
  university_invitation_code: string;
}

export interface TeamBattleRes {
  data: TeamBattleI[];
  metadata: {
    currentPage: number;
    limit: number;
    totalPage: number;
    totalRow: number;
  };
}

export interface TeamBattleModal {
  data: TeamBattleI;
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
