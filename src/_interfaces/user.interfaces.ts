export interface UserRes {
  data: UserI[]
  metadata: Metadata
}

export interface UserI {
  id: string
  name: string
  seeds_tag: string
  birth_date: string
  created_at: string
  status: string
}

export interface Metadata {
  total: number
  currentPage: number
  limit: number
  totalPage: number
}

export interface GetUserQuery {
  page: number;
  limit: number;
  search_query: string;
}

export interface UserDetailI {
  id: string
  phone_number: string
  email: string
  birth_date: string
  name: string
  seeds_tag: string
  ref_code: string
  password: string
  avatar: string
  role: string
  preferred_language: string
  preferred_currency: string
  bio: string
  pin: boolean
  posts: number
  followers: number
  following: number
  region: string
  verified: boolean
  email_verification: boolean
  badge: string
  total_exp: number
  status_blocked: boolean
  status_followed: boolean
  chat_mute_status: string
  chat_mute_date: string
  status_online: boolean
  created_at: string
  updated_at: string
  user_role: string
  community: string
}

export interface UserDataEditI {
  name?: string;
  seeds_tag?: string;
  email?: string;
  password?: string;
  avatar?: string;
  ref_code?: string;
  bio?: string;
  birth_date?: string;
  phone_number?: string;
  role?: string;
  verified?: boolean;
  user_role?: string;
  specific_user_role?: string;
  community?: string;
  id?: string;
}
