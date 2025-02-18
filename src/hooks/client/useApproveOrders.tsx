// useCreateClientData.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export interface approvalData {
  status: string;
  id: number;
}

const useApproveOrders = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<approvalData>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sendApproval = async (data: approvalData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_REST_HOST}/stock-orders/approval/${data?.id}`,
        { status: data?.status }
      );
      setResponse(response.data);
      reset();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    response,
    error,
    sendApproval,
    setValue,
    reset,
  };
};

export default useApproveOrders;
