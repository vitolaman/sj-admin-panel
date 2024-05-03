import { useState, useEffect } from "react";
import {
  FilterQuestionBankI,
  QuestionBankI,
} from "_interfaces/question-bank.interfaces";
import ContentContainer from "components/container";
import { Columns, Table } from "components/table/table";
import { Button, Dropdown, FileInput, Modal } from "react-daisyui";
import { FaEllipsisH } from "react-icons/fa";
import Select from "components/select";
import { IoClose } from "react-icons/io5";
import { uploadQuizQuestions } from "services/modules/file";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { useAppSelector } from "store";

export const qbRouteName = "question-bank";
const QuestionBank = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [questionsFile, setQuestionsFile] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);
  const header: Columns<QuestionBankI>[] = [
    {
      fieldId: "is_selected",
      label: "Select",
      render: (data) => (
        <>
          <div
          // onClick={async () => {
          //   await updatePriority(
          //     data?.id as string,
          //     data?.is_recommended as boolean
          //   );
          // }}
          >
            <input
              // id={mockData?.question_id}
              type="checkbox"
              className="scale-150"
              // checked={mockData?.is_selected}
              color="primary"
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
    },
    {
      fieldId: "published_at",
      label: "Uploaded Date",
      // render: (data) => (
      //   <>{moment(data?.started_at!).utc(true).format("DD/MM/yyyy HH:mm")}</>
      // ),
    },
    {
      fieldId: "question_id",
      label: "Action",
      render: (data) => (
        <Dropdown horizontal="left">
          <Dropdown.Toggle>
            <FaEllipsisH />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-52 bg-white z-50">
            <Dropdown.Item
            // onClick={() => {
            //   navigate(`/quiz/${data?.id}/edit`);
            // }}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
            // onClick={() => {
            //   setConfirmationModal({ id: data?.id, open: true });
            // }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const [dataView, setDataView] = useState<QuestionBankI[]>([]);
  const [filter, setFilter] = useState<FilterQuestionBankI>({
    category: "",
    language: "",
  });
  const [categoryOptions] = useState([
    { key: 1, label: "All", value: "" },
    { key: 2, label: "INVEST", value: "invest" },
    { key: 3, label: "CRYPTO", value: "crypto" },
  ]);

  const [langOptions] = useState([
    { key: 1, label: "All", value: "" },
    { key: 2, label: "ID", value: "id" },
    { key: 3, label: "EN", value: "en" },
  ]);

  const mockData: QuestionBankI[] = [
    {
      is_selected: true,
      question_id: "1",
      question: "Ini question",
      category: "invest",
      difficulty: "medium",
      language: "id",
      published_at: "29/04/2024",
    },
    {
      is_selected: true,
      question_id: "2",
      question: "Ini question crypto",
      category: "crypto",
      difficulty: "hard",
      language: "id",
      published_at: "29/04/2024",
    },
    {
      is_selected: true,
      question_id: "3",
      question: "this is about economic based crypto",
      category: "crypto",
      difficulty: "hard",
      language: "en",
      published_at: "29/04/2024",
    },
  ];

  console.log("ini filter", filter);

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

  useEffect(() => {
    const temp = mockData.filter((item) => {
      return (
        item.category.includes(filter.category) &&
        item.language.includes(filter.language)
      );
    });
    setDataView(temp);
  }, [filter]);

  console.log(dataView);

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-end">
          <div className="w-full flex flex-row gap-8">
            <div className="w-40">
              <label
                htmlFor="category-question-bank"
                className="font-semibold text-[#7C7C7C] mb-3"
              >
                Category Question
              </label>
              <Select
                value={filter.category}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, category: e.value }))
                }
                options={categoryOptions}
                rounded={true}
              />
            </div>
            <div className="w-40">
              <label
                htmlFor="category-question-bank"
                className="font-semibold text-[#7C7C7C] mb-3"
              >
                Language
              </label>
              <Select
                value={filter.language}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, language: e.value }))
                }
                options={langOptions}
                rounded={true}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-end gap-4">
            <Button
              className="border-seeds text-seeds rounded-full px-10"
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
            data={dataView}
            loading={false}
          />
        </div>
      </ContentContainer>

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
