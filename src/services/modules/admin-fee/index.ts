import {
  AdminFeeI,
  AdminFeePayloadI,
  PaymentChannelRes,
} from "_interfaces/admin-fee.interfaces";
import { Api } from "services/api";

export const adminFeeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getPaymentList: build.query<{ config_list: AdminFeeI[] }, undefined>({
      query: () => `/admin-portal/v1/payment/config/list?page=1&limit=50`,
      keepUnusedDataFor: 0,
    }),
    updatePaymentList: build.mutation<void, AdminFeePayloadI>({
      query(body) {
        return {
          url: "admin-portal/v1/payment/config",
          method: "PUT",
          body,
        };
      },
    }),
    getWithdrawalList: build.query<{ config_list: AdminFeeI[] }, undefined>({
      query: () => `/admin-portal/v1/withdrawal/config/list?page=1&limit=50`,
      keepUnusedDataFor: 0,
    }),
    updateWithdrawalList: build.mutation<void, AdminFeePayloadI>({
      query(body) {
        return {
          url: "admin-portal/v1/withdrawal/config",
          method: "PUT",
          body,
        };
      },
    }),
    getPaymentChannel: build.query<PaymentChannelRes, undefined>({
      query: () => `/payment/v1/payment/list?currency=IDR`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPaymentListQuery,
  useUpdatePaymentListMutation,
  useGetWithdrawalListQuery,
  useUpdateWithdrawalListMutation,
  useGetPaymentChannelQuery,
} = adminFeeApi;
