import { EventsI, GetEventsQuery } from "_interfaces/events.interface";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button, Dropdown } from "react-daisyui";
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "services/errorHandler";
import {
  useDeleteEventsMutation,
  useGetEventsQuery,
} from "services/modules/events";

export const eventsRouteName = "events";
const Events = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<GetEventsQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading, refetch } = useGetEventsQuery(params);
  const [deleteEventById] = useDeleteEventsMutation();
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleDelete = async () => {
    try {
      await deleteEventById(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
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
      fieldId: "",
      label: "Is Paid Event",
      render: (item) => (
        <span
          className={`px-2 py-1 font-poppins rounded-[4px] ${
            item?.is_liked
              ? "bg-[#DCFCE4] text-persian-green"
              : "bg-[#FFEBEB] text-[#BB1616]"
          }`}
        >
          {item?.is_liked ? "Yes" : "No"}
        </span>
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
    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <Dropdown horizontal="left" vertical="top">
          <Dropdown.Toggle size="xs">
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white z-10 w-[150px] rounded-[10px] flex flex-col gap-2">
            <Dropdown.Item className="p-0">
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
                startIcon={<FiEdit color="#201B1C" size={20} />}
                onClick={() => {
                  navigate(`/homepage-feature/events/${item?.id}/edit`);
                }}
              >
                Edit Event
              </Button>
            </Dropdown.Item>
            <Dropdown.Item className="p-0">
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
                startIcon={<FiSearch color="#201B1C" size={20} />}
              >
                Detail Event
              </Button>
            </Dropdown.Item>
            <Dropdown.Item className="p-0">
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#FF3838]"
                startIcon={<FiTrash2 color="#FF3838" size={20} />}
                onClick={() => {
                  setConfirmationModal({ id: item?.id, open: true });
                }}
              >
                Delete Event
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  return (
    <ContentContainer>
      <ConfirmationModal
        isOpen={confirmationModal.open}
        onClose={() => {
          setConfirmationModal({ open: false });
        }}
        onConfirm={handleDelete}
        alertType="delete"
        title="Delete Event"
        subTitle="Are you sure want to delete this event?"
        yesText="Delete"
        noText="Cancel"
      />
      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
        <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
          List Events
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <SearchInput
            placeholder="Search"
            disabled={true}
            formClassName="bg-[#F5F5F5]"
          />
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            onClick={() => {
              navigate("/homepage-feature/events/create");
            }}
          >
            Add Event
          </Button>
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
