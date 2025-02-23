import { GroupBase } from "react-select";
import { OptChild } from "./admin-fee.interfaces";

export interface GetQuizQuery {
  page: number;
  limit: number;
  search: string;
  category: string;
}

export interface QuizRes {
  data: QuizI[];
  meta: Meta;
}

export interface QuizI {
  id: string;
  name: string;
  banner: Banner;
  sponsors: Banner;
  communities: Banner;
  questions: number;
  participants: number;
  category: string;
  status: string;
  privacy: string;
  featured_link: string;
  admission_fee: number;
  is_played: boolean;
  is_recommended: boolean;
  is_free_voucher_claimed: boolean;
  started_at: string;
  ended_at: string;
  created_at: string;
  payment_method: string[];
  prizes: number[];
  tnc: {
    en: string;
    id: string;
  };
  prize_type: string;
  winner_image_url: string[];
  winner_link_url: string[];
}

export interface Banner {
  image_url: string;
  image_link: string;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
}

export interface QuizForm {
  name: string;
  tnc: { id: string; en: string };
  category: string;
  min_participant: number;
  max_participant: number;
  duration_in_minute: number;
  admission_fee: number;
  is_recommended: boolean;
  published_at: string;
  started_at: string;
  ended_at: string;
  prizes: { prize: number }[];
  communities: {
    image_url: string;
    image_link: string | FileList;
  };
  sponsors: {
    image_url: string;
    image_link: string | FileList;
  };
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  lifelines: [
    {
      name: string;
      price: number;
    },
    {
      name: string;
      price: number;
    },
    {
      name: string;
      price: number;
    }
  ];
  invitation_code: string;
  promo_id: string;
  featured_link: string;
  total_questions: number;
  payment_method: string[] | OptChild[];
  prize_type: string;
  winner_link_url: string[];
  winner_image_url: FileType[];
}
export interface FileType {
  file?: FileList;
  link?: string;
}

export interface QuizPayload
  extends Omit<QuizForm, "prizes" | "winner_image_url"> {
  prizes: number[];
  winner_image_url: string[];
}
