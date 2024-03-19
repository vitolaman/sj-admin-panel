import {
  GetPromoCodeQuery,
  PromoCodeI,
} from "_interfaces/promo-code.interfaces";
import ContentContainer from "components/container";
import CInput from "components/input";
import SearchInput from "components/search-input";
import Select from "components/select";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { listSpot, segmentUserOptions } from "data/promo-code";
import useUpsertPromoCodeForm from "hooks/promo-code/useUpsertPromoCodeForm";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import { IoClose, IoPencil, IoTrash } from "react-icons/io5";
import {
  useGetPromoCodesQuery,
  useLazyGetPromoCodeByIdQuery,
} from "services/modules/promo-code";

export const promoCodeRouteName = "promo-code";
const PromoCode = () => {
  const [params, setParams] = useState<GetPromoCodeQuery>({
    page: 1,
    limit: 10,
    search_promo_code: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { data, isLoading } = useGetPromoCodesQuery(params);
  const [getPromoCode, promoCodeDetailState] = useLazyGetPromoCodeByIdQuery();
  const {
    handleUpdate,
    handleCreate,
    register,
    errors,
    reset,
    control,
    loadingUpsert,
    defaultValues,
  } = useUpsertPromoCodeForm();

  useEffect(() => {
    if (promoCodeDetailState.data && showEdit) {
      reset({
        ...promoCodeDetailState.data,
        start_date: moment(promoCodeDetailState.data.start_date).format(
          "YYYY-MM-DD",
        ),
        end_date: moment(promoCodeDetailState.data.start_date).format(
          "YYYY-MM-DD",
        ),
      });
    }
  }, [promoCodeDetailState.data, showEdit]);

  const hideModal = () => {
    reset(defaultValues);
    setShowEdit(false);
    setShowCreate(false);
  };

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const getStatusColor = (
    is_active: boolean,
  ): { bgColor: string; textColor: string; status: string } => {
    if (is_active) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        status: "Active",
      };
    } else {
      return {
        bgColor: "bg-orange-200",
        textColor: "text-orange-800",
        status: "Inactive",
      };
    }
  };

  const header: Columns<PromoCodeI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "promo_code",
      label: "Promo Code",
    },
    {
      fieldId: "category",
      label: "Category",
    },
    {
      fieldId: "quantity",
      label: "Quota",
    },
    {
      fieldId: "description",
      label: "Description",
    },
    {
      fieldId: "min_exp",
      label: "Level",
      render: (item) => <>Level {item?.min_exp}</>,
    },
    {
      fieldId: "discount_percentage",
      label: "Discount",
      render: (item) => <span>{item?.discount_percentage}%</span>,
    },
    {
      fieldId: "start_date",
      label: "Start Date",
      render: (item) => (
        <>{moment(item?.start_date).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "end_date",
      label: "End Date",
      render: (item) => (
        <>{moment(item?.end_date).utc(true).format("DD/MM/yyyy HH:mm")}</>
      ),
    },
    {
      fieldId: "is_active",
      label: "Status",
      render: (item) => {
        const { bgColor, textColor, status } = getStatusColor(item?.is_active!);
        return (
          <span
            className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-2xl ${bgColor} ${textColor}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <div className="flex flex-row item-center justify-center gap-2">
          <Button
            shape="circle"
            className="hover:bg-gray-100"
            onClick={() => {
              // void handleEditButtonClick(row);
            }}
          >
            <IoPencil />
          </Button>
          <Button
            shape="circle"
            className="text-red-800 hover:bg-gray-100"
            onClick={() => {
              // handleDeleteButtonClick(row);
            }}
          >
            <IoTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Promo Code List</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) =>
              setParams((prev) => ({ ...prev, search_query: text }))
            }
          />
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
            onClick={() => {
              setShowCreate(true);
            }}
          >
            Create Promo Code
          </Button>
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<PromoCodeI>
          columns={header}
          loading={isLoading}
          data={data?.data}
          onRowClick={(user) => {
            getPromoCode(user.id);
            setShowEdit(true);
          }}
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
          }}
        >
          <Modal.Header className="flex flex-row justify-between">
            {showCreate && "Create Promo Code"}
            {showEdit && "Edit Promo Code"}
            <IoClose
              onClick={() => {
                hideModal();
              }}
            />
          </Modal.Header>
          <Modal.Body className="overflow-scroll">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Promo Code</label>
                <CInput
                  type="string"
                  {...register("name_promo_code")}
                  error={errors.name_promo_code}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Quota</label>
                <CInput
                  type="number"
                  {...register("quantity")}
                  error={errors.quantity}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Institution</label>
                <CInput
                  type="text"
                  {...register("institution")}
                  error={errors.institution}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Discount</label>
                <CInput
                  type="number"
                  {...register("discount_percentage")}
                  error={errors.discount_percentage}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Max Discount</label>
                <CInput
                  type="number"
                  {...register("max_discount")}
                  error={errors.max_discount}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Start Date</label>
                  <CInput
                    type="date"
                    {...register("start_date")}
                    error={errors.start_date}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">End Date</label>
                  <CInput
                    type="date"
                    {...register("end_date")}
                    error={errors.end_date}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Label Feature</label>
                <Controller
                  control={control}
                  name="segment_user"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      options={segmentUserOptions}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#262626]">Spot</label>
                <div className="flex flex-row gap-4 items-center">
                  {listSpot.map((item) => (
                    <div
                      key={item}
                      className="flex flex-row gap-4 items-center ml-2 py-2 px-3 border border-gray-200 rounded-lg cursor-pointer"
                    >
                      <Controller
                        control={control}
                        name="spot"
                        render={({ field: { value, onChange } }) => (
                          <input
                            type="checkbox"
                            className="scale-150"
                            id={item}
                            checked={value?.includes(item)}
                            value={item}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const prev = value ?? [];
                                onChange([...prev, item]);
                              } else {
                                const temp = value.filter(val => val !== item);
                                onChange(temp);
                              }
                            }}
                          />
                        )}
                      />
                      <label htmlFor={item} className="cursor-pointer">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={hideModal}
              loading={loadingUpsert}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={loadingUpsert}
            >
              Save
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </ContentContainer>
  );
};

export default PromoCode;
