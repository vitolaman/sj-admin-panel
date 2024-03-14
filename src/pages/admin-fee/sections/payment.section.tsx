import { Columns, Table } from "components/table/table";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  AdminFeeFilterI,
  AdminFeeI,
  AdminFeePayloadI,
} from "_interfaces/admin-fee.interfaces";
import { useGetPaymentListQuery } from "services/modules/admin-fee";
import { Button, Modal } from "react-daisyui";
import useUpdatePaymentForm from "hooks/admin-fee/useUpdatePaymentForm";
import CInput from "components/input";
import { Controller } from "react-hook-form";

const PaymentSection = ({ filter }: { filter?: AdminFeeFilterI }) => {
  const { data, isLoading, refetch } = useGetPaymentListQuery(undefined);
  const [modal, setModal] = useState<{ show: boolean; id?: string }>({
    show: false,
  });
  const [selectedData, setSelectedData] = useState<AdminFeeI>();
  const [dataView, setDataView] = useState(data?.config_list);

  const {
    handleUpdate,
    register,
    errors,
    setFocus,
    control,
    isLoadingUpdate,
    watch,
    reset,
    setValue,
    updateAdminFeeState,
  } = useUpdatePaymentForm();
  const isPromoActive = watch("is_promo_active");

  useEffect(() => {
    if (updateAdminFeeState.isSuccess) {
      setModal({ show: false });
      refetch();
    }
  }, [updateAdminFeeState.isSuccess]);

  useEffect(() => {
    setDataView(
      data?.config_list.map((item) => ({
        ...item,
        promo_start_date: moment(item.promo_start_date).format("YYYY-MM-DD"),
        promo_end_date: moment(item.promo_end_date).format("YYYY-MM-DD"),
      })),
    );
  }, [data?.config_list]);

  const header: Columns<AdminFeeI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "payment_type",
      label: "Category Payment",
      render: (data) => {
        switch (data?.payment_type) {
          case "va":
            return "Bank";
          case "qris":
            return "QRIS";
          case "ewallet":
            return "E-Wallet";
          default:
            return "E-Wallet";
        }
      },
    },
    {
      fieldId: "payment_method",
      label: "Merchant",
      render: (data) => {
        return <>{data?.payment_method.replace("_", " ")}</>;
      },
    },
    {
      fieldId: "admin_fee",
      label: "Admin Fee",
    },
    {
      fieldId: "promo_price",
      label: "Promo Price",
    },
    {
      fieldId: "priority",
      label: "Priority",
      render: (data) => (data?.priority ? "Priority" : "Reguler"),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => <div className="capitalize">{data?.status}</div>,
    },
    {
      fieldId: "updated_at",
      label: "Latest Update",
      render: (data) => moment(data?.updated_at).format("DD/MM/YYYY HH:mm"),
    },
    {
      fieldId: "max_promo_usage_per_month",
      label: "QTY",
    },
    {
      fieldId: "used",
      label: "Used",
    },
    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <div className="relative">
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            onClick={() => {
              setModal({ show: true, id: data?.id });
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const generateType = (row?: string): string => {
    switch (row) {
      case "va":
        return "Bank";
      case "qris":
        return "QRIS";
      case "ewallet":
        return "E-Wallet";
      default:
        return "E-Wallet";
    }
  };

  useEffect(() => {
    if (modal.show) {
      const selectedData = dataView?.find((item) => item.id === modal.id);
      if (selectedData) {
        setSelectedData(selectedData);
        void reset({
          id: selectedData.id,
          admin_fee: selectedData.admin_fee,
          promo_price: selectedData.promo_price,
          service_fee: selectedData.service_fee,
          is_priority: selectedData.priority,
          is_promo_active: selectedData.is_promo_active,
          status: selectedData.status,
          promo_start_date: moment(selectedData.promo_start_date).format(
            "YYYY-MM-DD",
          ),
          promo_end_date: moment(selectedData.promo_start_date).format(
            "YYYY-MM-DD",
          ),
          max_promo_usage_per_month: selectedData.max_promo_usage_per_month,
        });
      }
    }
  }, [modal.show, modal.id, data?.config_list]);

  useEffect(() => {
    if (filter) {
      const temp = data?.config_list.filter((item) => {
        if (filter.priority === "") {
          return (
            item.payment_type.includes(filter.category ?? "") &&
            item.status.includes(filter.status ?? "") &&
            item.payment_method
              .toLowerCase()
              .replaceAll("_", " ")
              .includes(filter.search.toLowerCase())
          );
        } else {
          const priority = filter.priority === "true";
          return (
            item.payment_type.includes(filter.category ?? "") &&
            item.priority === priority &&
            item.status.includes(filter.status ?? "") &&
            item.payment_method
              .toLowerCase()
              .replaceAll("_", " ")
              .includes(filter.search.toLowerCase())
          );
        }
      });
      setDataView(temp);
    }
  }, [filter?.category, filter?.priority, filter?.status, filter?.search]);

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof AdminFeePayloadI;
    if (firstError) {
      setFocus(firstError);
      const element = errors[firstError]?.ref;
      if (element) {
        element?.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }, [errors, setFocus]);

  return (
    <>
      <div className="border border-[#BDBDBD] rounded-lg">
        <Table<AdminFeeI>
          data={dataView}
          columns={header}
          action={true}
          loading={isLoading}
        />
      </div>
      <Modal
        className="bg-white w-2/3 max-w-[900px]"
        open={modal.show}
      >
        <Modal.Header className="flex flex-row justify-between">
          Edit Payment
          <IoClose
            onClick={() => {
              setModal({ show: false });
            }}
          />
        </Modal.Header>
        <Modal.Body className="overflow-scroll">
          <form
            className="grid grid-cols-5"
            onSubmit={handleUpdate}
          >
            <div className="border-r border-[#9B9B9B] p-4 col-span-2 flex flex-col gap-4">
              <label
                htmlFor="merchantID"
                className="font-semibold text-[#262626]"
              >
                Merchant ID
              </label>
              <CInput
                {...register("id")}
                type="text"
                disabled={true}
              />
              <label
                htmlFor="category"
                className="font-semibold text-[#262626]"
              >
                Category Payment
              </label>
              <CInput
                disabled={true}
                value={generateType(selectedData?.payment_type)}
              />
              <label
                htmlFor="merchant"
                className="font-semibold text-[#262626]"
              >
                Merchant
              </label>
              <CInput
                id="merchant"
                type="text"
                disabled={true}
                value={selectedData?.payment_method.replaceAll("_", " ")}
              />
            </div>
            <div className="col-span-3 p-4">
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <label
                    htmlFor="adminFee"
                    className="font-semibold text-[#262626]"
                  >
                    Admin Fee
                  </label>
                  <CInput
                    {...register("admin_fee")}
                    type="number"
                    error={errors.admin_fee}
                  />
                  <label
                    htmlFor="promoPrice"
                    className="font-semibold text-[#262626]"
                  >
                    Promo Price
                  </label>
                  <CInput
                    {...register("promo_price")}
                    type="number"
                    error={errors.promo_price}
                    disabled={!isPromoActive}
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label className="font-semibold text-[#262626]">
                    Admin Fee Status
                  </label>
                  <div className="flex flex-row gap-4 items-center">
                    <input
                      type="checkbox"
                      className="scale-150"
                      id="is_priority"
                      {...register("is_priority")}
                    />
                    <label htmlFor="priority">Priority</label>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <input
                      type="checkbox"
                      className="scale-150"
                      id="is_promo_active"
                      {...register("is_promo_active")}
                    />
                    <label htmlFor="promo">Activate Promo</label>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <Controller
                      control={control}
                      name="status"
                      render={({ field: { onChange, value } }) => (
                        <input
                          type="checkbox"
                          className="scale-150"
                          id="status"
                          onChange={(e) =>
                            setValue(
                              "status",
                              value === "hidden" ? "displayed" : "hidden",
                            )
                          }
                          checked={value === "hidden"}
                        />
                      )}
                    />
                    <label htmlFor="hide">Hide</label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="font-semibold text-[#262626]"
                  >
                    Start Date
                  </label>
                  <Controller
                    control={control}
                    name="promo_start_date"
                    render={({ field: { value, onChange } }) => (
                      <CInput
                        type="date"
                        value={moment(value).format("YYYY-MM-DD")}
                        onChange={onChange}
                        error={errors.promo_start_date}
                        disabled={!isPromoActive}
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="font-semibold text-[#262626]"
                  >
                    End Date
                  </label>
                  <Controller
                    control={control}
                    name="promo_end_date"
                    render={({ field: { value, onChange } }) => (
                      <CInput
                        type="date"
                        value={moment(value).format("YYYY-MM-DD")}
                        onChange={onChange}
                        error={errors.promo_start_date}
                        disabled={!isPromoActive}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="serviceFee"
                    className="font-semibold text-[#262626]"
                  >
                    Service Fee
                  </label>
                  <CInput
                    type="number"
                    error={errors.service_fee}
                    {...register("service_fee")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="limitUse"
                    className="font-semibold text-[#262626]"
                  >
                    Max Limit Use Per-Month
                  </label>
                  <CInput
                    type="number"
                    error={errors.max_promo_usage_per_month}
                    {...register("max_promo_usage_per_month")}
                    disabled={!isPromoActive}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row justify-end gap-4 col-span-5 mt-10">
              <Button
                type="reset"
                className="border-seeds text-seeds"
                onClick={() => {
                  setModal({ show: false });
                }}
                loading={isLoadingUpdate}
                disabled={isLoadingUpdate}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-seeds hover:bg-seeds-300 border-seeds disabled:border-seeds-200 hover:border-seeds-200 text-white"
                loading={isLoadingUpdate}
                disabled={isLoadingUpdate}
              >
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(PaymentSection);
