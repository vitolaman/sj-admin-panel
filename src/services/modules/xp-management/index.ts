import { GetXPManagementQuery, XPManagementI, XPManagementRes } from "_interfaces/xp-management.interface";
import { Api } from "services/api";
  
  export const xpManagementApi = Api.injectEndpoints({
    endpoints: (build) => ({
      getXPManagement: build.query<XPManagementRes,GetXPManagementQuery>({
        query: (params) => ({
          url: `/admin-portal/v1/gain-exp/list`,
          params,
        }),
        keepUnusedDataFor: 0,
      }),
      getXPManagementById: build.query<XPManagementI, string>({
        query: (id) => `/admin-portal/v1/gain-exp/${id}`,
        keepUnusedDataFor: 0,
      }),
      updateXPManagement: build.mutation<void,XPManagementI >({
        query(body) {
          return {
            url: `/admin-portal/v1/gain-exp/${body.task_code}`,
            method: "PUT",
            body,
          };
        },
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useGetXPManagementQuery,useLazyGetXPManagementByIdQuery, useUpdateXPManagementMutation } = xpManagementApi;
  