import { GetXPManagementQuery, XPManagementRes } from "_interfaces/xp-management.interface";
import { Api } from "services/api";
  
  export const withdrawalApi = Api.injectEndpoints({
    endpoints: (build) => ({
      getXPManagement: build.query<XPManagementRes,GetXPManagementQuery>({
        query: (params) => ({
          url: `/admin-portal/v1/gain-exp/list`,
          params,
        }),
        keepUnusedDataFor: 0,
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useGetXPManagementQuery } = withdrawalApi;
  