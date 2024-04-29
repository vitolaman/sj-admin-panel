import { useState } from "react";
import ContentContainer from "components/container";
import { Button, FileInput, Modal } from "react-daisyui";
import { QuizGalleryI } from "_interfaces/quiz-gallery.interfaces";
import { Columns, Table } from "components/table/table";
import { IoClose } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import Select from "components/select";
// import moment from "moment";
import { useGetQuizGalleryListQuery } from "services/modules/quiz";
import useCreateQuizGalleryForm from "hooks/quiz/useCreateQuizGalleryForm";
import CInput from "components/input";
import ConfirmationModal from "components/confirmation-modal";
import { errorHandler } from "services/errorHandler";
// import useFilePreview from "hooks/shared/useFilePreview";

export const galleryRouteName = "";
const QuizGallery = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const { isLoading, data, refetch } = useGetQuizGalleryListQuery(undefined);
  const {
    handleCreate,
    register,
    errors,
    upsertLoading,
    defaultValues,
    reset,
    watch,
    control
  } = useCreateQuizGalleryForm();
  // const fileupload = 'https://i.ibb.co/fDjKSpW/WIN-20240426-21-23-09-Pro.jpg'
  const header: Columns<QuizGalleryI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "title",
      label: "Title",
    },
    {
      fieldId: "type",
      label: "Type Document",
    },
    {
      fieldId: "url",
      label: "Link",
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <Button
          onClick={() => {
            setConfirmationModal({ id: "1", open: true });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const typeFile = [
    {
      key: 1,
      label: "image",
      value: "image",
    },
    {
      key: 2,
      label: "video",
      value: "video",
    },
  ];

  const handleDelete = async () => {
    try {
      // await deleteCategory(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const hideModal = () => {
    reset(defaultValues);
    setUploadModal(false);
  };

  return (
    <>
      {/* Start of UI Gallery Quiz */}
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Quiz Gallery</h1>
          <div className="flex flex-row gap-3">
            <Button
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setUploadModal(true);
              }}
            >
              Upload File
            </Button>
          </div>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<QuizGalleryI>
            columns={header}
            data={data?.data}
            loading={isLoading}
          />
        </div>
      </ContentContainer>
      {/* End of UI Gallery Quiz */}

      {/* Start of Upload File Modal */}
      <Modal className="bg-white w-2/3 max-w-[900px]" open={uploadModal}>
        <form
          onSubmit={async (e) => {
            if (uploadModal) {
              await handleCreate(e);
            }
            hideModal();
            refetch();
          }}
        >
          <Modal.Header className="flex flex-row justify-between">
            Upload File
            <IoClose onClick={() => hideModal()} />
          </Modal.Header>
          <Modal.Body className="overflow-scroll">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Title</label>
                <CInput
                  type="string"
                  {...register("title")}
                  error={errors.title}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Url</label>
                <CInput type="string" {...register("url")} error={errors.url} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Type</label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      options={typeFile}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                      value={value}
                    />
                  )}
                />
              </div>
              <h1 className="font-semibold text-base">Upload File</h1>
              <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
                {undefined ? (
                  <img
                    className="flex mx-auto w-[500px] h-[166px] object-fill"
                    src={undefined}
                    alt="file-preview"
                  />
                ) : (
                  <div className="text-seeds">Choose your file here</div>
                )}
                {/* <FileInput
                  {...register("url")}
                  size="sm"
                  accept="image/*,video/*"
                /> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              type="reset"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                hideModal();
              }}
              loading={upsertLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={upsertLoading}
            >
              Upload
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
      {/* End of Upload File Modal */}

      {/* Start of Delete File Modal*/}
      <ConfirmationModal
        isOpen={confirmationModal.open}
        onClose={() => {
          setConfirmationModal({ open: false });
        }}
        onConfirm={handleDelete}
        alertType="danger"
        title="Delete File Gallery Quiz"
        subTitle="Are you sure want to delete this file?"
      />
      {/* End of Delete File Modal*/}
    </>
  );
};

export default QuizGallery;
