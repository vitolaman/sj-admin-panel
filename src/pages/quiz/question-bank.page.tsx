import { useState, useEffect } from "react";
import {
  FilterQuestionBankI,
  GetQuestionBankQuery,
  QuestionBankI,
  QuestionData,
} from "_interfaces/question-bank.interfaces";
import ContentContainer from "components/container";
import ConfirmationModal from "components/confirmation-modal";
import { Columns, Table } from "components/table/table";
import { Button, FileInput, Modal } from "react-daisyui";
import Select from "components/select";
import { IoClose } from "react-icons/io5";
import { uploadQuizQuestions } from "services/modules/file";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { useAppSelector } from "store";
import { useGetQuizCategoriesQuery } from "services/modules/quiz";
import {
  useGetQuestionBankListQuery,
  useDeleteQuestionBankMutation,
} from "services/modules/quiz";
import Pagination from "components/table/pagination";
import moment from "moment";
import SearchInput from "components/search-input";

export const qbRouteName = "question-bank";
const QuestionBank = () => {
  const [params, setParams] = useState<GetQuestionBankQuery>({
    page: 1,
    limit: 50,
    difficulty: "",
    search: "",
    category: "",
  });
  const [uploadModal, setUploadModal] = useState(false);
  const [questionsFile, setQuestionsFile] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data: dataCategory } = useGetQuizCategoriesQuery(undefined);
  const {
    data: dataQuestion,
    isLoading: loadingQuestion,
    refetch,
  } = useGetQuestionBankListQuery(params);
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const [confirmationSelectedModal, setConfirmationSelectedModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const [deleteQuestionBank] = useDeleteQuestionBankMutation();
  const [filter, setFilter] = useState<FilterQuestionBankI>({
    data: "id",
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (dataQuestion?.data && selectedIds.length === dataQuestion.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dataQuestion?.data?.map((item) => item.id) || []);
    }
  };

  const header: Columns<QuestionBankI>[] = [
    {
      fieldId: "id",
      label: (
        <div onClick={handleSelectAll} style={{ cursor: "pointer" }}>
          {`Select (${selectedIds.length})`}
        </div>
      ),
      render: (data) => (
        <>
          <div>
            <input
              type="checkbox"
              className="scale-150"
              color="primary"
              checked={data ? selectedIds.includes(data.id) : false}
              onClick={() => {
                if (data?.id) {
                  const isSelected = selectedIds.includes(data.id);
                  if (!isSelected) {
                    setSelectedIds((prevIds) => [...prevIds, data.id]);
                  } else {
                    setSelectedIds((prevIds) =>
                      prevIds.filter((id) => id !== data.id)
                    );
                  }
                }
              }}
            />
          </div>
        </>
      ),
    },
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "question",
      label: "Question",
      render: (item) => <>{item?.data[filter.data]?.question}</>,
    },
    {
      fieldId: "category",
      label: "Category",
    },
    {
      fieldId: "difficulty",
      label: "Difficulty",
    },
    {
      fieldId: "language",
      label: "Language",
      render: () => <>{filter.data}</>,
    },
    {
      fieldId: "created_at",
      label: "Uploaded Date",
      render: (item) => (
        <>{moment(item?.created_at!).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) =>
        selectedIds.length > 1 ? (
          <Button
            onClick={() => {
              setConfirmationSelectedModal({ id: data?.id, open: true });
            }}
          >
            Delete Selected
          </Button>
        ) : (
          <Button
            onClick={() => {
              setConfirmationModal({ id: data?.id, open: true });
            }}
          >
            Delete
          </Button>
        ),
    },
  ];

  const categoryOptions = [
    {
      key: 0,
      label: "All Question",
      value: "",
    },
    ...(dataCategory?.data?.map((item, index) => ({
      key: index,
      label: item.name,
      value: item.category_id,
    })) || []),
  ];

  const [langOptions] = useState([
    { key: 0, label: "ID", value: "id" },
    { key: 1, label: "EN", value: "en" },
  ]);

  const uploadQuestions = async () => {
    try {
      setLoadingUpload(true);
      if (questionsFile !== null) {
        const response = await uploadQuizQuestions(accessToken!, questionsFile[0]);
        setUploadModal(false);
        if(response.status === 200){
          toast.success('Upload questions success!')
        } else {
          toast.error('Upload questions failed!')
        }
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
      await deleteQuestionBank(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteSelectedId = async () => {
    try {
      if (selectedIds.length === 0) {
        toast.error("Please select at least one question to delete");
        return;
      }
      await Promise.all(
        selectedIds.map(async (id) => {
          await deleteQuestionBank(id).unwrap();
        })
      );
      setConfirmationSelectedModal({ open: false });
      setSelectedIds([]);
      await refetch();
    } catch (error) {
      errorHandler(error);
    } finally {
      setConfirmationSelectedModal({ open: false });
    }
  };
  
  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-end">
          <div className="w-full flex flex-row gap-5 items-end">
            <div className="max-w-40 min-w-40">
              <label
                htmlFor="category-question-bank"
                className="font-semibold text-[#7C7C7C] mb-3"
              >
                Category Question
              </label>
              <Select
                value={params.category}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, category: e.value }))
                }
                options={categoryOptions}
                rounded={true}
              />
            </div>
            <div className="max-w-24 min-w-24">
              <label
                htmlFor="category-question-bank"
                className="font-semibold text-[#7C7C7C] mb-3"
              >
                Language
              </label>
              <Select
                value={filter.data}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    data: e.value as keyof QuestionData,
                  }))
                }
                options={langOptions}
                rounded={true}
              />
            </div>
          </div>
          <div className="flex justify-end min-w-56 gap-5">
              <SearchInput
                placeholder="Search"
                onSubmit={({ text }) => {
                  setParams((prev) => ({ ...prev, search: text, page:1, limit:50, category:'' }));
                }}
              />
            <Button
              className="border-seeds text-seeds rounded-full px-8"
              onClick={() => {
                setUploadModal(true);
              }}
            >
              Upload Question
            </Button>
          </div>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<QuestionBankI>
            columns={header}
            data={dataQuestion?.data}
            loading={loadingQuestion}
          />
        </div>
        <div className="flex flex-col">
          <Pagination
            currentPage={dataQuestion?.metadata?.current_page ?? 1}
            totalPages={
              Math.ceil((dataQuestion?.metadata?.total ?? 0) / params.limit) ??
              0
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
        title="Delete Question Bank"
        subTitle="Are you sure want to delete this Question?"
      />
      <ConfirmationModal
        isOpen={confirmationSelectedModal.open}
        onClose={() => {
          setConfirmationSelectedModal({ open: false });
        }}
        onConfirm={handleDeleteSelectedId}
        alertType="danger"
        title="Delete Selected Question Bank"
        subTitle="Are you sure want to delete this Selected Question?"
      />

      <Modal className="bg-white w-2/3 max-w-[900px]" open={uploadModal}>
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
            loading={loadingUpload}
            disabled={loadingUpload}
          >
            Cancel
          </Button>
          <Button
            onClick={uploadQuestions}
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            loading={loadingUpload}
            disabled={loadingUpload}
          >
            Upload
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default QuestionBank;
