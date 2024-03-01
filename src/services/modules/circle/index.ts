import {
  CircleOwnerRes,
  CircleReq,
  CircleRes,
  TokenReportReq,
  TokenReportRes,
} from "_interfaces/circle.interface";
import { Api } from "services/api";

export const circleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    TokenReportList: build.query<TokenReportRes, TokenReportReq>({
      query: (param) =>
        `admin-portal/v1/circle/reports/list?search=${param.search}&limit=${param.limit}&page=${param.page}&sort_by=${param.sort_by}&order=${param.order}&ticket=${param.ticket}&circle_owner_id=${param.circle_owner_id}&created_at_from=${param.created_at_from}&created_at_to=${param.created_at_to}`,
    }),
    CircleList: build.query<CircleRes, CircleReq>({
      query: (param) =>
        `admin-portal/v1/circle/list?search=${param.search}&limit=${param.limit}&page=${param.page}&sort_by=${param.sort_by}&order=${param.order}&type=${param.type}&total_member_from=${param.total_member_from}&total_member_to=${param.total_member_to}&total_post_from=${param.total_post_from}&total_post_to=${param.total_post_to}&total_like_from=${param.total_like_from}&total_like_to=${param.total_like_to}&total_share_from=${param.total_share_from}&total_share_to=${param.total_share_to}&created_at_from=${param.created_at_from}&created_at_to=${param.created_at_to}`,
    }),
    OwnerCircleList: build.query<
      CircleOwnerRes,
      { page: number; limit: number }
    >({
      query: (param) =>
        `https://seeds-dev-gcp.seeds.finance/admin-portal/v1/circle/owner/list?page=${param.page}&limit=${param.limit}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useTokenReportListQuery,
  useCircleListQuery,
  useOwnerCircleListQuery,
} = circleApi;
