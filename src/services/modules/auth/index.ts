import { LoginReqI, LoginResI } from "_interfaces/auth-api.interfaces";
import { Api } from "services/api";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        return {
          url: "/users/login",
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = userApi;
