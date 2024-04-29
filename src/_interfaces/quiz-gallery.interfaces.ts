export interface QuizGalleryI {
  gallery_id: string;
  title: string;
  type: string;
  url: string;
  created_at: string
}

export interface CreateQuizGalleryPayload {
  title: string;
  gallery: {
    file_url: string;
    file_link: string | FileList;
  };
  url: string;
  type: string;
}

export interface QuizGalleryRes {
  data: QuizGalleryI[];
}