import {
  QuizWithdrawReqI,
  QuizWithdrawResI,
  QuizWithdrawUpdateI,
} from "_interfaces/quiz-withdraw.interfaces";
import { Api } from "services/api";

export const quizWithdrawApi = Api.injectEndpoints({
  endpoints: (build) => ({
    quizWithdrawList: build.query<QuizWithdrawResI, QuizWithdrawReqI>({
      query: (params) =>
        `quiz/v1/withdraw/list?search=&status=&page=${params.page}&limit=${params.limit}`,
      keepUnusedDataFor: 0,
    }),
    quizUpdateWithdrawStatus: build.mutation<void, QuizWithdrawUpdateI>({
      query(body) {
        return {
          url: `quiz/v1/cashout/update`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useQuizWithdrawListQuery, useQuizUpdateWithdrawStatusMutation } =
  quizWithdrawApi;
