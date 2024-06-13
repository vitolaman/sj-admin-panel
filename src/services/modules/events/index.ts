import {
  EventsFormDataI,
  EventsI,
  EventsRes,
  GetEventsQuery,
} from "_interfaces/events.interface";
import { Api } from "services/api";

export const eventsApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<EventsRes, GetEventsQuery>({
      query: (params) => ({
        url: `/admin-portal/v1/event/list`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),
    getEventById: build.query<EventsI, string>({
      query: (id) => `/admin-portal/v1/event/${id}`,
      keepUnusedDataFor: 0,
    }),
    updateEvents: build.mutation<void, { id: string; body: EventsFormDataI }>({
      query({ id, body }) {
        return {
          url: `/admin-portal/v1/event/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    createEvents: build.mutation<void, EventsFormDataI>({
      query(body) {
        return {
          url: `/admin-portal/v1/event/create`,
          method: "POST",
          body,
        };
      },
    }),
    deleteEvents: build.mutation<void, string>({
      query(id) {
        return {
          url: `/admin-portal/v1/event`,
          method: "DELETE",
          body: { event_id: id },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventsMutation,
  useCreateEventsMutation,
  useDeleteEventsMutation,
} = eventsApi;
