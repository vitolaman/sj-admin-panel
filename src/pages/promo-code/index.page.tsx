import {
  GetPromoCodeQuery,
  PromoCodeI,
} from "_interfaces/promo-code.interfaces";
import ContentContainer from "components/container";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import moment from "moment";
import { useState } from "react";
import { Button, Dropdown } from "react-daisyui";
import {
  useDeletePromoCodeMutation,
  useGetPromoCodesQuery,
  useLazyGetPromoCodeByIdQuery,
} from "services/modules/promo-code";
import Filter from "./sections/filter.section";
import { FiEdit, FiFilter, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import PromoCodeForm from "./sections/form.section";
import ConfirmationModal from "components/confirmation-modal";
import { errorHandler } from "services/errorHandler";

export const promoCodeRouteName = "promo-code";
const defaultValueParams = {
  page: 1,
  limit: 10,
  search_promo_code: "",
  start_date_from: "",
  start_date_until: "",
};
const PromoCode = () => {
  const [params, setParams] = useState<GetPromoCodeQuery>(defaultValueParams);
  const [promoCodeData, setPromoCodeData] = useState<PromoCodeI>();
  const [open, setOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const { data, isLoading, refetch } = useGetPromoCodesQuery(params);
  const [getPromoCode] = useLazyGetPromoCodeByIdQuery();
  const [deletePromoCodeById] = useDeletePromoCodeMutation();

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };
  const handleEdit = async (id: string) => {
    try {
      const data = await getPromoCode(id).unwrap();
      setPromoCodeData(data);
      setOpen(!open);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deletePromoCodeById(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
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
      fieldId: "type",
      label: "Category",
      render: (item) => <>{item?.type.split(",").join(", ")}</>,
    },
    {
      fieldId: "quantity",
      label: "Quota",
      render: (item) => (
        <>{item?.quantity?.toLocaleString().split(",").join(".")}</>
      ),
    },
    {
      fieldId: "description",
      label: "Description",
    },
    {
      fieldId: "min_exp",
      label: "Level",
      render: (item) => {
        const level = item?.min_exp;
        return (
          <p className="font-poppins font-normal text-sm text-[#201B1C]">
            Level{" "}
            {level === 175000
              ? "4"
              : level === 25000
              ? "3"
              : level === 3500
              ? "2"
              : level === 500
              ? "1"
              : "0"}
          </p>
        );
      },
    },
    {
      fieldId: "",
      label: "Discount",
      render: (item) => (
        <span className="font-poppins font-normal text-sm text-[#4DA81C]">
          {item?.discount_amount !== undefined
            ? `Rp. ${item?.discount_amount
                ?.toLocaleString()
                ?.split(",")
                ?.join(".")}`
            : `${item?.discount_percentage
                ?.toLocaleString()
                ?.split(",")
                ?.join(".")}%`}
        </span>
      ),
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
        return (
          <span
            className={`px-2 py-1 font-poppins rounded-[4px] ${
              item?.is_active
                ? "bg-[#DCFCE4] text-persian-green"
                : "bg-[#FFF7D2] text-[#D89918]"
            }`}
          >
            {item?.is_active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <Dropdown horizontal="left" vertical="top">
          <Dropdown.Toggle size="xs">
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white z-10 w-[107px] rounded-[10px] flex flex-col gap-2">
            <Dropdown.Item
              className="p-0"
              onClick={() => {
                if (item?.id !== undefined) {
                  handleEdit(item?.id);
                }
              }}
            >
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
                startIcon={<FiEdit color="#201B1C" size={20} />}
              >
                Edit
              </Button>
            </Dropdown.Item>
            <Dropdown.Item className="p-0">
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#FF3838]"
                startIcon={<FiTrash2 color="#FF3838" size={20} />}
                onClick={() => {
                  setConfirmationModal({ id: item?.id, open: true });
                }}
              >
                Delete
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <ContentContainer>
      <ConfirmationModal
        isOpen={confirmationModal.open}
        onClose={() => {
          setConfirmationModal({ open: false });
        }}
        onConfirm={handleDelete}
        alertType="delete"
        title="Delete Promo Code?"
        subTitle="Are you sure to delete this promo code?"
        yesText="Delete"
        noText="Cancel"
      />
      <Filter
        open={openFilter}
        setOpen={setOpenFilter}
        setParams={setParams}
        defaultValue={defaultValueParams}
      />
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl font-poppins">Promo Code List</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) =>
              setParams((prev) => ({
                ...prev,
                page: 1,
                search_promo_code: text,
              }))
            }
          />
          <Button
            shape="circle"
            className="border-seeds hover:border-seeds"
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
          >
            <FiFilter color="#3ac4a0" size={20} />
          </Button>
          <Button
            className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10 font-semibold font-poppins text-base"
            onClick={() => {
              setOpen(!open);
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
        />
      </div>
      <div className="flex flex-col">
        <Pagination
          currentPage={data?.metadata?.currentPage ?? 1}
          totalPages={
            Math.ceil((data?.metadata?.total ?? 0) / params.limit) ?? 0
          }
          onPageChange={handlePageChange}
        />
      </div>
      <PromoCodeForm
        open={open}
        promoCodeData={promoCodeData}
        setOpen={setOpen}
        setPromoCodeData={setPromoCodeData}
        refetch={refetch}
      />
    </ContentContainer>
  );
};

export default PromoCode;
