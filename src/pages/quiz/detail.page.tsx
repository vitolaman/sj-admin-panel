import {
  QuizWithdrawListI,
  QuizWithdrawReqI,
  QuizWithdrawUpdateI,
} from "_interfaces/quiz-withdraw.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { useState } from "react";
import { Button, Dropdown, Modal } from "react-daisyui";
import { FiMoreHorizontal, FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import {
  useQuizUpdateWithdrawStatusMutation,
  useQuizWithdrawListQuery,
} from "services/modules/quiz-withdraw";

export const dqRouteName = ":id/detail";

const DetailQuiz = () => {
  const params = useParams<{ id: string }>();
  const [quizWithdrawParams, setQuizWithdrawParams] =
    useState<QuizWithdrawReqI>({
      page: 1,
      limit: 10,
      search: "",
      status: "",
      quiz_id: params.id!,
    });

  const { data, isLoading, refetch } =
    useQuizWithdrawListQuery(quizWithdrawParams);
  const [update, updateState] = useQuizUpdateWithdrawStatusMutation();
  const [dataUpdate, setDataUpdate] = useState<QuizWithdrawUpdateI>();
  const [openReason, setOpenReason] = useState(false);

  const handlePageChange = (page: number): void => {
    setQuizWithdrawParams((prev) => ({ ...prev, page }));
  };

  const handleUpdateStatus = async () => {
    try {
      if (dataUpdate) {
        await update(dataUpdate).unwrap();
        setOpenReason(false);
        toast.success("Withdraw status updated");
        refetch();
        setDataUpdate(undefined);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const header: Columns<QuizWithdrawListI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "user_seeds_tag",
      label: "SeedsTag",
    },
    {
      fieldId: "quiz_score",
      label: "Score",
    },
    {
      fieldId: "status",
      label: "Winner Status",
      render: (data) => (
        <div
          className={`inline-block bg-${
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
          } px-[6px] rounded-[4px] `}
        >
          <p className="text-sm font-normal font-poppins">
            {data?.status === "SUCCESS" ? "Approved" : data?.status}
          </p>
        </div>
      ),
    },
    {
      fieldId: "description",
      label: "Reject Reason",
      render: (data) => (
        <p>
          {data?.description !== "" && data?.status === "REJECT"
            ? data?.description
            : "-"}
        </p>
      ),
    },
    {
      fieldId: "user_id",
      label: "Action",
      render: (data) => (
        <Dropdown horizontal="left">
          <Dropdown.Toggle size="xs" button={false}>
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal color="#27a590" size={24} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className={`bg-white z-50 ${data?.status === "PENDING" && "w-44"}`}
          >
            {data?.status === "PENDING" && (
              <>
                <Dropdown.Item
                  className="hover:bg-gray-300 font-medium"
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
                  Approve Winner
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-red-500 hover:bg-gray-300 font-medium"
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
                  Reject Winner
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold font-poppins">Quiz Detail</h1>
        <SearchInput
          placeholder="Search"
          onSubmit={({ text }) => {
            setQuizWithdrawParams((prev) => ({ ...prev, search: text }));
          }}
        />
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg z-0">
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
            Math.floor((data?.meta?.total ?? 0) / quizWithdrawParams?.limit) ??
            0
          }
          onPageChange={handlePageChange}
        />
      </div>
      <Modal open={openReason} className="bg-white">
        <Modal.Header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Reason</p>
            <FiX
              className="cursor-pointer"
              onClick={() => {
                setOpenReason(false);
                setDataUpdate(undefined);
              }}
            />
          </div>
          <p className="text-sm font-normal">
            Write the reason why you want to reject this user
          </p>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="w-full h-[160px] p-4 border border-[#BDBDBD] rounded-lg"
            placeholder="Type Reason"
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
          ></textarea>
        </Modal.Body>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpenReason(false);
              setDataUpdate(undefined);
            }}
            loading={updateState.isLoading}
            className="border-seeds text-seeds rounded-full w-[128px] h-[44px]"
          >
            <span>Cancel</span>
          </Button>
          <Button
            loading={updateState.isLoading}
            onClick={handleUpdateStatus}
            disabled={dataUpdate?.reject_reason?.length === 0}
            className={`${
              dataUpdate?.reject_reason?.length === 0
                ? "!bg-[#BDBDBD] !text-white border-none"
                : "bg-seeds  hover:bg-seeds-300"
            }  border-seeds hover:border-seeds-300 text-white rounded-full w-[128px] h-[44px]`}
          >
            <span>Reject</span>
          </Button>
        </Modal.Actions>
      </Modal>
    </ContentContainer>
  );
};

export default DetailQuiz;
