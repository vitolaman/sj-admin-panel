import {
  DisbursementRequestRes,
  GetDisbursementRequestQuery,
} from "_interfaces/disbursement-request.interface";
import { Api } from "services/api";

export const withdrawalApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getDisbursementRequest: build.query<DisbursementRequestRes,GetDisbursementRequestQuery>({
      query: (params) => ({
        url: `/admin-portal/v1/withdrawal/list`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    updateDisbursementRequest: build.mutation<void, { id:string, status:string }>({
        query({ id, status }) {
          return {
            url: `/admin-portal/v1/withdrawal/${id}`,
            method: "PATCH",
            body:{status},
          };
        },
      }),
  }),
  overrideExisting: false,
});

export const { useGetDisbursementRequestQuery, useLazyGetDisbursementRequestQuery, useUpdateDisbursementRequestMutation } = withdrawalApi;
