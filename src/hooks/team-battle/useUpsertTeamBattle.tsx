import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { uploadFile } from "services/modules/file";
import { useAppSelector } from "store";
import {
  useCreateTeamBattleMutation,
  useUpdateTeamBattleMutation,
} from "services/modules/team-battle";
import { TeamBattleReq } from "_interfaces/team-battle.interface";
import { useState } from "react";

const useUpsertTeamBattle = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [updateTeamBattle] = useUpdateTeamBattleMutation();
  const [createTeamBattle] = useCreateTeamBattleMutation();
  const [loadingUpsert, setLoadingUpsert] = useState<boolean>(false);

  const yupNumberValidation = ({
    min = 1,
    max = 9007199254740991,
    text,
  }: {
    min?: number;
    max?: number;
    text: string;
  }) => {
    return yup
      .number()
      .typeError(`${text} must be a number`)
      .required(`${text} cannot be empty`)
      .min(min, `${text} cannot be zero`)
      .max(max, `${text} value over max limit`);
  };
  const yupDateValidation = (text: string) => {
    return yup
      .date()
      .required("Please input date")
      .min(yup.ref(text), `Date must be after ${text.replace("_", " ")} date`)
      .typeError("Invalid date");
  };
  const yupImageValidation = (name: string, text: string) => {
    return yup.mixed().test(name, text, (value) => {
      if (
        (typeof value === "string" && value !== "") ||
        (typeof value === "object" && value.length > 0)
      ) {
        return true;
      }
      return false;
    });
  };

  const schema = yup.object().shape({
    title: yup.string().required("Title cannot empty"),
    initial_balance: yupNumberValidation({ text: "Initial Balance" }),
    min_participant: yup
      .number()
      .max(yup.ref("participant"), `Minimum Participant value over max limit`),
    public_max_participant: yupNumberValidation({
      text: "Public Participant",
    }),
    province_max_participant: yup.number().when("type", {
      is: "PROVINCE",
      then: yupNumberValidation({ text: "Province Participant" }),
    }),
    province_invitation_code: yup.string().when("type", {
      is: "PROVINCE",
      then: yup
        .string()
        .required("Invitation code cannot empty")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Invitation code cannot contain symbols and spaces"
        ),
    }),
    province_ids:yup.array().when("type", {
      is: "PROVINCE",
      then:yup.array().min(1, "Province must be selected").required("Province must be selected")
    }),
    community_max_participant: yup.number().when("type", {
      is: "UNIKOM",
      then: yupNumberValidation({ text: "Community Participant" }),
    }),
    community_invitation_code: yup.string().when("type", {
      is: "UNIKOM",
      then: yup
        .string()
        .required("Invitation code cannot empty")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Invitation code cannot contain symbols and spaces"
        ),
    }),
    university_max_participant: yup.number().when("type", {
      is: "UNIKOM",
      then: yupNumberValidation({ text: "University Participant" }),
    }),
    university_invitation_code: yup.string().when("type", {
      is: "UNIKOM",
      then: yup
        .string()
        .required("Invitation code cannot empty")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Invitation code cannot contain symbols and spaces"
        ),
    }),
    semifinal_participant: yup.number().when("type", {
      is: "UNIKOM",
      then: yupNumberValidation({ text: "Semifinal Participant" }),
    }),
    final_participant: yup
      .number()
      .typeError("Final Participant must be a number")
      .required("Final Participant cannot be empty")
      .when("type", {
        is: "UNIKOM",
        then: yup
          .number()
          .max(
            yup.ref("semifinal_participant"),
            "Final Participant value over max limit"
          ),
        otherwise: yup
          .number()
          .max(
            yup.ref("participant"),
            "Final Participant value over max limit"
          ),
      }),
    stage: yup
      .string()
      .test(
        "calculation",
        "Stage Qualification should not be greater than Maximum Participant",
        function () {
          const parentParticipant = this.parent.participant;
          const parentSemifinal = this.parent.semifinal_participant;
          const parentFinal = this.parent.final_participant;
          const participant =
            parentParticipant === undefined ? 0 : parentParticipant;
          const semifinalParticipant =
            parentSemifinal === undefined ? 0 : parentSemifinal;
          const finalParticipant = parentFinal === undefined ? 0 : parentFinal;
          return semifinalParticipant + finalParticipant <= participant;
        }
      ),
    registration_start: yup
      .date()
      .required("Please input date")
      .typeError("invalid date"),
    registration_end: yupDateValidation("registration_start"),
    elimination_start: yupDateValidation("registration_end"),
    elimination_end: yupDateValidation("elimination_start"),
    semifinal_start: yup.date().when("type", {
      is: "UNIKOM",
      then: yupDateValidation("elimination_end"),
    }),
    semifinal_end: yup.date().when("type", {
      is: "UNIKOM",
      then: yupDateValidation("semifinal_start"),
    }),
    final_start: yup.date().when("type", {
      is: "UNIKOM",
      then: yupDateValidation("semifinal_end"),
      otherwise: yupDateValidation("elimination_end"),
    }),
    final_end: yupDateValidation("final_start"),
    banner: yupImageValidation("banner", "Banner cannot be empty"),
    prize: yup.array().of(
      yup.object().shape({
        amount: yupNumberValidation({ text: "Amount" }),
        description: yup.string().notRequired(),
      })
    ),
    tnc: yup.object().shape({
      id: yup.string().required("Indonesian TnC cannot empty"),
      en: yup.string().required("English TnC cannot empty"),
    }),
    university: yup.array().when("type", {
      is: "UNIKOM",
      then: yup.array().of(
        yup.object().shape({
          name: yup.string().required("Name cannot be empty"),
          logo: yupImageValidation("univ-type", "Logo cannot be empty"),
        })
      ),
    }),
    community: yup.array().when("type", {
      is: "UNIKOM",
      then: yup.array().of(
        yup.object().shape({
          name: yup.string().required("Name cannot be empty"),
          logo: yupImageValidation("com-type", "Logo cannot be empty"),
        })
      ),
    }),
  });
  const defaultValues = {
    category: [],
    sponsors: [{ name: "", logo: "" }],
    prize: [
      { amount: 0, description: "" },
      { amount: 0, description: "" },
      { amount: 0, description: "" },
    ],
    university: [{ name: "", logo: "", type: "UNIVERSITY" }],
    community: [{ name: "", logo: "", type: "COMMUNITY" }],
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    trigger,
    watch,
    reset,
    setValue,
  } = useForm<TeamBattleReq>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const firstTrigger = async () => {
    if (watch("type") === "UNIKOM") {
      return await trigger([
        "title",
        "initial_balance",
        "min_participant",
        "public_max_participant",
        "community_max_participant",
        "university_max_participant",
        "community_invitation_code",
        "university_invitation_code",
        "stage",
        "semifinal_participant",
        "final_participant",
        "registration_start",
        "registration_end",
        "elimination_start",
        "elimination_end",
        "semifinal_start",
        "semifinal_end",
        "final_start",
        "final_end",
        "banner",
        "tnc",
        "prize",
      ]);
    } else {
      return await trigger();
    }
  };

  const secondTrigger = async () => {
    if (watch("type") === "UNIKOM") {
      return await trigger(["university", "community"]);
    }
  };

  const upsert = async (data: TeamBattleReq) => {
    try {
      setLoadingUpsert(true);
      const payload: TeamBattleReq = {
        ...data,
        min_participant:
          typeof data?.min_participant === "string"
            ? Number(data?.min_participant) !== 0
              ? Number(data?.min_participant)
              : -1
            : data?.min_participant !== 0
            ? data?.min_participant
            : -1,
      };

      if (data.type === "UNIKOM") {
        payload.university_invitation_code =
          data.university_invitation_code?.toUpperCase();
        payload.community_invitation_code =
          data.community_invitation_code?.toUpperCase();
        if (data.university && data.university.length > 0) {
          for (let i = 0; i < data.university.length; i++) {
            if (
              typeof data.university[i].logo[0] !== "string" &&
              data.university[i].logo[0] !== undefined
            ) {
              const logoUrl = await uploadFile(
                accessToken!,
                data.university[i].logo[0] as File
              );
              if (payload.university) {
                payload.university[i].logo = logoUrl;
              }
            }
          }
        }
        if (data.community && data.community.length > 0) {
          for (let i = 0; i < data.community.length; i++) {
            if (
              typeof data.community[i].logo[0] !== "string" &&
              data.community[i].logo[0] !== undefined
            ) {
              const logoUrl = await uploadFile(
                accessToken!,
                data.community[i].logo[0] as File
              );
              if (payload.community) {
                payload.community[i].logo = logoUrl;
              }
            }
          }
        }
        if (payload.university || payload.community) {
          payload.groups = [
            ...payload.university?.filter((item) => item.logo && item.name)!,
            ...payload.community?.filter((item) => item.logo && item.name)!,
          ];
        }
      } else {
        payload.province_invitation_code =
          data.province_invitation_code?.toUpperCase();
        payload.province_ids = (data.province_ids as any[])?.map(
          (item) => item.value
        );
      }

      if (data.banner.length > 0) {
        if (typeof data.banner !== "string" && data.banner !== undefined) {
          const imageUrl = await uploadFile(
            accessToken!,
            data.banner[0] as File
          );
          payload.banner = imageUrl;
        }
      }
      if (data.sponsors && data.sponsors.length > 0) {
        for (let i = 0; i < data.sponsors.length; i++) {
          if (
            typeof data.sponsors[i].logo[0] !== "string" &&
            data.sponsors[i].logo[0] !== undefined
          ) {
            const logoUrl = await uploadFile(
              accessToken!,
              data.sponsors[i].logo[0] as File
            );
            payload.sponsors[i].logo = logoUrl;
          }
        }
      } else if (data.sponsors && data.sponsors.length === 0) {
        payload.sponsors = [{ name: "Seeds", logo: "" }];
      }

      delete payload.community;
      delete payload.university;
      delete payload.participant;
      delete payload.periode;
      delete payload.stage;
      delete payload.sponsor;
      if (data.id) {
        await updateTeamBattle(payload).unwrap();
        toast.success("Updating a team battle was successful");
      } else {
        await createTeamBattle(payload).unwrap();
        toast.success("Creating a team battle was successful");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingUpsert(false);
    }
  };
  const handleUpsert = handleSubmit(upsert);
  return {
    handleUpsert,
    register,
    errors,
    control,
    loadingUpsert,
    watch,
    reset,
    setValue,
    defaultValues,
    firstTrigger,
    secondTrigger,
  };
};

export default useUpsertTeamBattle;
