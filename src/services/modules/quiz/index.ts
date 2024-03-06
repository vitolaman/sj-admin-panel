import {
  CreateQuizPayload,
  EditQuizPayload,
  GetQuizQuery,
  QuizI,
  QuizRes,
} from "_interfaces/quiz.interfaces";
import { Api } from "services/api";

export const quizApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getQuizList: build.query<QuizRes, GetQuizQuery>({
      query: (param) =>
        `quiz/v1/all?search=${param.search}&limit=${param.limit}&page=${param.page}&category=${param.category}&privacy=&start_date=&end_date=`,
      keepUnusedDataFor: 0,
    }),
    getQuizById: build.query<QuizI, string>({
      query: (id) =>
        `quiz/v1/${id}`,
      keepUnusedDataFor: 0,
    }),
    deleteQuiz: build.mutation<void, string>({
      query(id) {
        return {
          url: `quiz/v1/${id}/delete`,
          method: "PATCH",
        };
      },
    }),
    updateQuiz: build.mutation<void, { id: string; body: EditQuizPayload }>({
      query({ id, body }) {
        return {
          url: `quiz/v1/${id}/update`,
          method: "PUT",
          body,
        };
      },
    }),
    createQuiz: build.mutation<void, CreateQuizPayload>({
      query(body) {
        return {
          url: `quiz/v1/create`,
          method: "POST",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuizListQuery,
  useGetQuizByIdQuery,
  useDeleteQuizMutation,
  useUpdateQuizMutation,
  useCreateQuizMutation,
} = quizApi;
