import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { toast } from "react-toastify";
import { useUpdateSeedsCoinManagementMutation } from "services/modules/seeds-coin-management";
import { SeedsCoinManagementReq } from "_interfaces/seeds-coin-management.interfaces";

const useUpdateSeedsCoinManagementForm = () => {
  const [updateSeedsCoinManagement, updateState] = useUpdateSeedsCoinManagementMutation();
  const loading = updateState.isLoading;
  const schema = yup.object().shape({
    name: yup.string().required("Name cannot empty"),
    coin_value: yup.number().required("Coin cannot empty"),
    is_active: yup.boolean().required("Status cannot empty"),
    started_at: yup
      .date()
      .required("Please input start date")
      .typeError("invalid date"),
    expired_at: yup
      .date()
      .min(yup.ref("started_at"), "End date must be after start date")
      .nullable()
      .notRequired()
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<SeedsCoinManagementReq>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const update = async (data: SeedsCoinManagementReq) => {
    try {
      const startDateUtc = new Date(data?.started_at!).toISOString();
      const endDateUtc = data.expired_at===null?null:new Date(data?.expired_at!).toISOString();
      const payload: SeedsCoinManagementReq = {
        id:data.id,
        name: data?.name,
        coin_value:
          typeof data?.coin_value === "string"
            ? Number(data?.coin_value)
            : data?.coin_value,
        is_active: data?.is_active,
        started_at: startDateUtc,
        expired_at: endDateUtc,
      };
      await updateSeedsCoinManagement(payload).unwrap();
      toast.success("Updating an activity was successful");
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdate = handleSubmit(update);

  return {
    handleUpdate,
    register,
    errors,
    reset,
    loading,
    setValue,
    trigger,
  };
};

export default useUpdateSeedsCoinManagementForm;
