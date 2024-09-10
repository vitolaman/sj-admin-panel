export interface MainSeedsAcademyRes {
  data: SeedsAcademyListI[];
  metadata: Metadata;
}

export interface MainSubcriptionRes {
  data: SubcriptionListI[];
  metadata: Metadata2;
}

export interface SubcriptionListI {
  id: string;
  price: number;
  duration_month: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface MainSubcriptionReq {
  search: string;
  status: string;
  limit: number;
  page: number;
}

export interface PatchPayload {
  status: string;
}
export interface MainSeedsAcademyReq {
  search: string;
  status: string;
  type: string;
  limit: number;
  page: number;
  id?: string;
}

export interface Metadata2 {
  current_page: number;
  limit: number;
  total_page: number;
  total: number;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}

export interface SeedsAcademyListI {
  id: string;
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: string;
  level: string[];
  status: string;
  total_class: number;
  created_at: string;
  published_at: string;
  updated_at: string;
}

export interface CreateCategoryPayload {
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  level: string[];
  status: string;
  published_at: string;
}

export interface CreateCategoryReq {
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: string;
  level: string[];
  status: string;
  published_at: string;
}

export interface CreateCategoryPayloadRes {
  id: string;
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: string | File;
  level: string[];
  status: string;
  published_at: string;
}

export interface CreateCategoryRequest {
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: File;
  level: string[];
  status: string;
  published_at: string;
}

export interface CategoryFormData {
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: string;
  level: string[];
  status: string;
  published_at: string;
}

export interface GetClassByCatagoryRes {
  id: string;
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: string;
  level: string[];
  status: string;
  published_at: string;
  classes: ClassListI[];
}

export interface ClassListI {
  id: string;
  title: string;
  video: string;
  price: {
    idr: number;
  };
  banner: string;
  description: {
    id: string;
  };
  module: string;
  assesment: string;
  total_question: number;
  level: string;
}

export interface ClassListById {
  id: string;
  title: string;
  video: string;
  price: string;
  banner: string;
  description: {
    id: string;
  };
  module: string;
  assesment: string;
  total_question: number;
  level: string;
}

export interface CreateClassReq {
  title: string;
  description: {
    id: string;
    en: string;
  };
  module: string;
  price: {
    idr: string;
  };
  category_id: string | undefined;
  level: string;
  banner: string;
  video: string;
  quiz: string;
}

export interface CreateClassPayload {
  title: string;
  description: {
    id: string;
    en: string;
  };
  module: {
    file_url: string;
    file_link: string | FileList;
  };
  price: string;
  category_id: string | undefined;
  level: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  video: string;
  quiz: {
    file_url: string;
    file_link: string | FileList;
  };
}
export interface CreateClassPayloadRes {
  title: string;
  description: {
    id: string;
    en: string;
  };
  module: string;
  price: {
    idr: string;
  };
  category_id: string | undefined;
  level: string;
  banner: string;
  video: string;
  quiz: string | File;
}

export interface GetClassPayloadRes {
  title: string;
  description: {
    id: string;
    en: string;
  };
  module: string;
  price: string;
  category_id: string | undefined;
  level: string;
  banner: string;
  video: string;
  quiz: string | File;
}

export interface UpdateClassPayload {
  title: string;
  description: {
    id: string;
    en: string;
  };
  module: {
    file_url: string;
    file_link: string | FileList;
  };
  price: string;
  category_id: string | undefined;
  level: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  video: string;
  quiz: {
    file_url: string;
    file_link: string | FileList;
  };
}

export interface SubscriptionConfig {
  id: string;
  name: string;
}

export interface CreateSubcriptionPayload {
  price: number;
  duration_month: number;
  status: boolean;
}

export interface SubcriptionById {
  data: SubcriptionByIdI;
}

export interface SubcriptionByIdI {
  price: number;
  duration_month: number;
  status: boolean;
}
