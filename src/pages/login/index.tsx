import { useState } from "react";
import { Button, Checkbox, Input } from "react-daisyui";
import { useAppDispatch } from "store";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useLoginForm from "hooks/login/useLoginForm";
import { LoginReqI } from "_interfaces/auth-api.interfaces";
import Logo from "assets/images/logo.png";
import ValidationError from "components/validation/error";
import { saveTokenAuth } from "store/auth";
import { useLoginMutation } from "services/modules/auth";
import { errorHandler } from "services/errorHandler";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useLoginForm();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data: LoginReqI) => {
    try {
      const res = await login(data).unwrap();
      dispatch(saveTokenAuth(res));
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div>
      <div className="bg-[#27A590] flex flex-col w-screen h-screen overflow-hidden">
        <div className="w-[906px] h-[906px] relative mx-auto">
          <img
            src={Logo}
            className="absolute z-50 w-[120px] h-[45px] left-0 right-0 top-[10vh] mx-auto"
            alt=""
          />
          <div className="bg-white formLogin w-[450px] h-[424px] absolute mx-auto left-0 right-0 rounded-xl shadow-xl top-[22vh] z-[100]">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="p-[32px] font-poppins"
            >
              <h1 className="text-xl font-semibold text-[#262626]">
                Welcome to Seeds Admin
              </h1>
              <small className="text-sm font-light text-[#7C7C7C]">
                Please login with your account
              </small>
              <div className="form-login flex flex-col h-[200px] pt-8 justify-around w-full">
                <div className="w-full">
                  <Input
                    {...register("email")}
                    className="text-base font-semibold text-[#262626] w-full"
                    placeholder="Input Email"
                  />
                  <ValidationError error={errors.email} />
                </div>
                <div className="w-full">
                  <Input
                    {...register("password")}
                    className="text-base font-semibold text-[#262626] w-full"
                    placeholder="Input Password"
                    type="password"
                  />
                  <ValidationError error={errors.password} />
                </div>
              </div>
              <section className="flex flex-row text-center align-middle items-center gap-2">
                <Checkbox />
                <p>Remember Me</p>
              </section>
              <Button
                type="submit"
                className="h-[44px] text-center bg-[#3AC4A0] w-full text-white rounded-full mt-5 text-base font-semibold"
                loading={isLoading}
              >
                Login
              </Button>
            </form>
          </div>
          <div className="w-[906px] h-[906px] left-0 top-[28px] absolute opacity-20 z-10 bg-seeds-button-green rounded-full" />
          <div className="w-[650px] h-[650px] left-[128px] top-[116px] absolute opacity-20 z-20 bg-seeds-button-green rounded-full" />
          <div className="w-[3020px] h-[2882px] bg-white absolute top-[505px] z-50 left-[-1040px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
