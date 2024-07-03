import { GetUserQuery, UserI } from "_interfaces/user.interfaces";
import CInput from "components/input";
import SearchInput from "components/search-input";
import Select from "components/select";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { labelFeatureOptions } from "data/user";
import useUpdateUserForm from "hooks/user/useUpdateUserForm";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import {
  useGetUsersQuery,
  useLazyGetUserDetailQuery,
} from "services/modules/user";

const UserDatabase = () => {
  const [params, setParams] = useState<GetUserQuery>({
    page: 1,
    limit: 10,
    search_query: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const { data, isLoading } = useGetUsersQuery(params);
  const [getUserDetail, userDetailState] = useLazyGetUserDetailQuery();
  const { handleUpdate, register, errors, reset, control, loadingUpdate } =
    useUpdateUserForm(userDetailState.data?.id);

  useEffect(() => {
    if (userDetailState.data) {
      reset({
        ...userDetailState.data,
        birth_date: moment(userDetailState.data.birth_date).format(
          "YYYY-MM-DD",
        ),
      });
    }
  }, [userDetailState.data]);

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const getStatusColor = (
    endDate: string,
  ): { bgColor: string; textColor: string; status: string } => {
    const currentDate = moment().utc(true);
    const end = moment(endDate).utc(true);

    if (currentDate.isBefore(end)) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        status: "Active",
      };
    } else {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        status: "Active",
      };
    }
  };

  const header: Columns<UserI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Username & Seeds Tag",
    },
    {
      fieldId: "birth_date",
      label: "Date of Birth",
      render: (data) => {
        return moment(data?.birth_date).format("DD MMM YYYY");
      },
    },
    {
      fieldId: "created_at",
      label: "Account Created",
      render: (data) => {
        return moment(data?.created_at).format("DD MMM YYYY HH:mm:ss");
      },
    },
    {
      fieldId: "id",
      label: "Status",
      render: (data) => {
        const { bgColor, textColor, status } = getStatusColor(data?.id!);
        return (
          <span
            className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-2xl ${bgColor} ${textColor}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Users</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) =>
              setParams((prev) => ({ ...prev, search_query: text }))
            }
          />
        </div>
      </div>
      <div className="mt-4 max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
        <Table<UserI>
          columns={header}
          loading={isLoading}
          data={data?.data}
          onRowClick={(user) => {
            getUserDetail(user.id);
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
        open={showEdit}
      >
        <form
          onSubmit={async (e) => {
            await handleUpdate(e);
            setShowEdit(false);
          }}
        >
          <Modal.Header className="flex flex-row justify-between">
            Detail User
            <IoClose
              onClick={() => {
                setShowEdit(false);
              }}
            />
          </Modal.Header>
          <Modal.Body className="overflow-scroll">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Name</label>
                <CInput
                  type="string"
                  {...register("name")}
                  error={errors.name}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Seeds Tag</label>
                <CInput
                  type="string"
                  {...register("seeds_tag")}
                  error={errors.seeds_tag}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Date of Birth</label>
                <CInput
                  type="date"
                  {...register("birth_date")}
                  error={errors.birth_date}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Email</label>
                <CInput
                  type="email"
                  {...register("email")}
                  error={errors.email}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Phone Number</label>
                <CInput
                  type="tel"
                  {...register("phone_number")}
                  error={errors.phone_number}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Preference Community</label>
                <CInput
                  type="text"
                  {...register("community")}
                  error={errors.community}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Label Feature</label>
                <Controller
                  control={control}
                  name="user_role"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      options={labelFeatureOptions}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#262626]">
                  Verified User
                </label>
                <div className="flex flex-row gap-4 items-center ml-2">
                  <input
                    type="checkbox"
                    className="scale-150"
                    id="verified"
                    {...register("verified")}
                  />
                  <label htmlFor="verified">Verified</label>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <Button
              variant="outline"
              className="border-seeds text-seeds rounded-full px-10"
              onClick={() => {
                setShowEdit(false);
              }}
              loading={loadingUpdate}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full px-10"
              loading={loadingUpdate}
            >
              Save
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </div>
  );
};

export default UserDatabase;
