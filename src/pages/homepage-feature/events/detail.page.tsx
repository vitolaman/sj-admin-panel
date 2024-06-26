import { EventDetailI, GetEventsQuery } from "_interfaces/events.interface";
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
} from "services/modules/events";
import QrScanner from "qr-scanner";
import ScanModal from "./sections/scanModal.section";
import MInput from "components/multi-input/index";
import useCreateCheckIn from "hooks/events/useCreateCheckIn";

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
  const { handleCreate, register, errors, loading, setValue, trigger } =
    useCreateCheckIn();
  const { data, isLoading, refetch } = useGetEventDetailQuery({
    id: paramsList.id!,
    params,
  });
  const { data: detailData } = useGetEventByIdQuery(paramsList.id!);

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
        <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
          {item?.name?.length! < 50
            ? item?.name
            : `${item?.name.substring(0, 50)}...`}
        </p>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 font-poppins rounded-[4px] bg-[#DCFCE4] text-persian-green !capitalize`}
        >
          {item?.status.replace("_", " ").toLowerCase()}
        </span>
      ),
    },
    {
      fieldId: "updated_at",
      label: "Last Update",
      render: (item) => {
        const convertDate = new Date(item?.updated_at!).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );
        const [month, day, year] = convertDate.split(" ");
        const hours = new Date(item?.updated_at!)
          .getHours()
          .toString()
          .padStart(2, "0");
        const minutes = new Date(item?.updated_at!)
          .getMinutes()
          .toString()
          .padStart(2, "0");
        return (
          <p className="text-left font-normal font-poppins text-sm text-[#201B1C]">
            {`${day.replace(",", "")} ${month} ${year} ${hours}:${minutes}`}
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
        <div className="w-full flex flex-col justify-between gap-4">
          <h1 className="font-semibold md:text-2xl text-lg font-poppins">
            Scan Ticket
          </h1>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <MInput
              label=""
              placeholder="Input Code"
              registerName="ticket_code"
              type="text"
              register={register}
              errors={errors}
              className="rounded-full"
            />
            <div className="flex flex-col md:flex-row gap-3 md:pt-2">
              <Button
                loading={loading}
                className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10 font-semibold font-poppins md:text-base text-sm w-full md:w-fit"
                onClick={async (e) => {
                  const status = await trigger();
                  if (status) {
                    await handleCreate(e);
                    refetch();
                  }
                }}
              >
                Enter
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
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
            {detailData?.name}
          </h1>
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
