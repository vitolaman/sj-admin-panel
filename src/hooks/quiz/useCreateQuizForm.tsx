import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { CreateQuizPayload } from "_interfaces/quiz.interfaces";
import { useCreateQuizMutation } from "services/modules/quiz";
import { uploadFile } from "services/modules/file";

const useCreateQuizForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createQuiz] = useCreateQuizMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const dateNow = new Date();
  const schema = yup.object().shape({
    name: yup.string().required("Quiz arena name cannot empty"),
    category: yup.string().required("Please choose category"),
    published_at: yup
      .date()
      .min(dateNow, "Publish Time must be greater than now")
      .required("Please input publish time")
      .typeError("invalid date"),
    started_at: yup
      .date()
      .required("Please input start time")
      .typeError("invalid date")
      .min(dateNow, "Start time must be greater than now"),
    ended_at: yup
      .date()
      .required("Please input ended time")
      .typeError("invalid date")
      .min(dateNow, "Ended time must be greater than now"),
    banner: yup.object().required("Please input banner"),
    admission_fee: yup.number().required("Please input admission fee"),
    min_participant: yup
      .number()
      .min(0, "Min Participants = 0")
      .typeError("Must be a number"),
    max_participant: yup
      .number()
      .max(999, "Max Participants = 999")
      .typeError("Must be a number"),
    // total_questions: yup.string()
    //   .oneOf(['3', '6', '9', '12', '15'], 'Total questions must be 3, 6, 9, 12 or 15')
    //   .required('Total questions is required'),
    prizes: yup
      .array()
      .of(yup.number().required("Please input prize"))
      .required("Prizes are required"),
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
  } = useForm<CreateQuizPayload>({
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

  const create = async (data: CreateQuizPayload) => {
    try {
      setIsLoading(true);
      // NOTE: Cannot use any because of react-select plugin data type doesn't match with the data type that I give
      const paymentMethodParsed = (data.payment_method as any[]).map(
        (item) => item.value,
      );
      const payload = { ...data, payment_method: paymentMethodParsed };
      if (data.banner.image_link !== "") {
        const banner = await uploadFile(
          accessToken!,
          data.banner.image_link[0] as File
        );
        payload.banner = {
          image_link: "",
          image_url: banner,
        };
      } else {
        payload.banner = {
          image_link: "",
          image_url: "",
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
      } else {
        payload.sponsors = {
          image_link: "",
          image_url: "",
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
      } else {
        payload.communities = {
          image_link: "",
          image_url: "",
        };
      }
      await createQuiz(payload).unwrap();
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = handleSubmit(create);

  return {
    handleCreate,
    register,
    errors,
    setFocus,
    control,
    isLoading,
    watch,
  };
};

export default useCreateQuizForm;
