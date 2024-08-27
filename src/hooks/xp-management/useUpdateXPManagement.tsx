import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useUpdateXPManagementMutation } from "services/modules/xp-management";
import { XPManagementI } from "_interfaces/xp-management.interface";
import { toast } from "react-toastify";

const useUpdateXPManagementForm = () => {
  const [updateXPManagement, updateState] = useUpdateXPManagementMutation();
  const loading = updateState.isLoading;
  const schema = yup.object().shape({
    description: yup.string().required("Description cannot empty"),
    exp_gained: yup.number().required("Exp Gained cannot empty"),
    exp_required: yup.number().required("Exp Required cannot empty"),
    max_exp: yup.number().required("Max Exp cannot empty"),
    is_daily_task: yup.boolean().required("Daily Task cannot empty"),
    is_treasure: yup.boolean().required("Treasure cannot empty"),
    is_active: yup.boolean().required("Status cannot empty"),
    started_at: yup
      .date()
      .required("Please input start date")
      .typeError("invalid date"),
    expired_at: yup
      .date()
      .min(yup.ref("started_at"), "End date must be after start date")
      .required("Please input end date")
      .typeError("invalid date"),
  });
  const defaultValues = {
    task_code: "",
    name: "",
    description: "",
    exp_gained: 0,
    exp_required: 0,
    max_exp: 0,
    is_daily_task: false,
    is_treasure: false,
    is_active: false,
    expired_at: "",
    started_at: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control, watch
  } = useForm<XPManagementI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const update = async (data: XPManagementI) => {
    try {
      const startDateUtc = new Date(data?.started_at!).toISOString();
      const endDateUtc = new Date(data?.expired_at!).toISOString();
      const payload: XPManagementI = {
        task_code: data?.task_code,
        name: data?.name,
        description: data?.description,
        exp_gained:
          typeof data?.exp_gained === "string"
            ? Number(data?.exp_gained)
            : data?.exp_gained,
        exp_required:
          typeof data?.exp_required === "string"
            ? Number(data?.exp_required)
            : data?.exp_required,
        max_exp:
          typeof data?.max_exp === "string"
            ? Number(data?.max_exp)
            : data?.max_exp,
        is_daily_task: data?.is_daily_task,
        is_treasure: data?.is_treasure,
        is_active: data?.is_active,
        started_at: startDateUtc,
        expired_at: endDateUtc,
      };
      await updateXPManagement(payload).unwrap();
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
    defaultValues,
    setValue,
    trigger,
    control, watch
  };
};

export default useUpdateXPManagementForm;
