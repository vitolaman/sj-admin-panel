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

export const billApi = Api.injectEndpoints({
  endpoints: (build) => ({
    billList: build.query<ItemRes, ItemReq>({
      query: (param) =>
        `bills?search=${param.search}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    billById: build.query<any, string>({
      query: (id) => `bills/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBillListQuery,
  useBillByIdQuery,
} = billApi;
