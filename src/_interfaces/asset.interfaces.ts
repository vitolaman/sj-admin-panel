export interface GetAssetsRes {
  data: AssetI[];
  meta: Meta;
}

export interface AssetI {
  id: string;
  name: string;
  ticker: string;
  currency: string;
  logo: string;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
}
