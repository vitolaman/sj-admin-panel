// import { type CircleProps } from "@/utils/interfaces/Circle.interface";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  CircleDetailType,
  ListMemberCircleReq,
} from "_interfaces/circle.interface";
import DetailAndStatus from "components/circle/DetailAndStatus";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Table } from "components/table/table";
import { useState } from "react";
import { Loading } from "react-daisyui";
import { useParams } from "react-router-dom";
import {
  useCircleDetailQuery,
  useListMemberQuery,
} from "services/modules/circle";

export const circleDetailRouteName = "circle-detail/:id";
const CircleDetail = (): React.ReactElement => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useCircleDetailQuery({
    id: id as string,
  });
  const [filter, setFilter] = useState<ListMemberCircleReq>({
    circle_id: id as string,
    limit: 10,
    page: 1,
  });
  // const listMember = useListMemberQuery(filter);

  if (isLoading)
    return (
      <div className="fixed left-1/2 top-1/2">
        <Loading />
      </div>
    );
  const handlePageChange = (page: number): void => {
    setFilter({ ...filter, page });
  };
  const header = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "user",
      fieldId2: "username",
      label: "User",
    },
    {
      fieldId: "role",
      label: "Role",
    },
    {
      fieldId: "activity",
      label: "Activity",
    },
    {
      fieldId: "time",
      label: "Time",
    },
  ];

  interface DataUserProp {
    user: string;
    username: string;
    role: string;
    activity: string;
    time: string;
  }

  const userDetail: DataUserProp[] = [
    {
      user: "fajar",
      username: "@fajar",
      role: "Non-Member",
      activity: "Upvote Circle",
      time: "10/10/2022",
    },
    {
      user: "Rudi",
      username: "@rudi",
      role: "Member",
      activity: "Create Post",
      time: "10/09/2022",
    },
    {
      user: "Bayu",
      username: "@bayu",
      role: "Administrator  ",
      activity: "Like Post",
      time: "09/09/2022",
    },
  ];
  return (
    <div>
      <DetailAndStatus
        dataCircle={data?.data as CircleDetailType}
        refetch={refetch}
      />
      <section className=" font-poppins">
        <div className=" p-6">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Activity History</h1>
            <div className="flex justify-end gap-3">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setFilter((prev) => ({ ...prev, search: text }));
                }}
              />
              <button className="border border-green-300 p-1 rounded-full h-11 w-11 hover:shadow-lg">
                <FunnelIcon className="h-5 w-5 m-2 text-green-300" />
              </button>
            </div>
          </div>
          <div className="mt-6 border border-gray-400">
            <Table<DataUserProp[]>
              columns={header}
              data={userDetail}
              loading={isLoading}
            />
          </div>
          <Pagination
            currentPage={filter.page}
            totalPages={filter.limit}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default CircleDetail;
