import { EventsRes, GetEventsQuery } from "_interfaces/events.interface";
import { GetXPManagementQuery, XPManagementI, XPManagementRes } from "_interfaces/xp-management.interface";
import { Api } from "services/api";
  
  export const eventsApi = Api.injectEndpoints({
    endpoints: (build) => ({
      getEvents: build.query<EventsRes,GetEventsQuery>({
        query: (params) => ({
          url: `/admin-portal/v1/event/list`,
          params,
        }),
        keepUnusedDataFor: 0,
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useGetEventsQuery } = eventsApi;
  