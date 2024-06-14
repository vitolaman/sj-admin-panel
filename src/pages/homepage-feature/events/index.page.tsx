import { EventsI, GetEventsQuery } from "_interfaces/events.interface";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import CreateEventModal from "components/events";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Button, Dropdown, Modal } from "react-daisyui";
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "services/errorHandler";
import {
  useDeleteEventsMutation,
  useGetEventsQuery,
} from "services/modules/events";
import { setStatusState } from "store/events/statusSlice";

export const eventsRouteName = "events";
const Events = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params, setParams] = useState<GetEventsQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading, refetch } = useGetEventsQuery(params);
  dispatch(setStatusState("OFFLINE"))
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
      label: "Category",
      render: (item) => (
        <span
          className={`px-2 py-1 font-poppins rounded-[4px] ${
            ((item?.event_price ?? 0) === 0)
              ? "bg-[#EDE3FE] text-[#7555DA]"
              : "bg-[#DCFCE4] text-[#27A590]"
          }`}
        >
          {((item?.event_price ?? 0) === 0) ? "Free" : "Paid"}
        </span>
      ),
    },
    {
      fieldId: "",
      label: "Event Type",
      render: (item) => (
        <span
          className={`px-2 py-1 font-poppins`}
        >
          {
            ((item?.event_status ?? '') === '') ?
              '-' : capitalizeFirstLetter(item?.event_status ?? '')
          }
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
        <Dropdown className="relative">
          <Dropdown.Toggle size="xs">
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="absolute right-10 top-3/4 -translate-y-3/4 bg-white z-10 w-[150px] rounded-[10px] flex flex-col gap-2">
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
                onClick={() => {
                  navigate(`/homepage-feature/events/${item?.id}/detail`);
                }}
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
  
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleShowDialog = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleCloseDialog = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);
  
  const ForwardedRefCreateEventModal = forwardRef(CreateEventModal);

  const capitalizeFirstLetter = (str: string): string => {
    let lowerCaseWords = str.toLowerCase();
    let words = lowerCaseWords.split(' ');
    let capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }

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
      <div className="flex flex-col gap-6">
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
              onClick={handleShowDialog}
            >
              Add Event
            </Button>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
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
      </div>

      <ForwardedRefCreateEventModal
        ref={modalRef}
        handleClose={handleCloseDialog}
      />
    </ContentContainer>
  );
};

export default Events;
