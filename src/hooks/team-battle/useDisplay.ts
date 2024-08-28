import { TeamBattleReq } from "_interfaces/team-battle.interface";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

const useDisplay = (
  watch: UseFormWatch<TeamBattleReq>,
  setValue: UseFormSetValue<TeamBattleReq>
) => {
  const publicMax = watch("public_max_participant");
  const communityMax = watch("community_max_participant");
  const universityMax = watch("university_max_participant");
  const semifinal = watch("semifinal_participant");
  const final = watch("final_participant");
  const registrationStart = watch("registration_start");
  const finalEnd = watch("final_end");
  const sponsors = watch(`sponsors`);
  const totalParticipants =
    (publicMax === undefined ? 0 : Number(publicMax)) +
    (communityMax === undefined ? 0 : Number(communityMax)) +
    (universityMax === undefined ? 0 : Number(universityMax));
  setValue(
    "participant",
    Number.isNaN(totalParticipants) ? 0 : totalParticipants
  );

  setValue(
    "stage",
    `Semifinal: ${semifinal === undefined ? 0 : semifinal}; Final: ${
      final === undefined ? 0 : final
    }`
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

export default useDisplay;
