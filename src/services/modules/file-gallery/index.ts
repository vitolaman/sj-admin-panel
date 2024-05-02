import { Api } from "services/api";
import { errorHandler } from "services/errorHandler";

export const fileApi = Api.injectEndpoints({
  endpoints: (build) => ({
    uploadGallery: build.mutation<{ path: string }, File>({
      query(image) {
        let bodyFormData = new FormData();
        bodyFormData.append("file", image);
        bodyFormData.append("type", "QUIZ_GALLERY");

        return {
          url: "/v1/storage/cloud",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadGalleryMutation } = fileApi;

export const uploadFileGallery = async (token: string, gallery: File) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("file", gallery);
    bodyFormData.append("type", "QUIZ_GALLERY");
    const response = await fetch(
      `${process.env.REACT_APP_REST_HOST}/v1/storage/cloud`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: bodyFormData,
      },
    );
    const data = await response.json();
    return data.path;
  } catch (error) {
    errorHandler(error);
  }
};