import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import {
  CreateQuizPayload,
  EditQuizPayload,
  QuizForm,
} from "_interfaces/quiz.interfaces";
import { useUpdateQuizMutation } from "services/modules/quiz";
import { uploadFile } from "services/modules/file";
import moment from "moment";

const useUpdateQuizForm = (id: string) => {
  const navigate = useNavigate();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateQuiz] = useUpdateQuizMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const dateNow = new Date();
  const schema = yup.object().shape({
    name: yup.string().required("Quiz arena name cannot empty"),
    category: yup.string().required("Please choose category"),
    published_at: yup
      .date()
      .required("Please input publish time")
      .typeError("invalid date"),
    started_at: yup
      .date()
      .required("Please input start time")
      .typeError("invalid date"),
    ended_at: yup
      .date()
      .required("Please input ended time")
      .typeError("invalid date")
      .min(dateNow, "Ended time must be greater than now"),
    banner: yup.object().required("Please input banner"),
    admission_fee: yup.number().required("Please input admission fee"),
    min_participant: yup.number().min(0, "Min Participants = 0"),
    max_participant: yup.number().max(999, "Max Participants = 999"),
    prizes: yup
      .array()
      .of(
        yup
          .object()
          .shape({ prize: yup.number().required("Please input prize") })
      ),
    lifelines: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Please input Lifeline Name"),
          price: yup.number().required("Please input Lifeline Price"),
        })
      )
      .required("Lifelines are required"),
    tnc: yup.object().shape({
      id: yup
        .string()
        .min(10, "min 10 characters")
        .required("Please input TnC"),
      en: yup
        .string()
        .min(10, "min 10 characters")
        .required("Please input TnC"),
    }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setFocus,
    watch,
    reset,
  } = useForm<QuizForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      banner: {
        image_link: "",
        image_url: "",
      },
      communities: {
        image_link: "",
        image_url: "",
      },
      sponsors: {
        image_link: "",
        image_url: "",
      },
      lifelines: [
        { name: "FIRST", price: 0 },
        { name: "SECOND", price: 0 },
        { name: "THIRD", price: 0 },
      ],
      duration_in_minute: 0,
    },
  });

  const create = async (data: QuizForm) => {
    try {
      setIsLoadingUpdate(true);
      // cannot use data type causing error pluggin React Select
      const paymentMethodParsed = (data.payment_method as any[]).map(
        (item) => item.value
      );
      const payload: EditQuizPayload = {
        ...data,
        prizes: data.prizes.map((item) => item.prize),
        payment_method: paymentMethodParsed,
      };
      if (data.banner.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.banner = {
          image_link: "",
          image_url: banner,
        };
      }
      if (data.sponsors.image_link !== "") {
        const sponsors = await uploadFile(
          accessToken!,
          data.sponsors.image_link[0] as File
        );
        payload.sponsors = {
          image_link: "",
          image_url: sponsors,
        };
      }
      if (data.communities.image_link !== "") {
        const communities = await uploadFile(
          accessToken!,
          data.communities.image_link[0] as File
        );
        payload.communities = {
          image_link: "",
          image_url: communities,
        };
      }
      await updateQuiz({ id, body: payload }).unwrap();
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleUpdate = handleSubmit(create);

  return {
    handleUpdate,
    register,
    errors,
    setFocus,
    control,
    isLoadingUpdate,
    watch,
    reset,
  };
};

export default useUpdateQuizForm;
