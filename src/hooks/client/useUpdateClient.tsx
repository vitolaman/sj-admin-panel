import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ClientI } from "_interfaces/client.interfaces";

export interface UpdateClientI {
  id: number,
  name: string;
  clientCode: string;
  city: string;
  salesId: number;
}

const useUpdateClientData = (itemId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ClientI>();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the item data on component mount to populate the form
  const fetchItemData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_REST_HOST}/clients/${itemId}`
      );
      // Set form data after fetching item
      const { id, name, clientCode, city, sales, price } = response.data;
      setValue("id", id);
      setValue("name", name);
      setValue("clientCode", clientCode);
      setValue("city", city);
      setValue("sales", sales);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Use the updateItem mutation from your API service
  const sendItemData = async (data: UpdateClientI) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_REST_HOST}/items/${itemId}`,
        data
      );
      setResponse(response.data);
      reset(); // Reset the form after successful update
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the hook is initialized
  useEffect(() => {
    fetchItemData();
  }, [itemId]);

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

export default useUpdateClientData;
