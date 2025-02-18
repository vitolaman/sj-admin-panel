// useCreateClientData.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export interface ClientData {
  id: number;
  name: string;
  clientCode: string;
  city: string;
  salesId: number;
}

const useCreateClientData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ClientData>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sendClientData = async (data: ClientData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REST_HOST}/clients`,
        data
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
    sendClientData,
    setValue,
    reset,
  };
};

export default useCreateClientData;