import {
  EventDetailI,
  EventDetailRes,
  GetEventsQuery,
} from "_interfaces/events.interface";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-daisyui";
import { useParams } from "react-router-dom";
import {
  useGetEventByIdQuery,
  useGetEventDetailQuery,
  useLazyGetEventDetailQuery,
} from "services/modules/events";
import QrScanner from "qr-scanner";
import ScanModal from "./sections/scanModal.section";
import MInput from "components/multi-input/index";
import useCreateCheckInOut from "hooks/events/useCreateCheckInOut";
import CSVDownload from "components/csv-download-button";
import { errorHandler } from "services/errorHandler";

export const dEventsRouteName = "events/:id/detail";
const DetailEvent = () => {
  const paramsList = useParams();
  const scanner = useRef<QrScanner>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [scanResult, setScanResult] = useState<{
    result?: string;
    open: boolean;
  }>({ open: false });
  const [params, setParams] = useState<GetEventsQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const {
    handleCheckIn,
    handleCheckOut,
    register,
    errors,
    loading,
    setValue,
    trigger,
  } = useCreateCheckInOut();
  const { data, isLoading, refetch } = useGetEventDetailQuery({
    id: paramsList.id!,
    params,
  });
  const [getEventDetail, dataEventDetail] = useLazyGetEventDetailQuery();
  const { data: detailData } = useGetEventByIdQuery(paramsList.id!);
  const getStatusColor = (
    is_active: boolean
  ): { bgColor: string; textColor: string } => {
    if (is_active) {
      return {
        bgColor: "bg-[#DCFCE4]",
        textColor: "text-persian-green",
      };
    } else {
      return {
        bgColor: "bg-[#FFF7D2]",
        textColor: "text-[#D89918]",
      };
    }
  };

  const handleGetData = async () => {
    try {
      await getEventDetail({
        id: paramsList.id!,
        params: {
          page: 0,
          limit: 0,
          search: "",
        },
      }).unwrap();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDate = (time: string) => {
    const convertDate = new Date(time).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const [month, day, year] = convertDate.split(" ");
    const hours = new Date(time).getHours().toString().padStart(2, "0");
    const minutes = new Date(time).getMinutes().toString().padStart(2, "0");
    return { day, month, year, hours, minutes };
  };

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleResult = async (result: QrScanner.ScanResult) => {
    setScanResult({ open: false, result: result.data });
    await scanner?.current?.stop();
  };

  useEffect(() => {
    setValue("ticket_code", scanResult.result!);
  }, [scanResult.result]);

  const header: Columns<EventDetailI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "ticket_code",
      label: "Ticket ID",
    },
    {
      fieldId: "name",
      label: "Name",
      render: (item) => (
        <p className="text-center font-normal font-poppins text-sm text-[#201B1C]">
          {item?.name?.length! < 50
            ? item?.name
            : `${item?.name.substring(0, 50)}...`}
        </p>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (item) => {
        const { bgColor, textColor } = getStatusColor(
          item?.status !== "CHECKED_OUT"
        );
        return (
          <span
            className={`px-2 py-1 font-poppins rounded-[4px] ${bgColor} ${textColor} !capitalize`}
          >
            {item?.status.replace("_", " ").toLowerCase()}
          </span>
        );
      },
    },
    {
      fieldId: "check_in_time",
      label: "Check In",
      render: (item) => {
        const { day, month, year, hours, minutes } = handleDate(
          item?.check_in_time!
        );
        return (
          <p className="text-center font-normal font-poppins text-sm text-[#201B1C]">
            {`${day.replace(",", "")} ${month} ${year} ${hours}:${minutes}`}
          </p>
        );
      },
    },
    {
      fieldId: "check_out_time",
      label: "Check Out",
      render: (item) => {
        const { day, month, year, hours, minutes } = handleDate(
          item?.check_out_time!
        );
        return (
          <p className="text-center font-normal font-poppins text-sm text-[#201B1C]">
            {item?.check_out_time === "0001-01-01T00:00:00Z" ? '-' : `${day.replace(",", "")} ${month} ${year} ${hours}:${minutes}`}
          </p>
        );
      },
    },
  ];
  return (
    <ContentContainer>
      <ScanModal
        open={scanResult.open}
        videoRef={videoRef}
        divRef={divRef}
        scanner={scanner}
        setScanResult={setScanResult}
      />
      <div className="flex flex-col gap-6">
        {detailData?.event_status === "OFFLINE" && (
          <div className="w-full flex flex-col justify-between gap-4">
            <h1 className="font-semibold md:text-2xl text-lg font-poppins">
              Scan Ticket
            </h1>

            <div className="flex flex-col lg:flex-row gap-3 w-full">
              <div className="w-full lg:w-5/12 xl:w-full">
                <MInput
                  placeholder="Input Code"
                  registerName="ticket_code"
                  type="text"
                  register={register}
                  errors={errors}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full justify-end">
                <Button
                  loading={loading}
                  className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10 font-semibold font-poppins md:text-base text-sm w-full md:w-fit"
                  onClick={async (e) => {
                    const status = await trigger();
                    if (status) {
                      await handleCheckIn(e);
                      refetch();
                    }
                  }}
                >
                  Check In
                </Button>
                <Button
                  loading={loading}
                  className="bg-[#FF3838] hover:bg-[#FF3838]/75 border-[#FF3838] hover:border-[#FF3838]/75 text-white rounded-full px-10 font-semibold font-poppins md:text-base text-sm w-full md:w-fit"
                  onClick={async (e) => {
                    const status = await trigger();
                    if (status) {
                      await handleCheckOut(e);
                      refetch();
                    }
                  }}
                >
                  Check Out
                </Button>
                <Button
                  className="border-seeds text-seeds rounded-full px-10 font-semibold font-poppins md:text-base text-sm w-full md:w-fit"
                  onClick={async () => {
                    setScanResult({ open: !scanResult.open });
                    await scanner?.current?.start();
                    if (videoRef?.current && !scanner.current) {
                      scanner.current = new QrScanner(
                        videoRef?.current,
                        handleResult,
                        {
                          preferredCamera: "environment",
                          highlightScanRegion: true,
                          highlightCodeOutline: true,
                          overlay: divRef?.current || undefined,
                        }
                      );
                      await scanner?.current?.start();
                    }
                  }}
                >
                  Scan
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
            {detailData?.name}
          </h1>
          <div className="flex flex-row gap-3 w-full lg:w-fit">
            <SearchInput
              placeholder="Search"
              formClassName="w-full lg:w-fit"
              className="w-full"
              onSubmit={({ text }) =>
                setParams((prev) => ({
                  ...prev,
                  page: 1,
                  search: text,
                }))
              }
            />
            <CSVDownload<EventDetailI[]>
              data={dataEventDetail.currentData?.data!}
              onClick={handleGetData}
              fileName={`${detailData?.name
                .toLowerCase()
                .replace(/ /g, "_")}_event_participant_data`}
              bookName="Event Participant Data"
            />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<EventDetailI>
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
    </ContentContainer>
  );
};

export default DetailEvent;
