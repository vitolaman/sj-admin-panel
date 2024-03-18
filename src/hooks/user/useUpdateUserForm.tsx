import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import { useNavigate } from "react-router-dom";
import { UserDataEditI } from "_interfaces/user.interfaces";
import { useEditUserDataMutation } from "services/modules/user";

const useUpdateUserForm = (userId?: string) => {
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useEditUserDataMutation();
  const loadingUpdate = isLoading;
  const schema = yup
    .object({
      name: yup.string().required("Please input publish time"),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setFocus,
  } = useForm<UserDataEditI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const update = async (data: UserDataEditI) => {
    try {
      const payload: UserDataEditI = {
        community: data.community,
        role: data.role,
        verified: data.verified,
      };
      await updateUser({ userId: userId!, payload });
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdate = handleSubmit(update);

  return {
    handleUpdate,
    register,
    errors,
    setFocus,
    reset,
    control,
    loadingUpdate,
  };
};

export default useUpdateUserForm;
