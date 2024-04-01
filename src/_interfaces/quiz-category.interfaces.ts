export interface QuizCategoryRes {
  data: QuizCategoryI[];
}

export interface QuizCategoryI {
  category_id: string;
  name: string;
  descriptions: Descriptions;
}

export interface Descriptions {
  id: string;
  en: string;
}

export interface CreateQuizCategoryI {
  category_id: string;
  name: string;
  description: Descriptions;
}
