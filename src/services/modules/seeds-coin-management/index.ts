import {
  GetSeedsCoinQuery,
  SeedsCoinManagementI,
  SeedsCoinManagementReq,
  SeedsCoinRes,
} from "_interfaces/seeds-coin-management.interfaces";
import { Api } from "services/api";

export const seedsCoinManagementApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getSeedsCoin: build.query<SeedsCoinRes, GetSeedsCoinQuery>({
      query: (params) => ({
        url: `/admin-portal/v1/coin-configs`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getSeedsCoinById: build.query<SeedsCoinManagementI, string>({
      query: (id) => ({
        url: `/admin-portal/v1/coin-config/${id}`,
      }),
      keepUnusedDataFor: 0,
    }),
    updateSeedsCoinManagement: build.mutation<void,SeedsCoinManagementReq>({
        query(body) {
          return {
            url: `/admin-portal/v1/coin-config/${body.id}`,
            method: "PUT",
            body,
          };
        },
      }),
  }),
  overrideExisting: false,
});

export const { useGetSeedsCoinQuery, useLazyGetSeedsCoinByIdQuery, useUpdateSeedsCoinManagementMutation } = seedsCoinManagementApi;
