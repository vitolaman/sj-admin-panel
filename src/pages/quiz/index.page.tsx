import { GetQuizQuery, QuizI } from "_interfaces/quiz.interfaces";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { Button, Dropdown } from "react-daisyui";
import { FiEdit, FiFileText, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "services/errorHandler";
import {
  useDeleteQuizMutation,
  useGetQuizListQuery,
  usePriorityQuizMutation,
} from "services/modules/quiz";

export const qlRouteName = "";
const QuizList = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<GetQuizQuery>({
    page: 1,
    limit: 10,
    search: "",
    category: "",
  });
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const { data, isLoading, refetch } = useGetQuizListQuery(params);
  const [deleteQuiz] = useDeleteQuizMutation();
  const [setPrioritQuiz] = usePriorityQuizMutation();
  const updatePriority = async (
    id: string,
    priority: boolean
  ): Promise<void> => {
    try {
      await setPrioritQuiz({ id, priority: !priority });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };
  const header: Columns<QuizI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "is_recommended",
      label: "Priority Quiz",
      render: (data) => (
        <>
          <div
            onClick={async () => {
              await updatePriority(
                data?.id as string,
                data?.is_recommended as boolean
              );
            }}
          >
            <input
              id={data?.id}
              type="checkbox"
              className="scale-150"
              checked={data?.is_recommended}
              color="primary"
            />
          </div>
        </>
      ),
    },
    {
      fieldId: "name",
      label: "Quiz Name",
    },
    {
      fieldId: "category",
      label: "Category Quiz",
    },
    {
      fieldId: "questions",
      label: "Set Quiz",
    },
    {
      fieldId: "participants",
      label: "Participants",
    },
    {
      fieldId: "created_at",
      label: "Created At",
      render: (data) => (
        <>{moment(data?.created_at!).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "started_at",
      label: "Play Date",
      render: (data) => (
        <>{moment(data?.started_at!).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "ended_at",
      label: "End Date",
      render: (data) => (
        <>{moment(data?.ended_at!).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <Dropdown horizontal="left">
          <Dropdown.Toggle size="xs" button={false}>
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal color="#27a590" size={24} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-36 bg-white z-50 -translate-y-16">
            <Dropdown.Item
              className="font-medium hover:bg-gray-300"
              onClick={() => {
                navigate(`/quiz/${data?.id}/edit`);
              }}
            >
              <FiEdit /> Edit
            </Dropdown.Item>
            {data?.status === "ENDED" && (
              <Dropdown.Item
                className="font-medium hover:bg-gray-300"
                onClick={() => {
                  navigate(`/quiz/${data?.id}/detail`);
                }}
              >
                <FiFileText /> Detail
              </Dropdown.Item>
            )}
            <Dropdown.Item
              className="font-medium text-red-500 hover:bg-gray-300"
              onClick={() => {
                setConfirmationModal({ id: data?.id, open: true });
              }}
            >
              <FiTrash2 />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleDelete = async () => {
    try {
      await deleteQuiz(confirmationModal.id!);
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Quiz List</h1>
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
                navigate("/quiz/create");
              }}
            >
              Create Quiz
            </Button>
          </div>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<QuizI>
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
      <ConfirmationModal
        isOpen={confirmationModal.open}
        onClose={() => {
          setConfirmationModal({ open: false });
        }}
        onConfirm={handleDelete}
        alertType="danger"
        title="Delete Quiz"
        subTitle="Are you sure want to delete this Quiz?"
      />
    </>
  );
};

export default QuizList;
