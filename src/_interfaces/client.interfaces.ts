export interface ClientRes {
  data: ClientI[];
  metadata: Metadata;
}

export interface ClientI {
  id: number,
  name: string;
  clientCode: string;
  city: string;
  sales: Sales;
}

export interface Sales {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Metadata {
  currentPage: number;
  totalPage: number;
  totalRow: number;
}

export interface ClientReq {
  search: string;
  limit: number;
  page: number;
}
