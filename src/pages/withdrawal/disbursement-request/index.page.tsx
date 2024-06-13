import {
  DisbursementRequestI,
  GetDisbursementRequestQuery,
} from "_interfaces/disbursement-request.interface";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import {
  useGetDisbursementRequestQuery,
  useLazyGetDisbursementRequestQuery,
  useUpdateDisbursementRequestMutation,
} from "services/modules/withdrawal";
import * as XLSX from "xlsx";

export const dRequestRouteName = "disbursement-request";
const DisbursementRequest = () => {
  const [params, setParams] = useState<GetDisbursementRequestQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data, isLoading, refetch } = useGetDisbursementRequestQuery(params);
  const [getAllData] = useLazyGetDisbursementRequestQuery();
  const [updateDisbursementRequestById, updateState] =
    useUpdateDisbursementRequestMutation();
  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleSheetsData = async () => {
    try {
      const sheetsData = await getAllData({
        page: 0,
        limit: 0,
        search: "",
      }).unwrap();

      if (
        sheetsData.configurations &&
        Array.isArray(sheetsData.configurations) &&
        sheetsData.configurations.length > 0
      ) {
        const ws = XLSX.utils.json_to_sheet(sheetsData.configurations);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Disbursement Request Data");

        XLSX.writeFile(wb, "disbursement-request-data.xlsx");
      } else {
        toast.error("Data is undefined or not a valid array.");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (updateState.isSuccess) {
      refetch();
    }
  }, [updateState.isSuccess]);

  const getStatusColor = (
    status: string
  ): { bgColor: string; textColor: string } => {
    if (status === "Approved") {
      return {
        bgColor: "bg-[#DCFCE4]",
        textColor: "text-persian-green",
      };
    } else if (status === "Rejected") {
      return { bgColor: "bg-[#FFEBEB]", textColor: "text-[#BB1616]" };
    } else {
      return {
        bgColor: "bg-[#FFF7D2]",
        textColor: "text-[#D89918]",
      };
    }
  };

  const header: Columns<DisbursementRequestI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Disbursement ID",
    },
    {
      fieldId: "user_id",
      label: "User ID",
    },
    {
      fieldId: "nett_amount",
      label: "Amount",
    },
    {
      fieldId: "payment_method",
      label: "Bank/E-wallet",
      render: (item) => {
        return (
          <span className="uppercase font-poppins font-normal text-sm text-[#201B1C]">
            {item?.payment_method}
          </span>
        );
      },
    },
    {
      fieldId: "account_number",
      label: "Bank Account/PhoneNum",
    },
    {
      fieldId: "status",
      label: "Status",
      render: (item) => {
        const { bgColor, textColor } = getStatusColor(item?.status!);
        return (
          <span
            className={`px-2 py-1 font-poppins rounded-[4px] ${bgColor} ${textColor}`}
          >
            {item?.status}
          </span>
        );
      },
    },
    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <div className="flex gap-2">
          <Button
            loading={updateState.isLoading}
            disabled={
              item?.status === "Approved" || item?.status === "Rejected"
            }
            size="xs"
            className="disabled:bg-[#BDBDBD] disabled:text-white disabled:border-[#BDBDBD] hover:bg-[#3AC4A0] border-[#3AC4A0] rounded-full font-semibold font-poppins text-sm text-white bg-[#3AC4A0]"
            onClick={() => {
              updateDisbursementRequestById({
                id: item?.id!,
                status: "Approved",
              });
            }}
          >
            Approve
          </Button>
          <Button
            loading={updateState.isLoading}
            disabled={
              item?.status === "Approved" || item?.status === "Rejected"
            }
            size="xs"
            className="disabled:bg-[#BDBDBD] disabled:text-white disabled:border-[#BDBDBD] border-[#DD2525] rounded-full font-semibold font-poppins text-sm text-[#DD2525]"
            onClick={() => {
              updateDisbursementRequestById({
                id: item?.id!,
                status: "Rejected",
              });
            }}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];
  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Disbursement Request</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) =>
              setParams((prev) => ({ ...prev, page: 1, search: text }))
            }
          />
          <Button
            shape="circle"
            className="border-seeds hover:border-seeds"
            onClick={handleSheetsData}
          >
            <FiDownload color="#3ac4a0" size={20} />
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<DisbursementRequestI>
          columns={header}
          loading={isLoading}
          data={data?.configurations}
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
export default DisbursementRequest;
