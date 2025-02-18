import { ItemReq, ItemRes } from "_interfaces/item.interfaces";
import {
  CreatePlayPayload,
  EditArenaPayloadI,
  PlayI,
  PlayReq,
  PlayRes,
  PromoCodeRes,
} from "_interfaces/play.interfaces";
import { Api } from "services/api";

export const clientApi = Api.injectEndpoints({
  endpoints: (build) => ({
    clientList: build.query<ItemRes, ItemReq>({
      query: (param) =>
        `clients?search=${param.search}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    clientById: build.query<PlayI, string>({
      query: (id) => `clients/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useClientListQuery,
  useClientByIdQuery,
} = clientApi;
