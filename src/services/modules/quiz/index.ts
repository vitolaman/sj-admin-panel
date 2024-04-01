import {
  CreateQuizCategoryI,
  Descriptions,
  QuizCategoryI,
  QuizCategoryRes,
} from "_interfaces/quiz-category.interfaces";
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
      query: (id) => `quiz/v1/${id}`,
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
    getQuizCategories: build.query<QuizCategoryRes, undefined>({
      query: () => `quiz/v1/category/list`,
      keepUnusedDataFor: 0,
    }),
    getQuizCategoryById: build.query<QuizCategoryI, string>({
      query: (id) => `quiz/v1/category/${id}`,
      keepUnusedDataFor: 0,
    }),
    createQuizCategory: build.mutation<void, CreateQuizCategoryI>({
      query(body) {
        return {
          url: `quiz/v1/category/create`,
          method: "POST",
          body,
        };
      },
    }),
    updateQuizCategory: build.mutation<
      void,
      { id: string; description: Descriptions }
    >({
      query({ id, description }) {
        return {
          url: `quiz/v1/category/${id}`,
          method: "PATCH",
          body: { description },
        };
      },
    }),
    deleteQuizCategory: build.mutation<void, string>({
      query(id) {
        return {
          url: `quiz/v1/category/${id}`,
          method: "DELETE",
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
  useGetQuizCategoriesQuery,
  useLazyGetQuizCategoryByIdQuery,
  useCreateQuizCategoryMutation,
  useUpdateQuizCategoryMutation,
  useDeleteQuizCategoryMutation,
} = quizApi;
