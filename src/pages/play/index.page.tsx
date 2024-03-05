import { PlayI, PlayReq } from "_interfaces/play.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { usePlayListQuery } from "services/modules/play";

export const playRouteName = "";
const Play = () => {
  const [params, setParams] = useState<PlayReq>({
    search: "",
    type: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = usePlayListQuery(params);
  const navigate = useNavigate();

  const header: Columns<PlayI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "type",
      label: "Type",
    },
    {
      fieldId: "play_id",
      label: "ID Play Arena",
    },
    {
      fieldId: "name",
      label: "Play Arena Name",
    },
    {
      fieldId: "category",
      label: "Category",
    },
    {
      fieldId: "play_time",
      label: "Play Time",
      render: (data) => (
        <>{moment(data?.play_time).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "end_time",
      label: "End Date",
      render: (data) => (
        <>{moment(data?.end_time).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "participants",
      label: "Participant",
      render: (data) => <>{data?.participants?.length}</>,
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <span
          className={`${
            data?.status === "ACTIVE"
              ? "bg-[#DCFCE4] text-[#27A590]"
              : data?.status === "OPEN"
              ? "bg-[#FFF7D2] text-[#D89918]"
              : data?.status === "PAST"
              ? "bg-[#E9E9E9] text-[#7C7C7C]"
              : data?.status === "CANCELED"
              ? "bg-[#FFEBEB] text-[#BB1616]"
              : "bg-[#EDFCD3] text-[#378D12]"
          }
            inline-flex items-center rounded px-2 py-1 text-sm`}
        >
          {data?.status === "PUBLISH"
            ? "Published"
            : data?.status === "ACTIVE"
            ? "In Game"
            : data?.status === "PAST"
            ? "Ended"
            : data?.status === "OPEN"
            ? "Waiting"
            : data?.status === "CANCELED"
            ? "Cancelled"
            : "Published"}
        </span>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Play Arena List</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) => {
              setParams((prev) => ({ ...prev, search: text }));
            }}
          />
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            onClick={() => {
              navigate("/play/create");
            }}
          >
            Create New Game
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Table<PlayI>
          columns={header}
          data={data?.playList}
          loading={isLoading}
          onRowClick={(item) => navigate(`/play/${item.id}/detail`)}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.currentPage ?? 1}
          totalPages={data?.metadata?.totalPage ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default Play;
