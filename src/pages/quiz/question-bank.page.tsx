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
          <Button className="border-seeds text-seeds rounded-full px-10">
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
  );
};

export default QuestionBank;
