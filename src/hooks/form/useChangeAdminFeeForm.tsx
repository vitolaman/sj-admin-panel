import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface AdminFeeI {
  admin_fee: number;
}
const useChangeAdminFeeForm = () => {
  const schema = yup
    .object({
      admin_fee: yup.number().required(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<AdminFeeI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  return { handleSubmit, register, errors, watch };
};

export default useChangeAdminFeeForm;
