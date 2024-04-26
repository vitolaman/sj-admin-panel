import {
  GetReferralCodeQuery,
  ReferralCodeRes,
} from "_interfaces/referral-code.interface";
import { Api } from "services/api";

export const promoCodeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getReferralCodes: build.query<ReferralCodeRes, GetReferralCodeQuery>({
      query: (params) => ({
        url: `/referral-affiliates/v1/`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const { useGetReferralCodesQuery } = promoCodeApi;
