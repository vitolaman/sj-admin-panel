import { GetQuizQuery, QuizI } from "_interfaces/quiz.interfaces";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { Button, Dropdown, FileInput, Modal } from "react-daisyui";
import { FaEllipsisH } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { uploadQuizQuestions } from "services/modules/file";
import {
  useDeleteQuizMutation,
  useGetQuizListQuery,
} from "services/modules/quiz";
import { useAppSelector } from "store";

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
  const [uploadModal, setUploadModal] = useState(false);
  const [questionsFile, setQuestionsFile] = useState<FileList | null>(null);
  const [loadingUplaod, setLoadingUpload] = useState(false);
  const { data, isLoading, refetch } = useGetQuizListQuery(params);
  const [deleteQuiz, deleteQuizState] = useDeleteQuizMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

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
              // await updatePriority(data.id, isRecommend);
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
          <Dropdown.Toggle>
            <FaEllipsisH />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-52 bg-white z-50">
            <Dropdown.Item
              onClick={() => {
                navigate(`/quiz/${data?.id}/edit`);
              }}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setConfirmationModal({ id: data?.id, open: true });
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const uploadQuestions = async () => {
    try {
      setLoadingUpload(true);
      if (questionsFile) {
        await uploadQuizQuestions(accessToken!, questionsFile[0]);
        setUploadModal(false);
      } else {
        toast.error("Please choose questions file");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingUpload(false);
    }
  };

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
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setUploadModal(true);
              }}
            >
              Upload Questions
            </Button>
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

      {/* Upload Questions Modal */}
      <Modal
        className="bg-white w-2/3 max-w-[900px]"
        open={uploadModal}
      >
        <Modal.Header className="flex flex-row justify-between">
          Upload Questions
          <IoClose
            onClick={() => {
              setUploadModal(false);
            }}
          />
        </Modal.Header>
        <Modal.Body className="overflow-scroll">
          <div className="w-full border-seeds rounded-xl border py-40 flex items-center justify-center">
            <FileInput
              onChange={(e) => setQuestionsFile(e.target.files)}
              className="border-seeds"
              size="sm"
              accept=".csv"
            />
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            type="reset"
            className="border-seeds text-seeds rounded-full px-10"
            onClick={() => {
              setUploadModal(false);
            }}
            loading={loadingUplaod}
            disabled={loadingUplaod}
          >
            Cancel
          </Button>
          <Button
            onClick={uploadQuestions}
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            loading={loadingUplaod}
            disabled={loadingUplaod}
          >
            Upload
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default QuizList;
