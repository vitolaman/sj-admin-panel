import {
  CreatePlayPayload,
  EditArenaPayloadI,
  PlayI,
  PlayReq,
  PlayRes,
  PromoCodeRes,
} from "_interfaces/play.interfaces";
import { Api } from "services/api";

export const playApi = Api.injectEndpoints({
  endpoints: (build) => ({
    playList: build.query<PlayRes, PlayReq>({
      query: (param) =>
        `admin-play/v1/list?search=${param.search}&status=${param.status}&type=${param.type}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    playById: build.query<PlayI, string>({
      query: (id) => `admin-play/v1/${id}`,
      keepUnusedDataFor: 0,
    }),
    promoCode: build.query<PromoCodeRes, string>({
      query: (search) =>
        `promo-code/v1/list?page=1&limit=10&search_name=${search}`,
      keepUnusedDataFor: 0,
    }),
    cancelPlay: build.mutation<void, string>({
      query(id) {
        return {
          url: `admin-play/v1/${id}/cancel`,
          method: "POST",
          body: {},
        };
      },
    }),
    createPlay: build.mutation<void, CreatePlayPayload>({
      query(body) {
        return {
          url: `admin-play/v1/create`,
          method: "POST",
          body,
        };
      },
    }),
    updatePlay: build.mutation<
      void,
      { id: string; payload: EditArenaPayloadI }
    >({
      query({ payload, id }) {
        return {
          url: `admin-play/v1/${id}/update`,
          method: "PATCH",
          body: payload,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  usePlayListQuery,
  usePlayByIdQuery,
  usePromoCodeQuery,
  useCancelPlayMutation,
  useUpdatePlayMutation,
  useCreatePlayMutation,
} = playApi;
