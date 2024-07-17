import {
  GetCompanyParams,
  GetCompanyResI,
} from "_interfaces/company.interfaces";
import { Api } from "services/api";

export const CompanyApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getCompanyList: build.query<GetCompanyResI, GetCompanyParams>({
      query: (params) => {
        return { url: `/admin-portal/v1/company/list`, params };
      },
      keepUnusedDataFor: 0,
    }),
    updateExpiryDate: build.mutation<
      void,
      {
        production_expiration_date: Date;
        sandbox_expiration_date: Date;
        id: string;
      }
    >({
      query({ production_expiration_date, sandbox_expiration_date, id }) {
        return {
          url: `admin-portal/v1/company/${id}/expiration`,
          method: "PATCH",
          body: { production_expiration_date, sandbox_expiration_date },
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
  }),
  overrideExisting: false,
});

export const {
  useGetCompanyListQuery,
  useUpdateExpiryDateMutation,
  useUpdateEligibilityMutation,
  useUpdateStatusMutation,
} = CompanyApi;

