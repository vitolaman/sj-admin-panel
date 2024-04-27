export interface QuizGalleryI {
  gallery_id: string;
  title: string;
  type: string;
  url: string;
  created_at: string
}

export interface CreateQuizGalleryPayload {
  title: string;
  type: string;
  url: string;
}

export interface QuizGalleryRes {
  data: QuizGalleryI[];
}