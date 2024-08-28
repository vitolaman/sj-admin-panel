import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-daisyui";
import MInput from "components/multi-input/index";
import { Controller } from "react-hook-form";
import { FiX } from "react-icons/fi";
import useUpdateSubcriptionForm from "hooks/seeds-academy/useUpdateSubcriptionForm";
import { CreateSubcriptionPayload } from "_interfaces/seeds-academy.interfaces";
import CurrencyInput from "components/currency-input";
import ReactSelect, { GroupBase } from "react-select";
import { statusSubcription } from "data/seeds-academy";
import useRNCHelper from "hooks/shared/useRNCHelper";
import { useGetSubscriptionByIdQuery } from "services/modules/seeds-academy";
import { optionQuestion } from "../../../data/seeds-academy";

const UpdateSubcriptionPopUp: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  id: string;
}> = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;
  const { select, setSelect, handleSelectChange } = useRNCHelper();
  const { data, isLoading, refetch } = useGetSubscriptionByIdQuery(id);

  const handleCreateSuccess = (): void => {
    onClose();
  };

  const {
    register,
    errors,
    setFocus,
    control,
    watch,
    setValue,
    handleCreate,
    reset,
  } = useUpdateSubcriptionForm({
    onSuccess: handleCreateSuccess,
    id: id,
  });

  useEffect(() => {
    if (data) {
      reset({
        price: data.data.price,
        duration_month: data.data.duration_month,
        status: data.data.status,
      });
    }
  }, [data]);

  return (
    <Modal open={isOpen} className="bg-white w-11/12 max-w-[2000px] p-8">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit">
          Edit Subcription Plan
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
                      select={select?.status}
                      setValue={setValue}
                      errors={errors}
                      handleSelectChange={handleSelectChange}
                      // register={register}
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

export default UpdateSubcriptionPopUp;
