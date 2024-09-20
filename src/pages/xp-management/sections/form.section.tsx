import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FiX } from "react-icons/fi";
import useUpdateXPManagementForm from "hooks/xp-management/useUpdateXPManagement";
import {
  XPManagementI,
  XPManagementModal,
} from "_interfaces/xp-management.interface";
import MInput from "components/multi-input/index";
import { limitation, status } from "data/xp-management";
import ReactQuill from "react-quill";
import { useLazyGetXPManagementByIdQuery } from "services/modules/xp-management";
import moment from "moment";
import { Loader } from "components/spinner/loader";

const XPForm = ({ id, setId, open, setOpen, refetch }: XPManagementModal) => {
  const [richValue, setRichValue] = useState<string>();
  const [getXPManagement, XPManagementDetailState] =
    useLazyGetXPManagementByIdQuery();

  const {
    handleUpdate,
    register,
    errors,
    reset,
    loading,
    defaultValues,
    setValue,
    trigger,
    control,
    watch,
  } = useUpdateXPManagementForm();
  const handleResetForm = () => {
    reset({ ...defaultValues });
    setId("");
    setRichValue(undefined);
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
      getXPManagement(id);
      setRichValue(XPManagementDetailState.data?.description);
    }
    if (XPManagementDetailState.data && id) {
      reset({
        ...XPManagementDetailState.data,
        started_at: moment(XPManagementDetailState.data.started_at).format(
          "YYYY-MM-DD hh:mm"
        ),
        expired_at: moment(XPManagementDetailState.data.expired_at).format(
          "YYYY-MM-DD hh:mm"
        ),
        is_active: `${XPManagementDetailState.data.is_active}`,
        is_daily_task: `${XPManagementDetailState.data.is_daily_task}`,
      });
    }
  }, [XPManagementDetailState.data, id]);
  return (
    <Modal open={open} className="bg-white w-11/12 max-w-[2000px] p-8">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit">
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
      {XPManagementDetailState.isLoading ? (
        <Loader />
      ) : (
        <Modal.Body className="flex flex-col gap-4">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-4 w-5/12">
              <MInput<XPManagementI>
                label="Activity"
                type="text"
                registerName="name"
                register={register}
                errors={errors}
                disabled
              />
              <MInput<XPManagementI>
                label="XP Gained"
                type="number"
                registerName="exp_gained"
                control={control}
                watch={watch}
                errors={errors}
              />
              <MInput<XPManagementI>
                data={limitation}
                label="Limitation"
                registerName="is_daily_task"
                type="radio"
                register={register}
              />
              { watch("is_daily_task")==='true' ? (
                <MInput<XPManagementI>
                  label="Max Activity"
                  type="number"
                  registerName="max_exp"
                  control={control}
                  watch={watch}
                  errors={errors}
                />
              ) : null}
            </div>
            <div className="border border-[#9B9B9B]"></div>
            <div className="flex flex-col gap-4 w-7/12">
              <MInput<XPManagementI>
                data={status}
                label="Status"
                registerName="is_active"
                type="radio"
                register={register}
              />
              <div className="flex gap-4 w-full">
                <MInput<XPManagementI>
                  label="Start Date"
                  registerName="started_at"
                  register={register}
                  errors={errors}
                  type="datetime-local"
                />
                <MInput<XPManagementI>
                  label="End Date"
                  registerName="expired_at"
                  register={register}
                  errors={errors}
                  type="datetime-local"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                  Term & Conditions
                </label>
                <ReactQuill
                  theme="snow"
                  value={richValue}
                  onChange={(e) => {
                    setRichValue(e);
                    setValue("description", e === "<p><br></p>" ? "" : e);
                  }}
                />
                <p className="font-poppins font-normal text-sm text-[#EF5350] text-right mt-10">
                  {errors.description?.message}
                </p>
              </div>
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
      )}
    </Modal>
  );
};

export default XPForm;
