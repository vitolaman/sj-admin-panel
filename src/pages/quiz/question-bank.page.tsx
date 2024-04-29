import { useState } from "react";
import {
  FilterQuestionBankI,
  QuestionBankI,
  QuestionBankLangI,
} from "_interfaces/question-bank.interfaces";
import ContentContainer from "components/container";
import { Columns, Table } from "components/table/table";
import { Button, Dropdown, FileInput, Modal } from "react-daisyui";
import { FaEllipsisH } from "react-icons/fa";
import Select from "components/select";

export const qbRouteName = "question-bank";
const QuestionBank = () => {
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

  const [filter, setFilter] = useState<FilterQuestionBankI>({ category: "" });
  const [lang, setLang] = useState<QuestionBankLangI>({ language: "" });

  const categoryOptions = [
    {
      key: 1,
      label: "All",
      value: "",
    },
    {
      key: 2,
      label: "INVEST",
      value: "invest",
    },
    {
      key: 3,
      label: "CRYPTO",
      value: "crypto",
    },
  ];

  const langOptions = [
    {
      key: 1,
      label: "All",
      value: "",
    },
    {
      key: 2,
      label: "ID",
      value: "indonesian",
    },
    {
      key: 3,
      label: "EN",
      value: "english",
    },
  ];

  const mockData: QuestionBankI[] = [
    {
      is_selected: true,
      question_id: "1",
      question: "Ini question",
      category: "INVEST",
      difficulty: "Medium",
      language: "id",
      published_at: "29/04/2024",
    },
  ];
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
              value={
                categoryOptions.find((item) => item.value === filter?.category)
                  ?.value
              }
              onChange={(e): void => {
                setFilter((prev) => ({ ...prev, category: e.value }));
              }}
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
              value={
                langOptions.find((item) => item.value === lang?.language)?.value
              }
              onChange={(e): void => {
                setLang((prev) => ({ ...prev, language: e.value }));
              }}
              options={langOptions}
              rounded={true}
            />
          </div>
          </div>
          <div className="w-full flex flex-row justify-end gap-4">
          <Button
            className="border-seeds text-seeds rounded-full px-10"
            // onClick={() => {
            //   setUploadModal(true);
            // }}
          >
            Upload File
          </Button>
          </div>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<QuestionBankI>
            columns={header}
            data={mockData}
            loading={false}
          />
        </div>
      </ContentContainer>
    </>
  );
};

export default QuestionBank;
