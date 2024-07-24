import {
  CompanyI,
  GetCompanyParams,
  GetCompanyResI,
  UpdateCompanyPayload,
} from "_interfaces/company.interfaces";
import { Api } from "services/api";

export const CompanyApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getCompanyList: build.query<GetCompanyResI, GetCompanyParams>({
      query: (params) => {
        return {
          url: `/admin-portal/v1/company/list?page=${params.page}&limit=${params.limit}&search=${params.search}`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    getCompanyById: build.query<CompanyI, string>({
      query: (id) => `/admin-portal/v1/company/${id}`,
      keepUnusedDataFor: 0,
    }),
    updateCompany: build.mutation<
      void,
      { id: string; body: UpdateCompanyPayload }
    >({
      query({ id, body }) {
        return {
          url: `admin-portal/v1/company/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompanyListQuery,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} = CompanyApi;
