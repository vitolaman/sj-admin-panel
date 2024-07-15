export interface MainSeedsAcademyRes {
  data: SeedsAcademyListI[];
  metadata: Metadata;
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
}

export interface ClassListById {
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
