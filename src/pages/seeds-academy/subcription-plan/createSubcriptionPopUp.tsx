import React from "react";
import { Button, Modal, FileInput } from "react-daisyui";
import CInput from "components/input";
import MInput from "components/multi-input/index";
import { Controller } from "react-hook-form";
import { FiX } from "react-icons/fi";
import useCreateSubcriptionForm from "hooks/seeds-academy/useCreateSubcriptionForm";
import { useState } from "react";
import { CreateSubcriptionPayload } from "_interfaces/seeds-academy.interfaces";
import useFilePreview from "hooks/shared/useFilePreview";
import MDEditor, { commands } from "@uiw/react-md-editor";
import CurrencyInput from "components/currency-input";
import ReactSelect, { GroupBase } from "react-select";
import { statusSubcription } from "data/seeds-academy";

const optionQuestion = [
  {
    key: 1,
    label: "1 bulan",
    value: "1",
  },
  {
    key: 1,
    label: "2 bulan",
    value: "2",
  },
  {
    key: 1,
    label: "3 bulan",
    value: "3",
  },
  {
    key: 1,
    label: "4 bulan",
    value: "4",
  },
  {
    key: 1,
    label: "5 bulan",
    value: "5",
  },
  {
    key: 1,
    label: "6 bulan",
    value: "6",
  },
  {
    key: 1,
    label: "9 bulan",
    value: "9",
  },
  {
    key: 1,
    label: "12 bulan",
    value: "12",
  },
  {
    key: 1,
    label: "18 bulan",
    value: "18",
  },
  {
    key: 1,
    label: "24 bulan",
    value: "24",
  },
];

const CreateSubcriptionPopUp: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
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
    setValue,
    handleCreate,
  } = useCreateSubcriptionForm({
    onSuccess: handleCreateSuccess,
  });

  return (
    <Modal open={isOpen} className="bg-white w-11/12 max-w-[2000px] p-8">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit">
          Add Subcription Plan
        </p>
        <FiX onClick={onClose} className="cursor-pointer" />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        <form onSubmit={handleCreate}>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full justify-between pb-24 pt-5">
                <div className="flex flex-col gap-2 my-3 w-1/2">
                  <label className="font-semibold">Total Questions *</label>
                  <Controller
                    control={control}
                    name="duration_month"
                    // name="price"
                    render={({ field: { value, onChange } }) => (
                      <ReactSelect
                        styles={{
                          control: (baseStyle) => ({
                            ...baseStyle,
                            padding: 5,
                            borderColor: "#BDBDBD",
                            borderRadius: "0.5rem",
                          }),
                        }}
                        options={optionQuestion}
                        value={optionQuestion.find(
                          (item) => Number(item.value) === value
                        )}
                        onChange={(e) => onChange(Number(e?.value))}
                      />
                    )}
                  />
                </div>
                <div className="border-l-2 w-1/2">
                  <div className="flex flex-col gap-2 my-3 w-full ms-5 ">
                    <label className="font-semibold">Price</label>
                    <Controller
                      control={control}
                      name="price"
                      render={({ field: { value, onChange } }) => (
                        <CurrencyInput
                          value={value}
                          onValueChange={(val) => onChange(val)}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2 my-3 w-full ms-5">
                    <MInput<CreateSubcriptionPayload>
                      label="Status"
                      registerName="status"
                      type="radio"
                      data={statusSubcription}
                      errors={errors}
                      register={register}
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

export default CreateSubcriptionPopUp;
