import { yupResolver } from "@hookform/resolvers/yup";
import { TicketFormDataI } from "_interfaces/events.interface";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { errorHandler } from "services/errorHandler";
import { useCreateCheckInMutation, useCreateCheckOutMutation } from "services/modules/events";

const useCreateCheckInOut = () => {
  const [createCheckIn, checkInState] = useCreateCheckInMutation();
  const [createCheckOut, checkOutState] = useCreateCheckOutMutation();
  const loading = checkInState.isLoading || checkOutState.isLoading;
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

  const checkIn = async (data: TicketFormDataI) => {
    try {
      await createCheckIn(data.ticket_code).unwrap();
      toast.success("Participant check-in successful");
      reset({...defaultValues})
    } catch (error) {
      reset({...defaultValues})
      errorHandler(error);
    }
  };

  const checkOut = async (data: TicketFormDataI) => {
    try {
      await createCheckOut(data.ticket_code).unwrap();
      toast.success("Participant check-out successful");
      reset({...defaultValues})
    } catch (error) {
      reset({...defaultValues})
      errorHandler(error);
    }
  };

  const handleCheckIn = handleSubmit(checkIn);
  const handleCheckOut = handleSubmit(checkOut);
  return {
    handleCheckIn,
    handleCheckOut,
    register,
    errors,
    loading,
    setValue,
    trigger,
  };
};

export default useCreateCheckInOut;
