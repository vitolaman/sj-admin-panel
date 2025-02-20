import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export interface StockOrderItem {
  itemId: string;
  amount: number;
}

export interface StockOrderData {
  createdBy: number;
  reffNo?: string;
  status: string;
  items: StockOrderItem[];
}

const useCreateStockOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<StockOrderData>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sendStockOrder = async (data: StockOrderData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REST_HOST}/stock-orders`,
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
    sendStockOrder,
    setValue,
    reset,
  };
};

export default useCreateStockOrder;
