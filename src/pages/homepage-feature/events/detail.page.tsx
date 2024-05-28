import { EventsI, GetEventsQuery } from "_interfaces/events.interface";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useRef, useState } from "react";
import { Button } from "react-daisyui";
import { useParams } from "react-router-dom";
import {
  useGetEventByIdQuery,
  useGetEventsQuery,
} from "services/modules/events";
import ScanInput from "./sections/scanInput.section";
import QrScanner from "qr-scanner";
import ScanModal from "./sections/scanModal.section";

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
  const { data, isLoading, refetch } = useGetEventsQuery(params);
  const { data: detailData } = useGetEventByIdQuery(paramsList.id!);

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleResult = async (result: QrScanner.ScanResult) => {
    setScanResult({ open: false, result: result.data });
    await scanner?.current?.stop();
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
  ];
  return (
    <ContentContainer>
      <ScanModal open={scanResult.open} videoRef={videoRef} divRef={divRef} />
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col justify-between gap-4">
          <h1 className="font-semibold md:text-2xl text-lg font-poppins">
            Scan Ticket
          </h1>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <ScanInput
              placeholder="Input Code"
              formClassName="w-full"
              className="w-full"
              value={scanResult.result!}
            />

            <Button
              className="border-seeds text-seeds rounded-full lg:px-10 font-semibold font-poppins md:text-base text-sm"
              onClick={async () => {
                setScanResult((prev) => ({ ...prev, open: !scanResult.open }));
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
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
            {detailData?.name}
          </h1>
          <SearchInput
            placeholder="Search"
            formClassName="w-full lg:w-fit"
            className="w-full"
          />
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
    </ContentContainer>
  );
};

export default DetailEvent;
