import { useEffect, useState } from "react";
import useUpsertTeamBattle from "./useUpsertTeamBattle";
import useMultiCrop from "./useMultiCrop";
import moment from "moment";
import { TeamBattleModal } from "_interfaces/team-battle.interface";

const useTeamBattleForm = (props: Omit<TeamBattleModal, "loading">) => {
  const { data, refetch, open, requestId, setOpen } = props;
  const [sectionModal, setSectionModal] = useState<number>(0);
  const [tmpNumber, setTmpNumber] = useState<number>();
  console.log(tmpNumber)
  const [tmpImgArray, setTmpImgArray] = useState<{
    sponsor: { new: string; cropped: string }[];
    university: { new: string; cropped: string }[];
    community: { new: string; cropped: string }[];
  }>({ sponsor: [], university: [], community: [] });
  const [openInput, setOpenInput] = useState<{
    participant: boolean;
    stage: boolean;
    sponsor: boolean;
    periode: boolean;
  }>({ participant: false, stage: false, sponsor: false, periode: false });
  const [openCropper, setOpenCropper] = useState<
    Record<"sponsor" | "university" | "community", boolean>
  >({ sponsor: false, university: false, community: false });

  const {
    handleUpsert,
    register,
    errors,
    reset,
    loadingUpsert,
    setValue,
    watch,
    defaultValues,
    control,
    trigger,
  } = useUpsertTeamBattle(sectionModal);
  const category = watch("category");
  const [SDataState, UDataState, CDataState] = useMultiCrop({
    tmpNumber,
    setValue,
    watch,
    setTmpImgArray,
  });

  const handleOpen = (key: "sponsor" | "university" | "community") => {
    setOpenCropper((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetForm = () => {
    setSectionModal(0);
    setOpenInput({
      participant: false,
      stage: false,
      sponsor: false,
      periode: false,
    });
    setTmpImgArray({
      sponsor: [],
      university: [],
      community: [],
    });
    reset({ ...defaultValues });
  };

  const handleSubmit = async () => {
    if ((await trigger()) && sectionModal === 0) {
      setSectionModal(1);
    } else if (await trigger()) {
      await handleUpsert();
      refetch();
      handleResetForm();
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (data) {
      const dateFormat = (date: string) =>
        moment(date).format("YYYY-MM-DD HH:mm");
      const groupFilter = (group: string) =>
        data?.groups?.filter((item) => item.type === group);
      reset({
        ...data,
        province_ids: data.groups?.map((item) => item.province_id),
        participant:
          data.public_max_participant +
          data.community_max_participant +
          data.university_max_participant,
        min_participant: data.min_participant === -1 ? 0 : data.min_participant,
        registration_start: dateFormat(data?.registration_start),
        registration_end: dateFormat(data?.registration_end),
        elimination_start: dateFormat(data?.elimination_start),
        elimination_end: dateFormat(data?.elimination_end),
        semifinal_start: dateFormat(data?.semifinal_start),
        semifinal_end: dateFormat(data?.semifinal_end),
        final_start: dateFormat(data?.final_start),
        final_end: dateFormat(data?.final_end),
        university: groupFilter("UNIVERSITY")
          ? [...groupFilter("UNIVERSITY")]
          : [{ name: "", logo: "", type: "UNIVERSITY" }],
        community: groupFilter("COMMUNITY")
          ? [...groupFilter("COMMUNITY")]
          : [{ name: "", logo: "", type: "COMMUNITY" }],
      });
    }
  }, [data, requestId]);

  return {
    sectionModal,
    setSectionModal,
    setOpenInput,
    setTmpNumber,
    tmpImgArray,
    openInput,
    openCropper,
    register,
    errors,
    watch,
    setValue,
    loadingUpsert,
    control,
    category,
    SDataState,
    UDataState,
    CDataState,
    handleSubmit,
    handleOpen,
    handleResetForm,
  };
};

export default useTeamBattleForm;
