import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreatePlayFormI,
  CreatePlayPayload,
} from "_interfaces/play.interfaces";
import { useCreatePlayMutation } from "services/modules/play";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store";
import { OptChild } from "_interfaces/admin-fee.interfaces";
import { uploadFile } from "services/modules/file";

export const TYPE_ARENA = "ARENA";

const useCreatePlayForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createPlay] = useCreatePlayMutation();
  const { accessToken } = useAppSelector((state) => state.auth);

  const dateNow = new Date();
  const schema = yup.object().shape({
    name: yup.string().required("Play arena name cannot empty"),
    type: yup.string().oneOf([TYPE_ARENA]).required("Category cannot be empty"),
    publish_time: yup
      .date()
      .min(dateNow, "Publish Time must be greater than now")
      .required("Please input publish time")
      .typeError("invalid date"),
    open_registration_time: yup
      .date()
      .required("Please input open registration time")
      .typeError("invalid date")
      .min(dateNow, "Open registration time must be greater than now"),
    play_time: yup
      .date()
      .required("Please input play time")
      .typeError("invalid date")
      .min(dateNow, "Play time must be greater than now"),
    end_time: yup
      .date()
      .required("Please input end time")
      .typeError("invalid date")
      .min(dateNow, "End time must be greater than now"),
    currency: yup.string().required("Please select currency"),
    admission_fee: yup.number().required("Please input admission fee"),
    min_participant: yup.number().min(0, "Min Participants = 0"),
    max_participant: yup.number().max(999, "Max Participants = 999"),
    prizes: yup.array().of(yup.object().shape({
      prize_fix_percentages: yup.number().required("Please input total prize"),
      prize_pool_percentages: yup.number(),
    })),
    prize_pool_percentages: yup.array().of(yup.number()),
    opening_balance: yup.number().required("Please input opening balance"),
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
    setValue,
  } = useForm<CreatePlayFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      type: TYPE_ARENA,
      currency: "IDR",
      prizes: [
        {
          prize_fix_percentages: 0,
          prize_pool_percentages: 0,
        },
        {
          prize_fix_percentages: 0,
          prize_pool_percentages: 0,
        },
        {
          prize_fix_percentages: 0,
          prize_pool_percentages: 0,
        },
      ],
      asset_sub_type: [],
      category: [],
    },
  });

  const create = async (data: CreatePlayFormI) => {
    try {
      setIsLoading(true);
      // NOTE: Cannot use data type because of react-select plugin data type doesn't match with the data type that I give
      const paymentMethodParsed = (data.payment_method as any[]).map(
        (item) => item.value,
      );
      const payload: CreatePlayPayload = {
        name: data.name,
        category: data.category,
        asset_sub_type: data.asset_sub_type,
        type: data.type,
        publish_time: data.publish_time,
        open_registration_time: data.open_registration_time,
        play_time: data.play_time,
        end_time: data.end_time,
        min_participant: data.min_participant,
        max_participant: data.max_participant,
        currency: data.currency,
        community: {
          name: data.community.name,
        },
        sponsorship: {
          name: data.sponsorship.name,
        },
        gain_percentage: data.gain_percentage,
        opening_balance: data.opening_balance,
        admission_fee: data.admission_fee,
        fee_percentage: data.fee_percentage,
        prize_fix_amount: +data.prize_fix_amount,
        prize_fix_percentages: data.prizes.map(item => item.prize_fix_percentages),
        prize_pool_percentages: data.prizes.map(item => item.prize_pool_percentages),
        tnc: data.tnc,
        reward_url: data.reward_url,
        featured_link: data.featured_link,
        promo_id: data.promo_id,
        invitation_code: data.invitation_code,
        payment_method: paymentMethodParsed,
      };
      if (data.banner && data.banner[0]) {
        const banner = await uploadFile(accessToken!, data.banner[0]);
        payload.banner = banner;
      } else {
        payload.banner = "";
      }
      if (data.sponsorship.image_url && data.sponsorship.image_url[0]) {
        const sponsorship = await uploadFile(
          accessToken!,
          data.sponsorship.image_url[0],
        );
        payload.sponsorship.image_url = sponsorship;
      } else {
        payload.sponsorship.image_url = "";
      }
      if (data.community.image_url && data.community.image_url[0]) {
        const community = await uploadFile(
          accessToken!,
          data.community.image_url[0],
        );
        payload.community.image_url = community;
      } else {
        payload.community.image_url = "";
      }
      await createPlay(payload).unwrap();
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
    setValue,
  };
};

export default useCreatePlayForm;
