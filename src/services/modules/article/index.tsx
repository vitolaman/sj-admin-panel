import {
  ArticleI,
  ArticleRes,
  EditArticlePayload,
  GetArticleQuery,
  GetPeopleRes,
} from "_interfaces/article.interfaces";
import { GetAssetsRes } from "_interfaces/asset.interfaces";
import {
  GetCircleCategoriesRes,
  GetCircleTagRes,
} from "_interfaces/circle-category.interfaces";
import { Api } from "services/api";

export const articleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<ArticleRes, GetArticleQuery>({
      query: (params) => ({
        url: `/admin-portal/v1/article`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getArticleById: build.query<{ news: ArticleI }, string>({
      query: (id) => ({
        url: `/admin-portal/v1/article/${id}`,
      }),
      keepUnusedDataFor: 0,
    }),
    createArticle: build.mutation<void, EditArticlePayload>({
      query(body) {
        return {
          url: "/admin-portal/v1/article",
          method: "POST",
          body,
        };
      },
    }),
    editArticle: build.mutation<void, { body: EditArticlePayload; id: number }>(
      {
        query({ id, body }) {
          return {
            url: `/admin-portal/v1/article/${id}`,
            method: "PATCH",
            body,
          };
        },
      },
    ),
    getPeople: build.query<GetPeopleRes, string>({
      query: (search) => ({
        url: "/tag/v1/people",
        params: {
          page: 1,
          limit: 10,
          search,
        },
      }),
    }),
    getCircleTag: build.query<GetCircleTagRes, string>({
      query: (search) => ({
        url: "/tag/v1/circles",
        params: {
          page: 1,
          limit: 10,
          search,
        },
      }),
    }),
    getAssetTag: build.query<GetAssetsRes, string>({
      query: (search) => ({
        url: "/tag/v1/assets",
        params: {
          page: 1,
          limit: 10,
          search,
        },
      }),
    }),
    getCircleCategories: build.query<GetCircleCategoriesRes, undefined>({
      query: () => ({
        url: "/circle/v2/categories",
        params: {
          page: 1,
          limit: 30,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetArticlesQuery,
  useLazyGetArticleByIdQuery,
  useGetPeopleQuery,
  useGetCircleTagQuery,
  useGetAssetTagQuery,
  useGetCircleCategoriesQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
} = articleApi;
