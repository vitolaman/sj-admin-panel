import { PlayReq, PlayRes } from "_interfaces/play.interfaces";
import { Api } from "services/api";

export const playApi = Api.injectEndpoints({
  endpoints: (build) => ({
    playList: build.query<PlayRes, PlayReq>({
      query: (param) =>
        `admin-play/v1/list?search=${param.search}&status=${param.status}&type=${param.type}&page=${param.page}&limit=${param.limit}`,
    }),
  }),
  overrideExisting: false,
});

export const { usePlayListQuery } = playApi;
