import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export interface ItemData {
  id: string;
  name: string;
  type: string;
  stock: string;
  normalStockValue: string;
  price: string;
}

const useCreateItemData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ItemData>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Use the createItem mutation from your Api service
  const sendItemData = async (data: ItemData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Specify the full URL (localhost:3001) for the request
      const response = await axios.post(
        `${process.env.REACT_APP_REST_HOST}/items`,
        data
      );
      setResponse(response.data);
      reset(); // Reset the form after successful submission
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
    sendItemData,
    setValue,
    reset,
  };
};

export default useCreateItemData;
