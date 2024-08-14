export interface NotificationListRes {
  data: PushNotificationList[];
  metadata: Metadata;
}

export interface PushNotificationList {
  id: string;
  campaign_name: string;
  notification_title: string;
  notification_body: string;
  notification_image_url: string;
  type: string;
  schedule_type: string;
  repeat_every: string;
  repeat_intensity: number;
  recurring_days: string[];
  date_started_at: string;
  date_ended_at: string;
  time_at: string;
  scheduled_timezone: string;
  target_notifications: string[];
  target_language: string;
  target_country: string[];
  target_new_user_start: string;
  target_new_user_end: string;
  target_active_play_game_start: string;
  target_active_play_game_end: string;
  target_active_play_game_intensity_start: number;
  target_active_play_game_intensity_end: number;
  target_active_play_game_intensity_type: string;
  target_last_app_engagement_start: string;
  target_last_app_engagement_end: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationListReq {
  limit: number;
  page: number;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}

export interface BlastPushPayload {
  id?: string;
  campaign_name: string;
  notification_title: string;
  notification_body: string;
  notification_image_url: string;
  type: string;
  schedule_type: string;
  repeat_every?: string;
  repeat_intensity?: number;
  recurring_days?: string[];
  date_started_at: string;
  date_ended_at: string;
  time_at?: string;
  scheduled_timezone?: string;
  target_notifications: string[];
  target_language?: string;
  target_country?: string[];
  target_new_user_start?: string;
  target_new_user_end?: string;
  target_active_play_game_start?: string;
  target_active_play_game_end?: string;
  target_active_play_game_intensity_start?: number;
  target_active_play_game_intensity_end?: number;
  target_last_app_engagement_start?: string;
  target_last_app_engagement_end?: string;
  target_active_play_game_intensity_type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlastPushFormData {
  id?: string;
  campaign_name: string;
  notification_title: string;
  notification_body: string;
  notification_image_url: {
    image_url: string;
    image_link: string | FileList;
  };
  type: string;
  schedule_type: string;
  repeat_every?: string;
  repeat_intensity?: number;
  recurring_days?: string[];
  date_started_at: string;
  date_ended_at: string;
  time_at?: string;
  scheduled_timezone?: string;
  target_notifications: string[];
  target_language?: string;
  target_country?: string[];
  target_new_user_start?: string;
  target_new_user_end?: string;
  target_active_play_game_start?: string;
  target_active_play_game_end?: string;
  target_active_play_game_intensity_start?: number;
  target_active_play_game_intensity_end?: number;
  target_last_app_engagement_start?: string;
  target_last_app_engagement_end?: string;
  target_active_play_game_intensity_type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  temp_date?: string;
  temp_endDate?: string;
}
