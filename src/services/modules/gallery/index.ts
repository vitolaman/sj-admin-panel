import { CreateQuizGalleryPayload, QuizGalleryRes } from "_interfaces/quiz-gallery.interfaces";
import { Api } from "services/api";

export const quizApi = Api.injectEndpoints({
  endpoints: (build) => ({
    createQuizGallery: build.mutation<void, CreateQuizGalleryPayload>({
      query(body) {
        return {
          url: `quiz/v1/gallery/create`,
          method: "POST",
          body,
        };
      },
    }),
    getQuizGalleryList: build.query<QuizGalleryRes, undefined>({
      query: () =>
        `quiz/v1/gallery/list`,
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateQuizGalleryMutation,
  useGetQuizGalleryListQuery,
} = quizApi;