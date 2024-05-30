import { rupiahFormatter } from "_helper/formatters";
import {
  QuizWithdrawListI,
  QuizWithdrawReqI,
  QuizWithdrawUpdateI,
} from "_interfaces/quiz-withdraw.interfaces";
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
  useQuizUpdateWithdrawStatusMutation,
  useQuizWithdrawListQuery,
} from "services/modules/quiz-withdraw";

export const withdrawQuizRouteName = "withdraw";
const WithdrawQuiz = () => {
  const [params, setParams] = useState<QuizWithdrawReqI>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, refetch } = useQuizWithdrawListQuery(params);
  const [update, updateState] = useQuizUpdateWithdrawStatusMutation();
  const [dataUpdate, setDataUpdate] = useState<QuizWithdrawUpdateI>();
  const [openReason, setOpenReason] = useState(false);

  const handleUpdateStatus = async () => {
    try {
      if (dataUpdate) {
        await update(dataUpdate).unwrap();
        setOpenReason(false);
        toast("Withdraw status updated");
        refetch();
        setDataUpdate(undefined);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const header: Columns<QuizWithdrawListI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "rank",
      label: "Rank",
    },
    {
      fieldId: "user_name",
      label: "Username",
    },
    {
      fieldId: "quiz_name",
      label: "Quiz Name",
    },
    {
      fieldId: "amount",
      label: "Amount",
      render: (data) => <p>Rp. {rupiahFormatter(data?.amount)}</p>,
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
              className="hover:bg-green-500 hover:text-white"
              onClick={() => {
                setDataUpdate({
                  quiz_id: data?.quiz_id!,
                  user_id: data?.user_id!,
                  status: "SUCCESS",
                  reject_reason: "",
                });
                handleUpdateStatus();
              }}
            >
              Accept
            </Dropdown.Item>
            <Dropdown.Item
              className="hover:bg-red-500 hover:text-white"
              onClick={() => {
                setDataUpdate({
                  quiz_id: data?.quiz_id!,
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

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Quiz Withdrawal</h1>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<QuizWithdrawListI>
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
      <Modal open={openReason} className="bg-white">
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
            onClick={handleUpdateStatus}
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white"
          >
            <span>Confirm</span>
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default WithdrawQuiz;
