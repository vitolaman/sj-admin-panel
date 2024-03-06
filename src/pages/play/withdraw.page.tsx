import {
  PlayWithdrawReq,
  WithDrawListI,
  WithdrawUpdateI,
} from "_interfaces/play-withdraw.interfaces";
import classNames from "classnames";
import ContentContainer from "components/container";
import CInput from "components/input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button, Dropdown, Modal } from "react-daisyui";
import { FaEllipsisH } from "react-icons/fa";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import {
  useUpdateWithdrawStatusMutation,
  useWithdrawListQuery,
} from "services/modules/play-withdraw";

export const wpRouteName = "withdraw";
const WithdrawPlay = () => {
  const [params, setParams] = useState<PlayWithdrawReq>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, refetch } = useWithdrawListQuery(params);
  const [update, updateState] = useUpdateWithdrawStatusMutation();
  const [dataUpdate, setDataUpdate] = useState<WithdrawUpdateI>();
  const [openReason, setOpenReason] = useState(false);

  const handleUpdate = async () => {
    try {
      if (dataUpdate) {
        await update(dataUpdate);
        setOpenReason(false);
        toast("Withdraw status updated!");
        refetch();
        setDataUpdate(undefined);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const header: Columns<WithDrawListI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "rank",
      label: "Rangking",
    },
    {
      fieldId: "play_name",
      label: "Arena Game",
    },
    {
      fieldId: "user_name",
      label: "Name",
    },
    {
      fieldId: "gnl_percentage",
      label: "Gain / Loss",
      render: (data) => (
        <div className="flex items-center justify-center gap-2">
          <span
            className={classNames(
              data?.gnl_percentage! > 0 ? "text-[#4DA81C]" : "text-[#DD2525]",
            )}
          >
            {data?.gnl_percentage! > 0 && "+"}
            {data?.gnl_percentage!.toFixed(2)}
            {"%"}
          </span>
          {data?.gnl_percentage! > 0 ? (
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1070_7989)">
                <path
                  d="M15.5837 4L9.25033 10.3333L5.91699 7L0.916992 12"
                  stroke="#4DA81C"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.583 4H15.583V8"
                  stroke="#4DA81C"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1070_7989">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.25)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1070_3063)">
                <path
                  d="M15.5837 12L9.25033 5.66667L5.91699 9L0.916992 4"
                  stroke="#DD2525"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.583 12H15.583V8"
                  stroke="#DD2525"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1070_3063">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.25)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      ),
    },
    {
      fieldId: "amount",
      label: "Winner",
    },
    {
      fieldId: "method",
      label: "Cashout Method",
    },
    {
      fieldId: "account_name",
      label: "Account Name",
    },
    {
      fieldId: "account_number",
      label: "Account Number",
    },
    {
      fieldId: "user_id",
      label: "Action",
      render: (data) => (
        <Dropdown horizontal="left">
          <Dropdown.Toggle>
            <FaEllipsisH />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-52 bg-white z-50">
            <Dropdown.Item
              onClick={() => {
                setDataUpdate({
                  play_id: data?.play_id!,
                  user_id: data?.user_id!,
                  status: "SUCCESS",
                  reject_reason: "",
                });
                handleUpdate();
              }}
            >
              Accept
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setDataUpdate({
                  play_id: data?.play_id!,
                  user_id: data?.user_id!,
                  status: "REJECT",
                  reject_reason: "",
                });
                setOpenReason(true);
              }}
            >
              Reject
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <div
          className={`bg-${
            data?.status === "PENDING"
              ? "[#FFF7D2]"
              : data?.status === "SUCCESS"
              ? "[#DCFCE4]"
              : data?.status === "REJECT"
              ? "[#FFEBEB]"
              : "[#FFF7D2]"
          } text-${
            data?.status === "PENDING"
              ? "[#D89918]"
              : data?.status === "SUCCESS"
              ? "[#27A590]"
              : "REJECT"
              ? "[#BB1616]"
              : "[#D89918]"
          } px-[4px] rounded-[4px]`}
        >
          <h1>{data?.status}</h1>
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Withdraw</h1>
        </div>
        <div className="mt-4">
          <Table<WithDrawListI>
            columns={header}
            data={data?.data}
            loading={isLoading}
          />
        </div>
        <div className="flex flex-col">
          <Pagination
            currentPage={data?.meta?.page ?? 1}
            totalPages={
              Math.floor((data?.meta?.total ?? 0) / params.limit) ?? 0
            }
            onPageChange={handlePageChange}
          />
        </div>
      </ContentContainer>
      <Modal
        open={openReason}
        className="bg-white"
      >
        <Modal.Header>Reject Reason</Modal.Header>
        <Modal.Body>
          <CInput
            type="text"
            value={dataUpdate?.reject_reason}
            onChange={(e) => {
              setDataUpdate((prev) => {
                if (prev) {
                  return { ...prev, reject_reason: e.target.value };
                } else {
                  return undefined;
                }
              });
            }}
          />
        </Modal.Body>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpenReason(false);
              setDataUpdate(undefined);
            }}
            loading={updateState.isLoading}
            className="border-seeds text-seeds"
          >
            <span>Cancel</span>
          </Button>
          <Button
            loading={updateState.isLoading}
            onClick={handleUpdate}
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white"
          >
            <span>Confirm</span>
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default WithdrawPlay;
