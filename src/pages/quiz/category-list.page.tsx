import {
  CreateQuizCategoryI,
  QuizCategoryI,
} from "_interfaces/quiz-category.interfaces";
import ConfirmationModal from "components/confirmation-modal";
import ContentContainer from "components/container";
import CInput from "components/input";
import { Columns, Table } from "components/table/table";
import ValidationError from "components/validation/error";
import useUpsertQuizCategoryForm from "hooks/quiz/useUpsertQuizCategoryForm";
import { useEffect, useState } from "react";
import { Button, Dropdown, Modal, Textarea } from "react-daisyui";
import { FaEllipsisH } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { errorHandler } from "services/errorHandler";
import {
  useDeleteQuizCategoryMutation,
  useGetQuizCategoriesQuery,
  useLazyGetQuizCategoryByIdQuery,
} from "services/modules/quiz";

export const categoryQuizRouteName = "category";
const CategoryListPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });

  const { data, isLoading, refetch } = useGetQuizCategoriesQuery(undefined);
  const [getCategoryById, categoryState] = useLazyGetQuizCategoryByIdQuery();
  const [deleteCategory] = useDeleteQuizCategoryMutation();
  const {
    handleCreate,
    handleUpdate,
    register,
    errors,
    upsertLoading,
    defaultValues,
    reset,
  } = useUpsertQuizCategoryForm();

  useEffect(() => {
    if (categoryState.data && showEdit) {
      const categoryData: CreateQuizCategoryI = {
        name: categoryState.data.name,
        category_id: categoryState.data.category_id,
        description: categoryState.data.descriptions,
      };
      reset(categoryData);
    }
  }, [categoryState.data, showEdit]);

  const header: Columns<QuizCategoryI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "category_id",
      label: "ID Category",
    },
    {
      fieldId: "name",
      label: "Category Name",
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
                getCategoryById(data?.category_id!);
                setShowEdit(true);
              }}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setConfirmationModal({ id: data?.category_id, open: true });
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleDelete = async () => {
    try {
      await deleteCategory(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const hideModal = () => {
    reset(defaultValues);
    setShowEdit(false);
    setShowCreate(false);
  };

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Quiz Category List</h1>
          <div className="flex flex-row gap-3">
            <Button
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              onClick={() => {
                setShowCreate(true);
              }}
            >
              Create Quiz Category
            </Button>
          </div>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<QuizCategoryI>
            columns={header}
            data={data?.data}
            loading={isLoading}
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
        title="Delete Category Quiz"
        subTitle="Are you sure want to delete this Category?"
      />

      <Modal
        className="bg-white w-2/3 max-w-[900px]"
        open={showEdit || showCreate}
      >
        <form
          onSubmit={async (e) => {
            if (showCreate) {
              await handleCreate(e);
            }
            if (showEdit) {
              await handleUpdate(e);
            }
            hideModal();
            refetch();
          }}
        >
          <Modal.Header className="flex flex-row justify-between">
            {showCreate && "Create Quiz Category"}
            {showEdit && "Edit Quiz Category"}
            <IoClose
              onClick={() => {
                hideModal();
              }}
            />
          </Modal.Header>
          <Modal.Body className="overflow-scroll">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Category ID</label>
                <CInput
                  type="string"
                  {...register("category_id")}
                  error={errors.category_id}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Category Name</label>
                <CInput
                  type="string"
                  {...register("name")}
                  error={errors.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Description (English)</label>
                <Textarea {...register("description.en")} />
                <ValidationError error={errors.description?.en} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Description (Indonesian)
                </label>
                <Textarea {...register("description.id")} />
                <ValidationError error={errors.description?.id} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={hideModal}
              loading={upsertLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={upsertLoading}
            >
              Save
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </>
  );
};

export default CategoryListPage;
