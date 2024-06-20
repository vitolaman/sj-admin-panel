import { yupResolver } from "@hookform/resolvers/yup";
import { TicketFormDataI } from "_interfaces/events.interface";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { useCreateCheckInMutation } from "services/modules/events";

const useCreateCheckIn = (id?: string) => {
  const [createCheckIn, createState] = useCreateCheckInMutation();
  const loading = createState.isLoading;
  const schema = yup.object().shape({
    ticket_code: yup.string().required("Ticket Code cannot empty"),
  });
  const defaultValues = {
    ticket_code: "",
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<TicketFormDataI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const create = async (data: TicketFormDataI) => {
    try {
      await createCheckIn(data.ticket_code).unwrap();
      toast.success("Participant check-in successful");
      reset({...defaultValues})
    } catch (error) {
      reset({...defaultValues})
      errorHandler(error);
    }
  };
  const handleCreate = handleSubmit(create);
  return {
    handleCreate,
    register,
    errors,
    loading,
    setValue,
    trigger,
  };
};

export default useCreateCheckIn;
