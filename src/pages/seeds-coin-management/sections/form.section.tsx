import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FiX } from "react-icons/fi";
import FormInput from "components/input/formInput";
import { noExp, status } from "data/seeds-coin-management";
import moment from "moment";
import useRNCHelper from "hooks/shared/useRNCHelper";
import {
  SeedsCoinManagementReq,
  SeedsCoinModal,
} from "_interfaces/seeds-coin-management.interfaces";
import useUpdateSeedsCoinManagementForm from "hooks/seeds-coin-management/useUpdateSeedsCoinManagement";

const SeedsCoinForm = ({ data, open, setOpen, refetch }: SeedsCoinModal) => {
  const { select, setSelect, handleSelectChange } = useRNCHelper();
  const {
    handleUpdate,
    register,
    errors,
    reset,
    loading,
    setValue,
    trigger,
  } = useUpdateSeedsCoinManagementForm();
  const handleResetForm = () => {
    if (data) {
      reset({
        ...data,
        coin_value: data.coins,
        started_at: moment(data.started_at).format("YYYY-MM-DD hh:mm"),
        expired_at: data.expired_at===undefined?null:moment(data.expired_at).format("YYYY-MM-DD hh:mm"),
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        coin_value: data.coins,
        started_at: moment(data.started_at).format("YYYY-MM-DD hh:mm"),
        expired_at: moment(data.expired_at).format("YYYY-MM-DD hh:mm"),
      });
      setSelect((prev) => ({
        ...prev,
        is_active: data.is_active,
        expired_at:data.expired_at===undefined?null:data.expired_at
      }));
    }
  }, [data]);
  return (
    <Modal open={open} className="bg-white w-11/12 max-w-[2000px] p-4 md:p-8">
      <Modal.Header className="flex justify-between">
        <p
          className="font-semibold font-poppins text-xl text-black w-fit"
        >
          Detail Activity
        </p>
        <FiX
          onClick={() => {
            handleResetForm();
            setOpen(!open);
          }}
          className="cursor-pointer"
        />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10">
          <div className="flex flex-col gap-4 w-full md:w-5/12">
            <FormInput<SeedsCoinManagementReq>
              label="Activity"
              type="text"
              registerName="name"
              register={register}
              errors={errors}
              disabled
            />
            <FormInput<SeedsCoinManagementReq>
              label="Coin Value"
              type="number"
              registerName="coin_value"
              register={register}
              errors={errors}
            />
          </div>
          <div className="hidden md:block border border-[#9B9B9B]"></div>
          <div className="flex flex-col gap-4 w-full md:w-7/12">
            <FormInput<SeedsCoinManagementReq>
              registerName="is_active"
              type="radio"
              setValue={setValue}
              data={status}
              select={select?.is_active}
              handleSelectChange={handleSelectChange}
              register={register}
            />
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <FormInput<SeedsCoinManagementReq>
                label="Start Date"
                registerName="started_at"
                register={register}
                errors={errors}
                type="datetime-local"
              />

              {select?.expired_at !== null && (
                <FormInput<SeedsCoinManagementReq>
                  label="Expired Date"
                  registerName="expired_at"
                  register={register}
                  errors={errors}
                  type="datetime-local"
                />
              )}
            </div>
            <FormInput<SeedsCoinManagementReq>
              registerName="expired_at"
              type="checkbox"
              data={noExp}
              errors={errors}
              select={select?.expired_at}
              setValue={setValue}
              handleSelectChange={handleSelectChange}
              register={register}
            />
          </div>
        </div>
        <div className="self-end flex gap-4">
          <Button
            className="border-[#3AC4A0] bg-white rounded-full text-[#3AC4A0] w-[128px] hover:bg-white"
            onClick={() => {
              handleResetForm();
              setOpen(!open);
            }}
          >
            Cancel
          </Button>
          <Button
            className="border-none bg-[#3AC4A0] rounded-full text-white w-[128px] hover:bg-[#3AC4A0]"
            loading={loading}
            onClick={async () => {
              if (await trigger()) {
                await handleUpdate();
                handleResetForm();
                setOpen(!open);
                refetch();
              }
            }}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SeedsCoinForm;
