import ContentContainer from "components/container";
import { useState } from "react";
import { Columns, Table } from "components/table/table";
import Pagination from "components/table/pagination";
import { Button, Dropdown, Tabs } from "react-daisyui";
import { FiEdit, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { errorHandler } from "services/errorHandler";
import TeamBattleForm from "./sections/form.section";
import {
  GetTeamBattleQuery,
  TeamBattleI,
} from "_interfaces/team-battle.interface";
import {
  useDeleteTeamBattleMutation,
  useGetTeamBattlesQuery,
  useLazyGetRegionListQuery,
  useLazyGetTeamBattleByIdQuery,
} from "services/modules/team-battle";
import ConfirmationModal from "components/confirmation-modal";
import ItemCategory from "./sections/itemCategory.section";
import RegionManagement from "./sections/region.section";

export const teamBattleRouteName = "team-battle";
const TeamBattle = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openRegion, setOpenRegion] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    id?: string;
    open: boolean;
  }>({ open: false });
  const [params, setParams] = useState<GetTeamBattleQuery>({
    page: 1,
    limit: 10,
    category: "",
    type: "UNIKOM",
  });
  const [getTeamBattle, TeamBattleDetailState] =
    useLazyGetTeamBattleByIdQuery();
  const [getRegion, RegionState] = useLazyGetRegionListQuery();
  const { data, isLoading, refetch } = useGetTeamBattlesQuery(params);
  const [deleteTeamBattleById] = useDeleteTeamBattleMutation();

  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };
  const handleCategoryChange = (category: string): void => {
    setParams((prev) => ({ ...prev, page: 1, category }));
  };
  const handleTypeChange = (type: string): void => {
    setParams((prev) => ({ ...prev, page: 1, category: "", type }));
  };
  const handleEdit = async (id: string) => {
    try {
      await getTeamBattle(id).unwrap();
      setOpen(!open);
    } catch (error) {
      errorHandler(error);
    }
  };

  const getStatusColor = (
    status: string
  ): { bgColor: string; textColor: string } => {
    if (status === "OPEN") {
      return {
        bgColor: "bg-[#FFF7D2]",
        textColor: "text-[#D89918]",
      };
    } else if (status === "ENDED") {
      return { bgColor: "bg-[#E9E9E9]", textColor: "text-[#7C7C7C]" };
    } else if (status === "CANCELED") {
      return { bgColor: "bg-[#FFEBEB]", textColor: "text-[#BB1616]" };
    } else {
      return {
        bgColor: "bg-[#DCFCE4]",
        textColor: "text-persian-green",
      };
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTeamBattleById(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  const header: Columns<TeamBattleI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "title",
      label: "Title",
      render: (item) => (
        <p className="font-poppins font-normal text-sm text-[#201B1C]">
          {item?.title.length! > 16
            ? `${item?.title.substring(0, 15)}...`
            : item?.title!}
        </p>
      ),
    },
    {
      fieldId: "",
      label: "Participant",
      render: (item) => (
        <p className="font-poppins font-normal text-sm text-[#201B1C]">
          {item?.joined_participant! > 0 ? item?.joined_participant : 0}
        </p>
      ),
    },
    {
      fieldId: "",
      label: "Max Participant",
      render: (item) => (
        <p className="font-poppins font-normal text-sm text-[#201B1C]">
          {item?.max_participant! > 0 ? item?.max_participant : 0}
        </p>
      ),
    },
    {
      fieldId: "",
      label: "Periode Game",
      render: (item) => {
        const dateStart = new Date(item?.registration_start!);
        const dateEnd = new Date(item?.final_end!);
        const convertDateStart = dateStart.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "2-digit",
          year: "numeric",
        });
        const convertDateEnd = dateEnd.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "2-digit",
          year: "numeric",
        });
        const convertTimeStart = dateStart.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const convertTimeEnd = dateEnd.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <p className="font-normal font-poppins text-sm text-[#201B1C]">
            {`${convertDateStart} ${convertTimeStart.replace(
              ".",
              ":"
            )} - ${convertDateEnd} ${convertTimeEnd.replace(".", ":")}`}
          </p>
        );
      },
    },
    {
      fieldId: "",
      label: "Status",
      render: (item) => {
        const { bgColor, textColor } = getStatusColor(item?.status!);
        return (
          <span
            className={`px-2 py-1 font-poppins rounded-[4px] capitalize ${bgColor} ${textColor}`}
          >
            {item?.status.toLocaleLowerCase()}
          </span>
        );
      },
    },
    {
      fieldId: "id",
      label: "Action",
      render: (item) => (
        <Dropdown horizontal="left" vertical="top">
          <Dropdown.Toggle size="xs" button={false}>
            <Button size="xs" className="border-none p-0">
              <FiMoreHorizontal color="#27a590" size={20} />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-white w-[140px] z-10 rounded-[10px] flex flex-col gap-2">
            <Dropdown.Item
              className="p-0"
              onClick={() => {
                setOpen(!open);
                handleEdit(item?.id!);
              }}
            >
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
                startIcon={<FiEdit color="#201B1C" size={20} />}
              >
                Edit Battle
              </Button>
            </Dropdown.Item>
            <Dropdown.Item
              className="p-0"
              onClick={() => {
                setConfirmationModal({ id: item?.id, open: true });
              }}
            >
              <Button
                fullWidth
                size="xs"
                className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#FF3838]"
                startIcon={<FiTrash2 color="#FF3838" size={20} />}
              >
                Delete Battle
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
        title="Delete Team Battle?"
        subTitle="Are you sure to delete this team battle?"
        yesText="Delete"
        noText="Cancel"
      />
      <RegionManagement
        open={openRegion}
        setOpen={setOpenRegion}
        getRegion={getRegion}
        data={RegionState.data?.data}
      />
      <TeamBattleForm
        data={TeamBattleDetailState.data!}
        requestId={TeamBattleDetailState.requestId!}
        loading={TeamBattleDetailState.isLoading}
        open={open}
        setOpen={setOpen}
        refetch={refetch}
      />
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start font-semibold md:text-2xl text-lg font-poppins">
            Team Battle
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-fit">
            <Button
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full md:px-10"
              onClick={() => {
                setOpenRegion(!openRegion);
                getRegion({ limit: 10, page: 1, search: "" });
              }}
            >
              Add Region
            </Button>
            <Button
              className="bg-seeds hover:bg-seeds-300 border-seeds hover:border-seeds-300 text-white rounded-full md:px-10"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Create New Game
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Tabs className="w-fit font-semibold text-base font-poppins overflow-auto">
            <Tabs.Tab
              active={"UNIKOM" === params.type}
              onClick={() => {
                handleTypeChange("UNIKOM");
              }}
              className={`${
                "UNIKOM" === params.type
                  ? "border-b-4 !border-[#27A590] text-[#27A590]"
                  : "border-b border-[#BDBDBD] text-[#BDBDBD]"
              }`}
            >
              Campus & Community Clash
            </Tabs.Tab>
            <Tabs.Tab
              active={"PROVINCE" === params.type}
              onClick={() => {
                handleTypeChange("PROVINCE");
              }}
              className={`${
                "PROVINCE" === params.type
                  ? "border-b-4 !border-[#27A590] text-[#27A590]"
                  : "border-b border-[#BDBDBD] text-[#BDBDBD]"
              }`}
            >
              Regional Clash
            </Tabs.Tab>
          </Tabs>
          <Dropdown className="sm:self-end sm:w-[160px]">
            <Dropdown.Toggle
              button={false}
              className="font-poppins text-[#201B1C] cursor-pointer"
            >{`Category: ${
              params.category === "ID_STOCK"
                ? "ID Stock"
                : params.category === "US_STOCK"
                ? "US Stock"
                : params.category === "CRYPTO"
                ? "Crypto"
                : "ALL"
            }`}</Dropdown.Toggle>
            <Dropdown.Menu className="bg-white w-[140px] z-10 rounded-[10px] flex flex-col gap-2">
              <ItemCategory
                onClick={() => handleCategoryChange("")}
                type={"ALL"}
              />
              <ItemCategory
                onClick={() => handleCategoryChange("ID_STOCK")}
                type={"ID Stock"}
              />
              <ItemCategory
                onClick={() => handleCategoryChange("US_STOCK")}
                type={"US Stock"}
              />
              <ItemCategory
                onClick={() => handleCategoryChange("CRYPTO")}
                type={"Crypto"}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<TeamBattleI>
            columns={header}
            loading={isLoading}
            data={data?.data}
            currentPage={params.page}
            limit={params.limit}
          />
        </div>
        <div className="flex flex-col">
          <Pagination
            currentPage={data?.metadata?.current_page ?? 1}
            totalPages={data?.metadata.total_page ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default TeamBattle;
