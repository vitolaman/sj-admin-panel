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
