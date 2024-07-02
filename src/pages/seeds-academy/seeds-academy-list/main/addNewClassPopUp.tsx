import React from "react";
import { Button, Modal, FileInput } from "react-daisyui";
import CInput from "components/input";
import { Controller } from "react-hook-form";
import { FiX } from "react-icons/fi";
import useCreateClassForm from "hooks/seeds-academy/useCreateClassForm";
import { useState } from "react";
import { CreateClassPayload } from "_interfaces/seeds-academy.interfaces";
import useFilePreview from "hooks/shared/useFilePreview";
import MDEditor, { commands } from "@uiw/react-md-editor";
import CurrencyInput from "components/currency-input";

const AddNewClassPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  levelName: string;
  categoryId: string | undefined;
}> = ({ isOpen, onClose, levelName, categoryId }) => {
  if (!isOpen) return null;

  const handleCreateSuccess = (): void => {
    onClose();
  };
  const {
    register,
    errors,
    setFocus,
    isLoading,
    control,
    watch,
    handleCreate,
    setValue,
  } = useCreateClassForm({
    levelName,
    categoryId,
    onSuccess: handleCreateSuccess,
  });

  const banner = watch("banner");
  const [bannerPreview] = useFilePreview(banner as unknown as FileList);

  const module = watch("module");
  const [modulePreview] = useFilePreview(module as unknown as FileList);

  const quiz = watch("quiz");
  const [quizPreview] = useFilePreview(quiz as unknown as FileList);

  return (
    <Modal open={isOpen} className="bg-white w-11/12 max-w-[2000px] p-8">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit">
          Create Class
        </p>
        <FiX onClick={onClose} className="cursor-pointer" />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        <form onSubmit={handleCreate}>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full justify-between">
                <div className="flex flex-col gap-2 my-3 w-full">
                  <label className="font-semibold">
                    Title<span className="text-red-600">*</span>
                  </label>
                  <CInput
                    {...register("title")}
                    error={errors.title}
                    borderOffset
                  />
                </div>
                <div className="flex flex-col gap-2 my-3 w-full">
                  <label className="font-semibold">
                    Video<span className="text-red-600">*</span>
                  </label>
                  <CInput
                    {...register("video")}
                    error={errors.video}
                    borderOffset
                  />
                </div>
              </div>
              <div className="flex gap-4 w-[40%] justify-left">
                <div className="flex flex-col gap-2 my-3 w-full">
                  <label className="font-semibold">
                    Price<span className="text-red-600">*</span>
                  </label>
                  {/* <CInput
                    {...register("price.idr")}
                    error={errors.video}
                    borderOffset
                  /> */}
                  <Controller
                    control={control}
                    name="price.idr"
                    render={({ field: { value, onChange } }) => (
                      <CurrencyInput
                        value={value}
                        onValueChange={(val) => onChange(val)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                    Deskripsi (Indonesia)
                  </label>
                  <Controller
                    control={control}
                    name="description.id"
                    render={({ field: { value, onChange } }) => (
                      <MDEditor
                        height={200}
                        commands={[...commands.getCommands()]}
                        value={value}
                        onChange={onChange}
                        highlightEnable={false}
                        preview="live"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                    Deskripsi (English)
                  </label>
                  <Controller
                    control={control}
                    name="description.en"
                    render={({ field: { value, onChange } }) => (
                      <MDEditor
                        height={200}
                        commands={[...commands.getCommands()]}
                        value={value}
                        onChange={onChange}
                        highlightEnable={false}
                        preview="live"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full justify-between mt-5">
                <div className="col-span-3 my-3 w-1/3">
                  <h1 className="font-semibold text-base my-3">Modul</h1>
                  <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
                    {modulePreview ? (
                      <img
                        className="flex mx-auto w-[500px] h-[166px] object-fill"
                        src={modulePreview}
                        alt=""
                      />
                    ) : (
                      <div className="text-seeds">Drag Your Image Here</div>
                    )}
                    <FileInput
                      {...register("module")}
                      size="sm"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="col-span-3 my-3 w-1/3">
                  <h1 className="font-semibold text-base my-3">Assesment</h1>
                  <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
                    {quizPreview ? (
                      <img
                        className="flex mx-auto w-[500px] h-[166px] object-fill"
                        src={quizPreview}
                        alt=""
                      />
                    ) : (
                      <div className="text-seeds">Drag Your Image Here</div>
                    )}
                    <FileInput
                      {...register("quiz")}
                      size="sm"
                      accept=".csv, .txt, .pdf"
                    />
                  </div>
                </div>
                <div className="col-span-3 my-3 w-1/3">
                  <h1 className="font-semibold text-base my-3">Banner</h1>
                  <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
                    {bannerPreview ? (
                      <img
                        className="flex mx-auto w-[500px] h-[166px] object-fill"
                        src={bannerPreview}
                        alt=""
                      />
                    ) : (
                      <div className="text-seeds">Drag Your Image Here</div>
                    )}
                    <FileInput
                      {...register("banner")}
                      size="sm"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 self-end justify-end">
            <Button
              onClick={onClose}
              className="border border-[#3AC4A0] rounded-full text-[#3AC4A0] w-[268px] hover:bg-[#3AC4A0] hover:text-white disabled:text-white disabled:bg-[#3AC4A0] font-semibold font-poppins text-base"
            >
              Cancel
            </Button>
            <Button
                // onClick={handleCreate}
              type="submit"
              loading={isLoading}
              className="border-none bg-[#3AC4A0] rounded-full text-white w-[268px] hover:bg-[#3AC4A0] font-semibold font-poppins text-base"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewClassPopup;
