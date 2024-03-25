import {
  PlayWithdrawReq,
  PlayWithdrawRes,
  WithdrawUpdateI,
} from "_interfaces/play-withdraw.interfaces";
import { Api } from "services/api";

export const playWithdrawApi = Api.injectEndpoints({
  endpoints: (build) => ({
    withdrawList: build.query<PlayWithdrawRes, PlayWithdrawReq>({
      query: (param) =>
        `admin-play/v1/withdraw/list?status=&search=&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    updateWithdrawStatus: build.mutation<void, WithdrawUpdateI>({
      query(body) {
        return {
          url: `admin-play/v1/cashout/update`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useWithdrawListQuery, useUpdateWithdrawStatusMutation } = playWithdrawApi;
