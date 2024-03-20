import { ArticleI, GetArticleQuery } from "_interfaces/article.interfaces";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { memo, useState } from "react";
import { Button, Dropdown } from "react-daisyui";
import { IoEllipsisHorizontal, IoPencil, IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetArticlesQuery } from "services/modules/article";

const Posted = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<GetArticleQuery>({
    page: 1,
    limit: 10,
    filter_status: "PUBLISHED",
    search_title: "",
  });
  const { data, isLoading } = useGetArticlesQuery(params);

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const header: Columns<ArticleI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "id",
      label: "Article ID",
    },
    {
      fieldId: "title",
      label: "Title Article",
      render: (row) => {
        const titleArray = row?.title.split(" ");
        const shortenedTitle = titleArray?.slice(0, 5).join(" ");
        return <div>{shortenedTitle}</div>;
      },
    },
    {
      fieldId: "content",
      label: "Body Article",
      render: (row) => {
        const cleanedContent = row?.content.replace(/<[^>]*>/g, "");
        const contentArray = cleanedContent?.split(" ");
        const shortenedContent = contentArray?.slice(0, 5).join(" ");
        return <div>{shortenedContent}</div>;
      },
    },
    {
      fieldId: "imageUrl",
      label: "Attachment",
      render: (row) => <div>{row?.imageUrl.split("/").pop()}</div>,
    },
    {
      fieldId: "total_views",
      label: "Viewers",
    },
    {
      fieldId: "publicationDate",
      label: "Date Posted",
      render: (row) => (
        <div>{moment(row?.publicationDate).format("DD MMM YYYY HH:mm")}</div>
      ),
    },

    {
      fieldId: "id",
      label: "Action",
      render: (row) => (
        <Dropdown horizontal="left">
          <Dropdown.Toggle button={false} className="cursor-pointer">
            <IoEllipsisHorizontal />
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white">
            <Dropdown.Item
              onClick={() => {
                navigate(`/blog/article/${row?.id}`);
              }}
              className="flex"
            >
              <IoPencil />
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                // handleDeleteButtonClick(row);
              }}
              className="flex"
            >
              <IoTrash />
              <span className="text-red-800">Delete</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Published Article</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) =>
              setParams((prev) => ({ ...prev, search_title: text }))
            }
          />
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            onClick={() => {
              navigate("/blog/article/create");
            }}
          >
            Add Article
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<ArticleI>
          columns={header}
          loading={isLoading}
          data={data?.data}
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.currentPage ?? 1}
          totalPages={
            Math.floor((data?.metadata?.total ?? 0) / params.limit) ?? 0
          }
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(Posted);
