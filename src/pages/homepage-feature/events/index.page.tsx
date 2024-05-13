import { EventsI, GetEventsQuery } from "_interfaces/events.interface";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { useGetEventsQuery } from "services/modules/events";

export const eventsRouteName = "events";
const Events = () => {
  const [params, setParams] = useState<GetEventsQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading, refetch } = useGetEventsQuery(params);

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const header: Columns<EventsI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Event Name",
      render: (item) => (
        <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
          {item?.name?.length! < 50
            ? item?.name
            : `${item?.name.substring(0, 50)}...`}
        </p>
      ),
    },
    {
      fieldId: "event_date",
      label: "Event Date",
      render: (item) => {
        const convertDate = new Date(item?.event_date!).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        return (
          <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
            {`${convertDate.split(",")[0].split(" ").reverse().join(" ")} ${
              convertDate.split(",")[1]
            }`}
          </p>
        );
      },
    },
  ];
  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">ListEvents</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            disabled={true}
            formClassName="bg-[#F5F5F5]"
          />
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<EventsI>
          columns={header}
          loading={isLoading}
          data={data?.data}
          currentPage={params.page}
          limit={params.limit}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.current_page ?? 1}
          totalPages={
            Math.ceil((data?.metadata?.total ?? 0) / params.limit) ?? 0
          }
          onPageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default Events;
