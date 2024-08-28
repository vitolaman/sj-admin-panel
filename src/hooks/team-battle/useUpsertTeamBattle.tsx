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
    max = 9000000000000000000,
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
  const schema = yup.object().shape({
    title: yup.string().required("Title cannot empty"),
    prize: yup.array().of(
      yup.object().shape({
        amount: yupNumberValidation({ text: "Amount" }),
        description: yup.string().notRequired(),
      })
    ),
    min_participant: yup
      .number()
      .max(yup.ref("participant"), `Minimum Participant value over max limit`),
    public_max_participant: yupNumberValidation({ text: "Public Participant" }),
    community_max_participant: yupNumberValidation({
      text: "Community Participant",
    }),
    university_max_participant: yupNumberValidation({
      text: "University Participant",
    }),
    semifinal_participant: yupNumberValidation({
      text: "Semifinal Participant",
    }),
    final_participant: yup
      .number()
      .typeError("Final Participant must be a number")
      .required("Final Participant cannot be empty")
      .max(
        yup.ref("semifinal_participant"),
        "Final Participant value over max limit"
      ),
    stage: yup
      .string()
      .test(
        "calculation",
        "Stage Qualification should not be greater than Maximum Participant",
        function () {
          const participant = Number.isNaN(this.parent.participant)
            ? 0
            : this.parent.participant;

          const semifinal_participant = Number.isNaN(
            this.parent.semifinal_participant
          )
            ? 0
            : this.parent.semifinal_participant;

          const final_participant = Number.isNaN(this.parent.final_participant)
            ? 0
            : this.parent.final_participant;

          return semifinal_participant + final_participant <= participant;
        }
      ),
    community_invitation_code: yup
      .string()
      .required("Invitation code cannot empty")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Invitation code cannot contain symbols and spaces"
      ),
    university_invitation_code: yup
      .string()
      .required("Invitation code cannot empty")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Invitation code cannot contain symbols and spaces"
      ),
    tnc: yup.object().shape({
      id: yup.string().required("Indonesian TnC cannot empty"),
      en: yup.string().required("English TnC cannot empty"),
    }),
    registration_start: yup
      .date()
      .required("Please input date")
      .typeError("invalid date"),
    registration_end: yupDateValidation("registration_start"),
    elimination_start: yupDateValidation("registration_end"),
    elimination_end: yupDateValidation("elimination_start"),
    semifinal_start: yupDateValidation("elimination_end"),
    semifinal_end: yupDateValidation("semifinal_start"),
    final_start: yupDateValidation("semifinal_end"),
    final_end: yupDateValidation("final_start"),
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

  const create = async (data: TeamBattleReq) => {
    try {
      setLoadingUpsert(true);
      const payload: TeamBattleReq = {
        ...data,
        university_invitation_code:
          data.university_invitation_code.toUpperCase(),
        community_invitation_code: data.community_invitation_code.toUpperCase(),
        min_participant:
          typeof data?.min_participant === "string"
            ? Number(data?.min_participant) !== 0
              ? Number(data?.min_participant)
              : -1
            : data?.min_participant !== 0
            ? data?.min_participant
            : -1,
      };
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
      }
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
      delete payload.community;
      delete payload.university;
      delete payload.participant;
      delete payload.periode;
      delete payload.stage;
      delete payload.sponsor;
      await createTeamBattle(payload).unwrap();
      toast.success("Creating a team battle was successful");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingUpsert(false);
    }
  };

  const update = async (data: TeamBattleReq) => {
    try {
      setLoadingUpsert(true);

      const payload: TeamBattleReq = {
        ...data,
        university_invitation_code:
          data.university_invitation_code.toUpperCase(),
        community_invitation_code: data.community_invitation_code.toUpperCase(),
        min_participant:
          typeof data?.min_participant === "string"
            ? Number(data?.min_participant) !== 0
              ? Number(data?.min_participant)
              : -1
            : data?.min_participant !== 0
            ? data?.min_participant
            : -1,
      };
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
      }
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
      delete payload.community;
      delete payload.university;
      delete payload.participant;
      delete payload.periode;
      delete payload.stage;
      delete payload.sponsor;
      await updateTeamBattle(payload).unwrap();
      toast.success("Updating a team battle was successful");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingUpsert(false);
    }
  };
  const handleUpdate = handleSubmit(update);
  const handleCreate = handleSubmit(create);
  return {
    handleCreate,
    handleUpdate,
    register,
    errors,
    control,
    loadingUpsert,
    trigger,
    watch,
    reset,
    setValue,
    defaultValues,
  };
};

export default useUpsertTeamBattle;
