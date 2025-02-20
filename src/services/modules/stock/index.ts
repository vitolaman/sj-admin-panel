import { PendingItemReq, PendingItemRes } from "_interfaces/item.interfaces";
import { Api } from "services/api";

export const stockApi = Api.injectEndpoints({
  endpoints: (build) => ({
    incomingList: build.query<PendingItemRes, PendingItemReq>({
      query: (param) =>
        `stocks/incoming?search=${param.search}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    incomingById: build.query<PendingItemRes, string>({
      query: (id) => `stocks/${id}/incoming`,
      keepUnusedDataFor: 0,
    }),
    outgoingList: build.query<PendingItemRes, PendingItemReq>({
      query: (param) =>
        `stocks/outgoing?search=${param.search}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    outgoingById: build.query<PendingItemRes, PendingItemReq>({
      query: (id) => `stocks/${id}/outgoing`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useIncomingListQuery,
  useIncomingByIdQuery,
  useOutgoingListQuery,
  useOutgoingByIdQuery,
} = stockApi;
