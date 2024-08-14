import {
  GetTeamBattleQuery,
  TeamBattleReq,
  TeamBattleRes,
  TeamBattleI,
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
    getTeamBattleById: build.query<TeamBattleI, string>({
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
  }),
  overrideExisting: false,
});

export const {
  useGetTeamBattlesQuery,
  useGetTeamBattleByIdQuery,
  useLazyGetTeamBattleByIdQuery,
  useUpdateTeamBattleMutation,
  useCreateTeamBattleMutation,
  useDeleteTeamBattleMutation,
} = teamBattleApi;
