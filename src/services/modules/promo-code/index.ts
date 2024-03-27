import {
  GetPromoCodeQuery,
  PromoCodeFormDataI,
  PromoCodeI,
  PromoCodeRes,
} from "_interfaces/promo-code.interfaces";
import { Api } from "services/api";

export const promoCodeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getPromoCodes: build.query<PromoCodeRes, GetPromoCodeQuery>({
      query: (params) => ({
        url: `/promo-code/v1/list`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getPromoCodeById: build.query<PromoCodeI, string>({
      query: (id) => `/promo-code/v1/${id}`,
      keepUnusedDataFor: 0,
    }),
    updatePromoCode: build.mutation<void, PromoCodeFormDataI>({
      query(body) {
        return {
          url: `/promo-code/v1/update`,
          method: "PATCH",
          body,
        };
      },
    }),
    createPromoCode: build.mutation<void, PromoCodeFormDataI>({
      query(body) {
        return {
          url: `/promo-code/v1/create`,
          method: "POST",
          body,
        };
      },
    }),
    deletePromoCode: build.mutation<void, string>({
      query(id) {
        return {
          url: `/promo-code/v1/delete`,
          method: "DELETE",
          data: { id },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPromoCodesQuery,
  useLazyGetPromoCodeByIdQuery,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
  useCreatePromoCodeMutation,
} = promoCodeApi;
