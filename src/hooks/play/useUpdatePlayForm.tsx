import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditArenaPayloadI, PlayI } from "_interfaces/play.interfaces";
import { useUpdatePlayMutation } from "services/modules/play";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";

const useUpdatePlayForm = (id: string) => {
  const navigate = useNavigate();
  const [updatePlay, { isLoading }] = useUpdatePlayMutation();
  const schema = yup
    .object({
      publish_time: yup
        .date()
        .min(new Date(), "Publish Time must be greater than now")
        .required("Please input publish time")
        .typeError("invalid date"),
      open_registration_time: yup
        .date()
        .required("Please input open registration time")
        .typeError("invalid date")
        .min(new Date(), "Open registration time must be greater than now"),
      play_time: yup
        .date()
        .required("Please input play time")
        .typeError("invalid date")
        .min(new Date(), "Play time must be greater than now"),
      min_participant: yup.number().min(0, "Min Participants = 0"),
      prize_fix_amount: yup.number().required("Please input tota prize"),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setFocus,
  } = useForm<PlayI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const update = async (data: PlayI) => {
    const payload: EditArenaPayloadI = {
      name: data.name,
      category: data.category as string[],
      asset_sub_type: data.raw_asset_sub_type!,
      publish_time: new Date(data.publish_time).toISOString(),
      open_registration_time: new Date(
        data.open_registration_time,
      ).toISOString(),
      play_time: new Date(data.play_time).toISOString(),
      end_time: new Date(data.end_time).toISOString(),
      min_participant: data.min_participant,
      max_participant: data.max_participant,
      currency: data.currency,
      opening_balance: data.opening_balance,
      admission_fee: data.admission_fee,
      prize_fix_amount: data.prize_fix_amount,
      prize_fix_percentages: data.prize_fix_percentages,
      prize_pool_percentages: data.prize_pool_percentages,
      tnc: data.tnc,
      reward_url: data.reward_url,
      featured_link: data.featured_link,
      promo_id: data.promo_id,
      invitation_code: data.invitation_code,
    };
    // TODO: need upload image service configuration
    // banner: data.banner,
    // community: {
    //   name: data.community.name,
    //   image_url: data.community.image_url,
    // },
    // sponsorship: {
    //   name: data.sponsorship.name,
    //   image_url: data.sponsorship.image_url,
    // },

    try {
      await updatePlay({ id, payload });
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdate = handleSubmit(update);

  return {
    handleUpdate,
    register,
    errors,
    setFocus,
    reset,
    control,
    isLoading,
  };
};

export default useUpdatePlayForm;
