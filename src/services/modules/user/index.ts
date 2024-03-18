import {
  GetUserQuery,
  UserDataEditI,
  UserDetailI,
  UserRes,
} from "_interfaces/user.interfaces";
import { Api } from "services/api";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserRes, GetUserQuery>({
      query: (params) => ({ url: `/admin-portal/v1/user`, params }),
      keepUnusedDataFor: 0,
    }),
    getUserDetail: build.query<UserDetailI, string>({
      query: (id) => `/admin-portal/v1/user/${id}`,
      keepUnusedDataFor: 0,
    }),
    editUserData: build.mutation<
      void,
      { payload: UserDataEditI; userId: string }
    >({
      query({ userId, payload }) {
        return {
          url: `/admin-portal/v1/user/${userId}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useLazyGetUserDetailQuery,
  useEditUserDataMutation,
} = userApi;
