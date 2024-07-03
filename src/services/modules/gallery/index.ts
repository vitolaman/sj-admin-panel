import { CreateQuizGalleryPayload, QuizGalleryRes, QuizGalleryReq } from "_interfaces/quiz-gallery.interfaces";
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
    getQuizGalleryList: build.query<QuizGalleryRes, QuizGalleryReq>({
      query: (params) =>{
        return {
          url: `/quiz/v1/gallery/list`, params
        }
      },
      keepUnusedDataFor: 0,
    }),
    deleteQuizGallery: build.mutation<void, string>({
      query(id) {
        return {
          url: `/quiz/v1/gallery/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateQuizGalleryMutation,
  useGetQuizGalleryListQuery,
  useDeleteQuizGalleryMutation
} = quizApi;