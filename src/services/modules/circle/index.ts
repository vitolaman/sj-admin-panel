import {
  CircleDetailType,
  CircleOwnerRes,
  CircleReq,
  CircleRes,
  CircleWithdraw,
  CircleWithdrawRes,
  ListMemberCircleReq,
  TokenReportReq,
  TokenReportRes,
  WithdrawChangeStatusReq,
} from "_interfaces/circle.interface";
import { Api } from "services/api";

export const circleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    TokenReportList: build.query<TokenReportRes, TokenReportReq>({
      query: (param) =>
        `/admin-portal/v1/circle/reports/list?search=${param.search}&limit=${param.limit}&page=${param.page}&sort_by=${param.sort_by}&order=${param.order}&ticket=${param.ticket}&circle_owner_id=${param.circle_owner_id}&created_at_from=${param.created_at_from}&created_at_to=${param.created_at_to}`,
      keepUnusedDataFor: 0,
    }),
    CircleList: build.query<CircleRes, CircleReq>({
      query: (param) =>
        `/admin-portal/v1/circle/list?search=${param.search}&limit=${param.limit}&page=${param.page}&sort_by=${param.sort_by}&order=${param.order}&type=${param.type}&total_member_from=${param.total_member_from}&total_member_to=${param.total_member_to}&total_post_from=${param.total_post_from}&total_post_to=${param.total_post_to}&total_like_from=${param.total_like_from}&total_like_to=${param.total_like_to}&total_share_from=${param.total_share_from}&total_share_to=${param.total_share_to}&created_at_from=${param.created_at_from}&created_at_to=${param.created_at_to}`,
      keepUnusedDataFor: 0,
    }),
    ListWithdraw: build.query<
      CircleWithdrawRes,
      { page: number; limit: number }
    >({
      query: (param) =>
        `/admin-circle/v1/withdraws?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    OwnerCircleList: build.query<
      CircleOwnerRes,
      { page: number; limit: number }
    >({
      query: (param) =>
        `/admin-portal/v1/circle/owner/list?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    CircleDetail: build.query<{ data: CircleDetailType }, { id: string }>({
      query: (param) => `/admin-portal/v1/circle/find/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    ListMember: build.query<{ data: CircleDetailType }, ListMemberCircleReq>({
      query: (param) =>
        `/circle/v2/list/members?page=${param.page}&limit=${param.limit}&circle_id=${param.circle_id}`,
      keepUnusedDataFor: 0,
    }),
    changeAdminFee: build.mutation<string, { admin_fee: number; id: string }>({
      query(body) {
        return {
          url: `/admin-portal/v1/circle/admin-fee/${body.id}`,
          method: "PUT",
          body: {
            ...body,
          },
        };
      },
    }),
    changeStatusWithdraw: build.mutation<
      CircleWithdraw,
      WithdrawChangeStatusReq
    >({
      query(body) {
        return {
          url: `/admin-circle/v1/withdraws`,
          method: "PATCH",
          body: {
            ...body,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useTokenReportListQuery,
  useListWithdrawQuery,
  useCircleListQuery,
  useOwnerCircleListQuery,
  useCircleDetailQuery,
  useListMemberQuery,
  useChangeAdminFeeMutation,
  useChangeStatusWithdrawMutation,
} = circleApi;
