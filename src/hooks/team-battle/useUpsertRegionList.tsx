import * as yup from "yup";
import {
  useCreateRegionMutation,
  useUpdateRegionMutation,
} from "services/modules/team-battle";
import { useAppSelector } from "store";
import { useForm } from "react-hook-form";
import { RegionListReq } from "_interfaces/team-battle.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadFile } from "services/modules/file";
import { errorHandler } from "services/errorHandler";
import { toast } from "react-toastify";
import { useState } from "react";

const useUpsertRegionList = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [createRegion] = useCreateRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();
  const [loadingUpsert, setLoadingUpsert] = useState<boolean>(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name cannot be empty"),
    logo: yup.mixed().test("valid-type", "Logo cannot be empty", (value) => {
      if (
        (typeof value === "string" && value !== "") ||
        (typeof value === "object" && value.length > 0)
      )
        return true;
      return false;
    }),
  });
  const defaultValues = {
    name: "",
    logo: "",
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    watch,
    reset,
    setValue,
  } = useForm<RegionListReq>({
    mode: "onSubmit",
    resolver: yupResolver(schema,),
    defaultValues,
  });

  const upsert = async (data: RegionListReq) => {
    setLoadingUpsert(true);
    try {
      const payload: RegionListReq = {
        ...data,
      };
      if (data.logo.length > 0) {
        if (typeof data.logo !== "string" && data.logo !== undefined) {
          const imageUrl = await uploadFile(accessToken!, data.logo[0] as File);
          payload.logo = imageUrl;
        }
      }
      if (data.id !== undefined) {
        await updateRegion(payload).unwrap();
        toast.success("Updating a region was successful");
      } else {
        await createRegion(payload).unwrap();
        toast.success("Creating a region was successful");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingUpsert(false);
    }
  };

  const handleUpsert = handleSubmit(upsert);
  return {
    handleUpsert,
    register,
    errors,
    loadingUpsert,
    watch,
    reset,
    setValue,
    trigger,
  };
};

export default useUpsertRegionList;
