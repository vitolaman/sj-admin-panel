interface SelectOrRadio {
  label: string;
  value: string;
}
const availableTypeNotification: SelectOrRadio[] = [
  { label: "One Time Scheduled", value: "one_time_schedule" },
  { label: "Recurring", value: "recurring" },
];

const availableTimezone: SelectOrRadio[] = [
  { label: "(GMT +07:00) Thailand", value: "+0700" },
  { label: "(GMT +08:00) Singapore", value: "+0800" },
  { label: "(GMT -05:00) New York", value: "-0500" },
];

const countryOption: SelectOrRadio[] = [
  {
    label: "Indonesia (+62)",
    value: "62",
  },
  {
    label: "Singapore (+65)",
    value: "65",
  },
  {
    label: "New York (+1)",
    value: "1",
  },
];

const daysOption: SelectOrRadio[] = [
  {
    label: "Sunday",
    value: "sunday",
  },
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
];

const repeatOption: SelectOrRadio[] = [
  {
    label: "Days",
    value: "days",
  },
  {
    label: "Weeks",
    value: "weeks",
  },
];

const oneTimeScheduledOption: SelectOrRadio[] = [
  {
    label: "Now",
    value: "now",
  },
  {
    label: "Scheduled",
    value: "scheduled",
  },
];

const languageOption: SelectOrRadio[] = [
  {
    label: "ID",
    value: "id",
  },
  {
    label: "EN",
    value: "en",
  },
];

const recurringOption: SelectOrRadio[] = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Custom",
    value: "custom",
  },
];

const tergetNotificationOption: SelectOrRadio[] = [
  { label: "All User", value: "all" },
  { label: "Country", value: "country" },
  { label: "Last App Engagement", value: "last_app_engagement" },
  { label: "Languages", value: "language" },
  { label: "User Registration Period", value: "new_user" },
  { label: "Active Playing Game Period", value: "active_playing_game" },
];

const intencityOption: SelectOrRadio[] = [
  {
    label: "More Than",
    value: "more",
  },
  {
    label: "Less Than",
    value: "less",
  },
  {
    label: "Between",
    value: "between",
  },
];

export {
  availableTypeNotification,
  tergetNotificationOption,
  oneTimeScheduledOption,
  recurringOption,
  availableTimezone,
  repeatOption,
  daysOption,
  countryOption,
  languageOption,
  intencityOption,
};
