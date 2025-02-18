import {
  PendingItemReq,
  PendingItemRes,
} from "_interfaces/item.interfaces";
import { Api } from "services/api";

export const clientApi = Api.injectEndpoints({
  endpoints: (build) => ({
    pendingList: build.query<PendingItemRes, PendingItemReq>({
      query: (param) =>
        `items/pending?search=${param.search}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const { usePendingListQuery } = clientApi;
