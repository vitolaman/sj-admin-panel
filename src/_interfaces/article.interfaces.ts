import { MultiValue } from "react-select";

export interface GetArticleQuery {
  page: number;
  limit: number;
  search_title?: string;
  filter_status: "PUBLISHED" | "DRAFT" | "SCHEDULED";
}

export interface ArticleRes {
  data: ArticleI[];
  metadata: Metadata;
}

export interface ArticleI {
  id: number;
  title: string;
  author: string;
  author_id: string;
  link: string;
  videoUrl: string;
  imageUrl: string;
  content: string;
  source: string;
  language: string;
  category: string;
  publicationDate: string;
  peoples: People[];
  circles: Circle[];
  assets: Asset[];
  status: string;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_views: number;
  is_liked: boolean;
  meta_title: string;
  meta_description: string;
  updated_at: string;
}

export interface People {
  id: string;
  name: string;
}

export interface Circle {
  id: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
}

export interface Metadata {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}

export interface EditArticlePayload {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  content?: string;
  imageUrl?: string;
  source_image?: string;
  author?: string;
  status?: string;
  publicationDate?: string;
  created_at?: string;
  updated_at?: string;
  assets?: Tag[];
  circles?: Tag[];
  category?: string;
  language?: string;
  peoples?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface EditArticleFormI {
  id?: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  imageUrl: FileList;
  source_image: string;
  author: string;
  status: string;
  scheduled_at: string;
  created_at: string;
  updated_at: string;
  assets: MultiValue<optionsWAvatar>;
  circles: MultiValue<optionsWAvatar>;
  category: string;
  language: string;
  peoples: MultiValue<optionsWAvatar>;
}

export interface optionsWAvatar {
  key: number;
  label: string;
  value: string;
  avatar: string;
}

export interface GetPeopleRes {
  data: PeopleI[];
  meta: Meta;
}

export interface PeopleI {
  id: string;
  name: string;
  tag: string;
  avatar: string;
  verified: boolean;
  email_verification: boolean;
  label: string;
  city: string;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
}
