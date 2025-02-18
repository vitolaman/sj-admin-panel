import { ItemReq, ItemRes } from "_interfaces/item.interfaces";
import {
  CreatePlayPayload,
  EditArenaPayloadI,
  PlayI,
  PlayReq,
  PlayRes,
  PromoCodeRes,
} from "_interfaces/play.interfaces";
import { StockOrderI, StockOrderRes } from "_interfaces/stock-orders.interfaces";
import { Api } from "services/api";

export const StockOrderApi = Api.injectEndpoints({
  endpoints: (build) => ({
    stockOrderList: build.query<StockOrderRes, ItemReq>({
      query: (param) =>
        `stock-orders?search=${param.search}&page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    stockOrderById: build.query<StockOrderI, string>({
      query: (id) => `stock-orders/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useStockOrderListQuery,
  useStockOrderByIdQuery,
} = StockOrderApi;
