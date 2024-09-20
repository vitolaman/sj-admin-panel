import { TeamBattleReq } from "_interfaces/team-battle.interface";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

export const useDisplay = (
  watch: UseFormWatch<TeamBattleReq>,
  setValue: UseFormSetValue<TeamBattleReq>
) => {
  const publicMax = watch("public_max_participant");
  const communityMax = watch("community_max_participant");
  const universityMax = watch("university_max_participant");
  const provinceMax = watch("province_max_participant");
  const provinceIds = watch("province_ids");
  const semifinal = watch("semifinal_participant");
  const final = watch("final_participant");
  const registrationStart = watch("registration_start");
  const finalEnd = watch("final_end");
  const sponsors = watch("sponsors");
  const type = watch("type");
  const totalParticipants = () => {
    if (type === "UNIKOM") {
      return (
        (publicMax === undefined ? 0 : Number(publicMax)) +
        (communityMax === undefined ? 0 : Number(communityMax)) +
        (universityMax === undefined ? 0 : Number(universityMax))
      );
    } else {
      return (
        (publicMax === undefined ? 0 : Number(publicMax)) +
        (provinceMax === undefined ? 0 : Number(provinceMax)) *
          (provinceIds?.length === undefined ? 0 : provinceIds?.length)
      );
    }
  };

  setValue("participant", totalParticipants());

  setValue(
    "stage",
    `${
      watch("type") === "UNIKOM"
        ? `Semifinal: ${semifinal === undefined ? 0 : semifinal} `
        : ""
    }Final: ${final === undefined ? 0 : final}`
  );

  const dateStart = new Date(registrationStart);
  const dateEnd = new Date(finalEnd);
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

  setValue(
    "periode",
    `${convertDateStart !== "Invalid Date" ? convertDateStart : ""} ${
      convertTimeStart !== "Invalid Date"
        ? convertTimeStart.replace(".", ":")
        : ""
    } ${convertDateEnd !== "Invalid Date" ? `- ${convertDateEnd}` : ""} ${
      convertTimeEnd !== "Invalid Date" ? convertTimeEnd.replace(".", ":") : ""
    }`
  );

  setValue(
    "sponsor",
    sponsors
      .map((item) => item.name)
      .filter((item) => item !== "")
      .join(", ")
  );
};

export const Dependency = (
  watch: UseFormWatch<TeamBattleReq>,
  errors: FieldErrors<TeamBattleReq>
) => {
  const watchDepend = [
    watch("public_max_participant"),
    watch("province_max_participant"),
    watch("province_ids"),
    watch("final_participant"),
    watch("registration_start"),
    watch("final_end"),
    watch("community_max_participant"),
    watch("university_max_participant"),
    watch("semifinal_participant"),
  ];

  const participantDepend = [
    errors.public_max_participant,
    errors.community_max_participant,
    errors.university_max_participant,
    errors.community_invitation_code,
    errors.university_invitation_code,
  ];

  const periodeDepend = [
    errors.registration_start,
    errors.registration_end,
    errors.elimination_start,
    errors.elimination_end,
    errors.final_start,
    errors.final_end,
    errors.semifinal_start,
    errors.semifinal_end,
  ];

  const stageDepend = [errors.semifinal_participant, errors.final_participant];

  const watchDependencies =
    watch("type") === "UNIKOM" ? watchDepend : watchDepend.splice(0, 6);
  const participantDependencies =
    watch("type") === "UNIKOM"
      ? participantDepend
      : participantDepend.splice(0, 1);
  const periodeDependencies =
    watch("type") === "UNIKOM" ? periodeDepend : periodeDepend.splice(0, 6);
  const stageDependencies =
    watch("type") === "UNIKOM" ? stageDepend : stageDepend.splice(1, 1);

  return {
    watchDependencies,
    participantDependencies,
    periodeDependencies,
    stageDependencies,
  };
};
