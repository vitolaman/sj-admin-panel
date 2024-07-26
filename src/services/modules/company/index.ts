import {
  CompanyI,
  GetCompanyParams,
  GetCompanyResI,
  SummaryReport,
  SummaryReportByDate,
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
    updateEligibility: build.mutation<
      void,
      { is_production_eligible: boolean; id: string }
    >({
      query({ is_production_eligible, id }) {
        return {
          url: `admin-portal/v1/company/${id}/eligibility`,
          method: "PATCH",
          body: { is_production_eligible },
        };
      },
    }),
    updateStatus: build.mutation<void, { is_active: boolean; id: string }>({
      query({ is_active, id }) {
        return {
          url: `admin-portal/v1/company/${id}/status`,
          method: "PATCH",
          body: { is_active },
        };
      },
    }),
    getSummaryReport: build.query<SummaryReport, string>({
      query: (id) => `/admin-portal/v1/company/${id}/summary-report`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompanyListQuery,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
  useUpdateEligibilityMutation,
  useUpdateStatusMutation,
  useGetSummaryReportQuery,
} = CompanyApi;
