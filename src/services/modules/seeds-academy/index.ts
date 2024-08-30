import {
  CreateClassPayloadRes,
  GetClassPayloadRes,
  PatchPayload,
  GetClassByCatagoryRes,
  CreateCategoryPayloadRes,
  CreateCategoryReq,
  MainSeedsAcademyReq,
  MainSeedsAcademyRes,
  MainSubcriptionRes,
  MainSubcriptionReq,
  CreateSubcriptionPayload,
  SubcriptionById,
} from "_interfaces/seeds-academy.interfaces";
import { Api } from "services/api";
import { errorHandler } from "services/errorHandler";

export const seedsAcademyApi = Api.injectEndpoints({
  endpoints: (build) => ({
    SeedsAcademyList: build.query<MainSeedsAcademyRes, MainSeedsAcademyReq>({
      query: (param: {
        search: string;
        status: string;
        type: string;
        limit: number;
        page: number;
      }) =>
        `admin-academy/v1/category?search=${param.search}&status=${param.status}&type=${param.type}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    createCategory: build.mutation<CreateCategoryPayloadRes, CreateCategoryReq>(
      {
        query(body) {
          return {
            url: `admin-academy/v1/category`,
            method: "POST",
            body,
          };
        },
      }
    ),
    updateCategory: build.mutation<
      string,
      { id: string; body: CreateCategoryReq }
    >({
      query({ id, body }) {
        return {
          url: `admin-academy/v1/category/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    ClassByCategoryList: build.query<
      GetClassByCatagoryRes,
      MainSeedsAcademyReq
    >({
      query: (param: {
        search: string;
        status: string;
        type: string;
        limit: number;
        page: number;
        id: string;
      }) =>
        `admin-academy/v1/category/${param.id}/class?search=${param.search}&status=${param.status}&type=${param.type}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    getClassById: build.query<GetClassPayloadRes, string>({
      query: (classId) => `admin-academy/v1/class/${classId}`,
      keepUnusedDataFor: 0,
    }),
    CreateClassList: build.query<MainSeedsAcademyRes, MainSeedsAcademyReq>({
      query: (param: {
        search: string;
        status: string;
        type: string;
        limit: number;
        page: number;
      }) =>
        `admin-academy/v1/class?search=${param.search}&status=${param.status}&type=${param.type}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    updateStatus: build.mutation<string, { id: string; body: PatchPayload }>({
      query({ id, body }) {
        return {
          url: `admin-academy/v1/category/${id}/status`,
          method: "PATCH",
          body,
        };
      },
    }),
    deleteCategory: build.mutation<void, { id: string }>({
      query({ id }) {
        return {
          url: `admin-academy/v1/category/${id}`,
          method: "DELETE",
        };
      },
    }),
    deleteClass: build.mutation<void, { id: string }>({
      query({ id }) {
        return {
          url: `admin-academy/v1/class/${id}`,
          method: "DELETE",
        };
      },
    }),
    getSubscriptionList: build.query<MainSubcriptionRes, MainSubcriptionReq>({
      query: (param: {
        search: string;
        status: string;
        limit: number;
        page: number;
      }) => ({
        url: `${process.env.REACT_APP_REST_HOST}/admin-academy/v1/subscription-config?search=${param.search}&status=${param.status}&limit=${param.limit}&page=${param.page}`,
        method: "GET",
      }),
    }),
    createSubscription: build.mutation<
      MainSubcriptionRes,
      { body: CreateSubcriptionPayload }
    >({
      query({ body }) {
        return {
          url: `${process.env.REACT_APP_REST_HOST}/admin-academy/v1/subscription-config`,
          method: "POST",
          body,
        };
      },
    }),
    deleteSubscription: build.mutation<void, { id: string }>({
      query({ id }) {
        return {
          url: `${process.env.REACT_APP_REST_HOST}/admin-academy/v1/subscription-config/${id}`,
          method: "DELETE",
        };
      },
    }),
    editSubscription: build.mutation<
      MainSubcriptionRes,
      { id: string; body: Partial<CreateSubcriptionPayload> }
    >({
      query({ id, body }) {
        return {
          url: `admin-academy/v1/subscription-config/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    getSubscriptionById: build.query<SubcriptionById, string>({
      query: (id) => ({
        url: `admin-academy/v1/subscription-config/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSeedsAcademyListQuery,
  useCreateClassListQuery,
  useClassByCategoryListQuery,
  useGetClassByIdQuery,
  useCreateCategoryMutation,
  // useCreateClassMutation,
  useUpdateCategoryMutation,
  useUpdateStatusMutation,
  useDeleteCategoryMutation,
  useDeleteClassMutation,
  useGetSubscriptionListQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useEditSubscriptionMutation,
  useGetSubscriptionByIdQuery,
} = seedsAcademyApi;

const createClass = async (accessToken: string, formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_REST_HOST}/admin-academy/v1/class`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

export default createClass;
