import {
  GetTeamBattleQuery,
  TeamBattleReq,
  TeamBattleRes,
  TeamBattleId,
  GetRegionListQuery,
  RegionListRes,
  RegionListReq,
  RegionListI,
} from "_interfaces/team-battle.interface";
import { Api } from "services/api";

export const teamBattleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getTeamBattles: build.query<TeamBattleRes, GetTeamBattleQuery>({
      query: (params) => ({
        url: `/admin-portal/v1/battle`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getTeamBattleById: build.query<TeamBattleId, string>({
      query: (id) => `/admin-portal/v1/battle/${id}`,
      keepUnusedDataFor: 0,
    }),
    updateTeamBattle: build.mutation<void, TeamBattleReq>({
      query(body) {
        return {
          url: `/admin-portal/v1/battle/${body.id}/update`,
          method: "PATCH",
          body,
        };
      },
    }),
    createTeamBattle: build.mutation<void, TeamBattleReq>({
      query(body) {
        return {
          url: `/admin-portal/v1/battle/create`,
          method: "POST",
          body,
        };
      },
    }),
    deleteTeamBattle: build.mutation<void, string>({
      query(id) {
        return {
          url: `/admin-portal/v1/battle/${id}/delete`,
          method: "DELETE",
        };
      },
    }),
    getRegionList: build.query<RegionListRes, GetRegionListQuery>({
      query: (params) => ({
        url: `/admin-portal/v1/province`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getRegionById: build.query<RegionListI, string>({
      query: (id) => `/admin-portal/v1/province/${id}`,
      keepUnusedDataFor: 0,
    }),
    createRegion: build.mutation<void, RegionListReq>({
      query(body) {
        return {
          url: `/admin-portal/v1/province/create`,
          method: "POST",
          body,
        };
      },
    }),
    updateRegion: build.mutation<void, RegionListReq>({
      query(body) {
        return {
          url: `/admin-portal/v1/province/${body.id}/update`,
          method: "PATCH",
          body,
        };
      },
    }),
    deleteRegion: build.mutation<void, string>({
      query(id) {
        return {
          url: `/admin-portal/v1/province/${id}/delete`,
          method: "DELETE",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamBattlesQuery,
  useLazyGetTeamBattleByIdQuery,
  useUpdateTeamBattleMutation,
  useCreateTeamBattleMutation,
  useDeleteTeamBattleMutation,
  useLazyGetRegionListQuery,
  useLazyGetRegionByIdQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = teamBattleApi;
