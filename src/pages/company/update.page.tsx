import ContentContainer from "components/container";
import CurrencyInput from "components/currency-input";
import CInput from "components/input";
import MInput from "components/multi-input";
import PercentageInput from "components/percentage-input";
import { Loader } from "components/spinner/loader";
import {
  marginShare,
  paymentStatus,
  statusCompany,
  withdrawalStatus,
} from "data/company-setting";
import useUpdateCompanyForm from "hooks/company/useUpdateCompanyForm";
import useRNCHelper from "hooks/shared/useRNCHelper";
import moment from "moment";
import { useEffect } from "react";
import { Button } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "services/modules/company";

export const updateCompanyRouteName = ":id/edit";

const UpdateCompany = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetCompanyByIdQuery(params.id!);
  const { select, setSelect, handleSelectChange } = useRNCHelper();
  const {
    handleUpdate,
    isLoadingUpdate,
    register,
    errors,
    control,
    setValue,
    reset,
  } = useUpdateCompanyForm(params.id!);

  useEffect(() => {
    reset({
      ...data,
      plan_expiry_date: moment(data?.plan_expiry_date).format(
        "YYYY-MM-DD HH:mm"
      ),
    });
    setSelect((prev) => ({
      ...prev,
      is_active: data?.is_active,
      share_option: data?.share !== 0 ? "share" : "share_percentage",
      share: data?.share,
      share_percentage: data?.share_percentage,
      payment: data?.payment,
      withdrawal: data?.withdrawal,
    }));
  }, [data, params.id]);

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Company Setting</h1>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="flex justify-between gap-10">
              <div className="flex flex-col w-6/12 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">ID Company</label>
                  <CInput value={params.id} disabled />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Company Name</label>
                  <CInput value={data?.name} disabled />
                </div>
              </div>
              <div className="border border-[#9B9B9B]"></div>
              <div className="flex flex-col w-6/12 gap-6">
                <MInput
                  registerName="is_active"
                  register={register}
                  label="Status Company"
                  type="radio"
                  data={statusCompany}
                  setValue={setValue}
                  select={select?.is_active}
                  handleSelectChange={handleSelectChange}
                  errors={errors}
                />
                <MInput
                  registerName="share_option"
                  register={register}
                  label="Margin Share"
                  type="radio"
                  data={marginShare}
                  setValue={setValue}
                  select={select?.share_option}
                  handleSelectChange={handleSelectChange}
                  errors={errors}
                />
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Input Margin Share</label>
                  {select?.share_option === "share" && (
                    <Controller
                      control={control}
                      name="share"
                      defaultValue={data?.share}
                      render={({ field: { onChange, value } }) => (
                        <CurrencyInput
                          value={value}
                          onValueChange={(value) => onChange(value)}
                          error={errors?.share}
                        />
                      )}
                    />
                  )}
                  {select?.share_option === "share_percentage" && (
                    <Controller
                      control={control}
                      name="share_percentage"
                      defaultValue={data?.share_percentage}
                      render={({ field: { onChange, value } }) => (
                        <PercentageInput
                          value={value}
                          onValueChange={(value) => onChange(value)}
                          error={errors?.share_percentage}
                        />
                      )}
                    />
                  )}
                </div>
                <MInput
                  registerName="payment"
                  register={register}
                  label="Payment Status"
                  type="radio"
                  data={paymentStatus}
                  setValue={setValue}
                  select={select?.payment}
                  handleSelectChange={handleSelectChange}
                  errors={errors}
                />
                <MInput
                  registerName="withdrawal"
                  register={register}
                  label="Withdrawal Status"
                  type="radio"
                  data={withdrawalStatus}
                  setValue={setValue}
                  select={select?.withdrawal}
                  handleSelectChange={handleSelectChange}
                  errors={errors}
                />
                <MInput
                  label="Active Until"
                  registerName="plan_expiry_date"
                  register={register}
                  type="datetime-local"
                  errors={errors}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="px-16 py-1 bg-seeds hover:bg-seeds-300 border-seeds text-white rounded-lg"
                loading={isLoadingUpdate}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </ContentContainer>
  );
};

export default UpdateCompany;
