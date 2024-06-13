import { useEffect, useState } from "react";
import ContentContainer from "components/container";
import { Button, FileInput, Modal, Tooltip } from "react-daisyui";
import { Columns, Table } from "components/table/table";
import { IoClose } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Controller } from "react-hook-form";
import Select from "components/select";
import CInput from "components/input";
import { errorHandler } from "services/errorHandler";
import { toast } from "react-toastify";
import {
  useGetCompanyListQuery,
  useUpdateEligibilityMutation,
  useUpdateStatusMutation,
} from "services/modules/company";
import Pagination from "components/table/pagination";
import { CompanyI, GetCompanyParams } from "_interfaces/company.interfaces";
import moment from "moment";
import {
  MdBlock,
  MdEdit,
  MdLock,
  MdLockOpen,
  MdVerified,
} from "react-icons/md";
import useUpdateCompanyForm from "hooks/company/useUpdateCompanyForm";

export const companyRouteName = "company";

const Company = () => {
  const [dateModal, setDateModal] = useState<{
    show: boolean;
    company?: CompanyI;
  }>({ show: false });
  const [params, setParams] = useState<GetCompanyParams>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, refetch } = useGetCompanyListQuery(params);
  const {
    isLoadingUpdate,
    updateExpiryState,
    register,
    errors,
    handleUpdate,
    reset,
  } = useUpdateCompanyForm(dateModal?.company?.id);
  const [udpateStatus] = useUpdateStatusMutation();
  const [udpateEligibility] = useUpdateEligibilityMutation();

  const header: Columns<CompanyI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Company Name",
    },
    {
      fieldId: "is_active",
      label: "Status",
      render: (data) => (
        <div className="flex flex-row gap-4 justify-center items-end">
          <Tooltip
            position="bottom"
            message={
              data?.is_active ? "Deactivate Company" : "Activate Company"
            }
            color="error"
          >
            <Button
              onClick={() => {
                handleUpdateStatus(data!);
              }}
              size="xs"
            >
              {data?.is_active ? <MdLock /> : <MdLockOpen />}
            </Button>
          </Tooltip>
          <div>{data?.is_active ? "Active" : "Inactive"}</div>
        </div>
      ),
    },
    {
      fieldId: "is_production_eligible",
      label: "Production Eligible",
      render: (data) => (
        <div className="flex flex-row gap-4 justify-center items-end">
          <Tooltip
            position="bottom"
            message={data?.is_active ? "Set not eligible" : "Set Eligible"}
            color="error"
          >
            <Button
              size="xs"
              onClick={() => {
                handleUpdateEligibility(data!);
              }}
            >
              {data?.is_active ? <MdBlock /> : <MdVerified />}
            </Button>
          </Tooltip>
          <div>
            {data?.is_production_eligible ? "Eligible" : "Not Eligible"}
          </div>
        </div>
      ),
    },
    {
      fieldId: "plan_expiry_date",
      label: "Active Until",
      render: (data) => (
        <div className="flex flex-row gap-4 justify-center items-end">
          <div>
            {data?.is_active
              ? moment(data.plan_expiry_date).format("D MMM YYYY")
              : "-"}
          </div>
          <Button
            onClick={() => {
              setDateModal({ show: true, company: data });
              reset({
                production_expiration_date: moment(
                  data?.plan_expiry_date,
                ).format("YYYY-MM-DD"),
                sandbox_expiration_date: moment(
                  data?.plan_sandbox_expiry_date,
                ).format("YYYY-MM-DD"),
              });
            }}
            size="xs"
          >
            <MdEdit />
          </Button>
        </div>
      ),
    },
  ];

  const handleUpdateEligibility = async (company: CompanyI) => {
    try {
      await udpateEligibility({
        is_production_eligible: !company.is_production_eligible,
        id: company.id,
      }).unwrap();
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdateStatus = async (company: CompanyI) => {
    try {
      await udpateStatus({
        is_active: !company.is_active,
        id: company.id,
      }).unwrap();
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    if (updateExpiryState.isSuccess) {
      setDateModal({ show: false });
      refetch();
    }
  }, [updateExpiryState]);

  return (
    <>
      <ContentContainer>
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl">Company List</h1>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<CompanyI>
            columns={header}
            data={data?.data}
            loading={isLoading}
          />
        </div>
        <div className="flex flex-col">
          <Pagination
            currentPage={data?.metadata?.currentPage ?? 1}
            totalPages={data?.metadata?.totalPage ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      </ContentContainer>

      <Modal
        className="bg-white w-2/3 max-w-[900px]"
        open={dateModal.show}
      >
        <form onSubmit={handleUpdate}>
          <Modal.Header className="flex flex-row justify-between">
            Update Expiry Date
            <IoClose onClick={() => setDateModal({ show: false })} />
          </Modal.Header>
          <Modal.Body className="overflow-scroll px-2">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Production Expiration Date
                </label>
                <CInput
                  type="date"
                  {...register("production_expiration_date")}
                  error={errors.production_expiration_date}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Sandbox Expiration Date</label>
                <CInput
                  type="date"
                  {...register("sandbox_expiration_date")}
                  error={errors.sandbox_expiration_date}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              type="reset"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setDateModal({ show: false });
              }}
              loading={isLoadingUpdate}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={isLoadingUpdate}
            >
              Save
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </>
  );
};

export default Company;

