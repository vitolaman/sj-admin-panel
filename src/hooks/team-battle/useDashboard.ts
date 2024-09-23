import { GetTeamBattleQuery } from "_interfaces/team-battle.interface";
import { useState } from "react";
import { errorHandler } from "services/errorHandler";
import {
  useDeleteTeamBattleMutation,
  useGetTeamBattlesQuery,
  useLazyGetRegionListQuery,
  useLazyGetTeamBattleByIdQuery,
} from "services/modules/team-battle";

const useDashboard = () => {
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

  const handleDelete = async () => {
    try {
      await deleteTeamBattleById(confirmationModal.id!).unwrap();
      setConfirmationModal({ open: false });
      refetch();
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    getStatusColor,
    open,
    setOpen,
    openRegion,
    setOpenRegion,
    confirmationModal,
    setConfirmationModal,
    params,
    TeamBattleDetailState,
    getRegion,
    RegionState,
    data,
    isLoading,
    refetch,
    handlePageChange,
    handleCategoryChange,
    handleTypeChange,
    handleEdit,
    handleDelete,
  };
};

export default useDashboard;
