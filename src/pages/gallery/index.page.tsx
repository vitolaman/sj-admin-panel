import { useState } from "react";
import ContentContainer from "components/container";
import { Button, FileInput, Modal } from "react-daisyui";
import { QuizGalleryI } from "_interfaces/quiz-gallery.interfaces";
import { Columns, Table } from "components/table/table";
import { IoClose } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Controller } from "react-hook-form";
import Select from "components/select";
import {
  useGetQuizGalleryListQuery,
  useDeleteQuizGalleryMutation,
} from "services/modules/gallery";
import useCreateQuizGalleryForm from "hooks/gallery/useCreateQuizGalleryForm";
import CInput from "components/input";
import ConfirmationModal from "components/confirmation-modal";
import { errorHandler } from "services/errorHandler";
import useFilePreview from "hooks/shared/useFilePreview";
import { toast } from "react-toastify";

export const galleryRouteName = "";
const MAX_FILE_SIZE_MB = 3;

const QuizGallery = () => {
  const [uploadModal, setUploadModal] = useState<boolean>(false);
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
    control,
    watch,
    defaultValues,
    reset,
  } = useCreateQuizGalleryForm();
  const gallery = watch("gallery.file_link");
  const extensionFile = watch("type");
  const [galleryPreview] = useFilePreview(gallery as FileList);
  const [deleteGallery] = useDeleteQuizGalleryMutation();

  const handleCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link.");
      });
  };

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
      render: (data) => (
        <>
          {data && data.url ? (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => handleCopy(data.url)}
              >
                {data.url}
                <div className="absolute top-[-12px] right-[-15px] text-xl cursor-pointer ms-10">
                  <HiOutlineClipboardDocumentList />
                </div>
              </div>
            </>
          ) : (
            <span>No URL available</span>
          )}
        </>
      ),
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <Button
          onClick={() => {
            setConfirmationModal({ id: data?.gallery_id, open: true });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const typeFile = [
    {
      key: 0,
      label: "Select...",
      value: "",
      isDisabled: true,
    },
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
      await deleteGallery(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const hideModal = () => {
    refetch();
    reset(defaultValues);
    setUploadModal(!uploadModal);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLFormElement).querySelector(
      'input[name="gallery.file_link"]'
    ) as HTMLInputElement;
    if (!file) {
      toast.error("Please select a file.");
      hideModal();
      return;
    }
    if (file.files && file.files[0]) {
      const fileSizeMB = file.files[0].size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
        hideModal();
        return;
      }
    }
    try {
      await handleCreate(e);
      hideModal();
    } catch (error) {
      errorHandler(error);
      hideModal();
    }
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
        <form onSubmit={handleUpload}>
          <Modal.Header className="flex flex-row justify-between">
            Upload File
            <IoClose onClick={() => hideModal()} />
          </Modal.Header>
          <Modal.Body className="overflow-scroll px-2">
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
              {extensionFile === "video" && (
                <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
                  {gallery ? (
                    <video
                      className="flex mx-auto w-[500px] h-auto object-fill"
                      controls
                    >
                      <source src={galleryPreview} type="video/mp4" /> Your
                      browser does not support the video tag.{" "}
                    </video>
                  ) : (
                    <div className="text-seeds">
                      Choose your file video here
                    </div>
                  )}
                  <FileInput
                    {...register("gallery.file_link")}
                    size="sm"
                    accept=".mp4"
                  />
                </div>
              )}
              {extensionFile === "image" && (
                <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
                  {gallery ? (
                    <img
                      className="flex mx-auto w-[200px] h-[200px] object-fill"
                      src={galleryPreview}
                      alt=""
                    />
                  ) : (
                    <div className="text-seeds">
                      Choose your file image here
                    </div>
                  )}
                  <FileInput
                    {...register("gallery.file_link")}
                    size="sm"
                    accept=".png, .jpeg, .jpg"
                  />
                </div>
              )}
              <div className="text-sm text-[#3C49D6] font-normal my-2">
                *Max File Size: 3 MB
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
