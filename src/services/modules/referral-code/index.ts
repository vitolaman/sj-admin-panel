import {
  GetReferralCodeQuery,
  ReferralCodeFormDataI,
  ReferralCodeRes,
} from "_interfaces/referral-code.interface";
import { url } from "inspector";
import { Api } from "services/api";

export const referralCodeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getReferralCodes: build.query<ReferralCodeRes, GetReferralCodeQuery>({
      query: (params) => ({
        url: `/referral-affiliates/v1/`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    createReferralCode : build.mutation<void, ReferralCodeFormDataI>({
      query(body) {
        return {
          url : `/referral-affiliates/v1/`,
          method: 'POST',
          body
        }
      }
    })
  }),
  overrideExisting: false,
});

export const { useGetReferralCodesQuery,
  useCreateReferralCodeMutation
 } = referralCodeApi;
