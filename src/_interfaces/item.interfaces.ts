import { BillI } from "./bill.interface";
import { StockOrderI } from "./stock-orders.interfaces";

export interface ItemRes {
  data: ItemI[];
  metadata: Metadata;
}

export interface ItemI {
  id: string;
  name: string;
  type: string;
  stock: string;
  normalStockValue: string;
  price: string;
}

export interface Metadata {
  currentPage: number;
  totalPage: number;
  totalRow: number;
}

export interface ItemReq {
  search: string;
  limit: number;
  page: number;
}

export interface PendingItemRes {
  data: PendingItemI[];
  meta: Metadata;
}

export interface PendingItemI {
  itemId: string;
  itemName: string;
  totalStock: string;
}

export interface PendingItemReq {
  search: string;
  limit: number;
  page: number;
}

export interface StockIncomingRes {
  data: StockIncomingI[];
  meta: Metadata;
}

export interface StockIncomingI {
  id: string;
  item: ItemI;
  stockOrder: StockOrderI;
  createdBy: string;
  createdAt: string;
  amount: number;
}

export interface StockIncomingReq {
  search: string;
  limit: number;
  page: number;
}

export interface StockOutgoingRes {
  data: StockOutgoingI[];
  meta: Metadata;
}

export interface StockOutgoingItemI {
  id: number;
  amount: number;
  price: number;
  outgoingStockId: number;
  item: ItemI;
}

export interface StockOutgoingI {
  id: number;
  outgoingStockItems: StockOutgoingItemI[];
  stockOrder: StockOrderI;
  createdBy: string;
  reffNo: string;
  createdAt: string;
  amount: number;
  bill: BillI;
}

export interface StockOutgoingReq {
  search: string;
  limit: number;
  page: number;
}
