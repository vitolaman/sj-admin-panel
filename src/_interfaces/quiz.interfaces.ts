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

export interface CreateQuizPayload {
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
  prizes: number[];
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
    },
  ];
  invitation_code: string;
  promo_id: string;
  featured_link: string;
  total_questions: number;
}

export interface EditQuizPayload {
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
  prizes: number[];
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
  total_questions: number;
}
