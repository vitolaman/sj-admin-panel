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
  metadata: {
    total: number;
    currentPage: number;
    limit: number;
    totalPage: number;
  };
}

export interface QuizGalleryReq {
  search: string;
  page: number;
  limit: number;
  type: string;
}