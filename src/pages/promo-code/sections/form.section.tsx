import {
  PromoCodeFormDataI,
  PromoCodeModalFormI,
} from "_interfaces/promo-code.interfaces";
import { Button, Modal } from "react-daisyui";
import useUpsertPromoCodeForm from "hooks/promo-code/useUpsertPromoCodeForm";
import { useCallback, useEffect, useState } from "react";
import {
  levelExpOptions,
  segmentUserOptions,
  statusPromo,
} from "data/promo-code";
import { Controller } from "react-hook-form";
import { useGetReferralCodesQuery } from "services/modules/referral-code";
import Select from "react-select";
import {
  useFilterArticle,
  useFilterCircle,
  useFilterPlay,
  useFilterQuiz,
  useFilterRef,
} from "../../../hooks/promo-code/useFilterState";
import { useLazyGetPromoCodeByIdQuery } from "services/modules/promo-code";
import moment from "moment";
import { FiX } from "react-icons/fi";
import { useCategoryState } from "hooks/promo-code/useCategoryState";
import ReactQuill from "react-quill";
import FormInput from "components/input/formInput";
import FormRadio from "components/input/formRadio";
import CategoryModal from "./categoryModal.section";
import LeftFormModal from "./leftFormModal.section";
import { useLazyGetArticleByIdQuery } from "services/modules/article";
import { useLazyGetQuizByIdQuery } from "services/modules/quiz";
import { useLazyPlayByIdQuery } from "services/modules/play";
import { useLazyCircleDetailQuery } from "services/modules/circle";
import { Loader } from "components/spinner/loader";

const PromoCodeModalForm = ({
  open,
  setOpen,
  promoCodeData,
  setPromoCodeData,
  refetch,
}: PromoCodeModalFormI) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [discountSelect, setDiscountSelect] = useState<
    string | number | boolean | undefined
  >();
  const [levelSelect, setLevelSelect] = useState<
    string | number | boolean | undefined
  >();
  const [statusSelect, setStatusSelect] = useState<
    string | number | boolean | undefined
  >();
  const [richValue, setRichValue] = useState<string>();
  const [isLoadingFeatureIds, setIsLoadingFeatureIds] =
    useState<boolean>(false);
  const [segmentUser, setSegmentUser] = useState<string | null>(null);
  const [defaultValueSegmentUser, setDefaultValueSegmentUser] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [refCodeSelection, setRefCodeSelection] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);
  const {
    selectAll,
    setSelectAll,
    typeCategoryPromo,
    setTypeCategoryPromo,
    checkedFeature,
    setCheckedFeature,
  } = useCategoryState();

  const { filterCircle, setFilterCircle } = useFilterCircle();
  const { filterPlay, setFilterPlay } = useFilterPlay();
  const { filterQuiz, setFilterQuiz } = useFilterQuiz();
  const { filterArticle, setFilterArticle } = useFilterArticle();

  const { paramsRef, setParamsRef } = useFilterRef();
  const [getArticle] = useLazyGetArticleByIdQuery();
  const [getQuiz] = useLazyGetQuizByIdQuery();
  const [getPlay] = useLazyPlayByIdQuery();
  const [getCircle] = useLazyCircleDetailQuery();

  const dataRef = useGetReferralCodesQuery(paramsRef).data;

  const {
    handleCreate,
    handleUpdate,
    register,
    errors,
    reset,
    control,
    loadingUpsert,
    defaultValues,
    setValue,
    trigger,
    isSuccess,
    watch,
  } = useUpsertPromoCodeForm();

  //TODO: Handling
  const handleResetFilter = () => {
    setFilterCircle((prev) => ({
      ...prev,
      search: "",
    }));
    setFilterPlay((prev) => ({
      ...prev,
      search: "",
    }));
    setFilterQuiz((prev) => ({
      ...prev,
      search: "",
    }));
    setFilterArticle((prev) => ({
      ...prev,
      search_title: "",
    }));
  };

  const handleResetForm = () => {
    reset({ ...defaultValues });
    setPromoCodeData(undefined);
    setDiscountSelect(undefined);
    setRichValue(undefined);
    setStatusSelect(undefined);
    setSegmentUser(null);
    setLevelSelect(0);
    setDefaultValueSegmentUser(null);
    setSelectAll([]);
    setTypeCategoryPromo([]);
    setCheckedFeature([]);
    setRefCodeSelection([]);
    handleResetFilter();
  };

  const handleFeatureIds = useCallback(async () => {
    setIsLoadingFeatureIds(true);
    let completedRequests = 0;
    if (promoCodeData !== undefined) {
      const result = await Promise.all(
        promoCodeData.feature_ids.map(async (featureId) => {
          const article = await getArticle(featureId);
          const quiz = await getQuiz(featureId);
          const play = await getPlay(featureId);
          const circle = await getCircle({ id: featureId });

          if (article.status === "fulfilled") {
            completedRequests++;
            return {
              id: String(article.data.news.id),
              name: article.data.news.title,
              type: "Premium Content",
            };
          } else if (quiz.status === "fulfilled") {
            completedRequests++;
            return {
              id: quiz.data.id,
              name: quiz.data.name,
              type: "Paid Quiz",
            };
          } else if (play.status === "fulfilled") {
            completedRequests++;
            return {
              id: play.data.id,
              name: play.data.name,
              type: "Paid Tournament",
            };
          } else if (circle.status === "fulfilled") {
            completedRequests++;
            return {
              id: circle.data.data.id,
              name: circle.data.data.name,
              type: "Premium Circle",
            };
          } else {
            return { id: "", name: "", type: "" };
          }
        })
      );
      if (completedRequests === promoCodeData.feature_ids.length) {
        setIsLoadingFeatureIds(false);
      }

      setCheckedFeature(result);
      setSelectAll(() => {
        if (promoCodeData?.type.includes(",")) {
          const checkedFeatureType = result.map((obj) => obj.type.toString());
          const selectAllType = promoCodeData?.type.split(",");
          const filteredTypes = selectAllType.filter((item) => {
            return !checkedFeatureType.includes(item);
          });
          return filteredTypes;
        } else {
          return [`${promoCodeData?.type}`];
        }
      });
    }
  }, [promoCodeData]);
  //TODO:UseEffect
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (discountSelect === "Nominal") {
      setValue("discount_percentage", 0);
      setValue("max_discount", 0);
    } else if (discountSelect === "Percentage") {
      setValue("discount_amount", 0);
    }
  }, [discountSelect]);
  useEffect(() => {
    if (dataRef?.data === null) {
      setRefCodeSelection([]);
    } else if (dataRef) {
      const tempOpt: {
        key: number;
        label: string;
        value: string;
      }[] = dataRef?.data.map((item, i) => ({
        key: i,
        label: item.ref_code,
        value: item.ref_code,
      }));
      setRefCodeSelection(tempOpt);
    }
  }, [dataRef]);

  useEffect(() => {
    if (promoCodeData !== undefined) {
      handleFeatureIds();
      reset({
        ...promoCodeData,
        start_date: moment(promoCodeData.start_date).format("YYYY-MM-DD HH:mm"),
        end_date: moment(promoCodeData.end_date).format("YYYY-MM-DD HH:mm"),
      });
      setRichValue(promoCodeData?.tnc as string);
      setStatusSelect(promoCodeData?.is_active);
      setSegmentUser(promoCodeData?.segment_user as string);
      setDiscountSelect(promoCodeData?.discount_type as string);
      setLevelSelect(promoCodeData?.min_exp);
    }
  }, [promoCodeData]);

  useEffect(() => {
    const filteredTypeCategoryPromo = [
      ...selectAll,
      ...checkedFeature.map((obj) => obj.type.toString()),
    ].filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    setTypeCategoryPromo(filteredTypeCategoryPromo);
  }, [checkedFeature, selectAll]);

  useEffect(() => {
    if (promoCodeData !== undefined) {
      setSelectAll(() => {
        if (promoCodeData?.type.includes(",")) {
          const checkedFeatureType = checkedFeature.map((obj) =>
            obj.type.toString()
          );
          const selectAllType = promoCodeData?.type.split(",");
          const filteredTypes = selectAllType.filter((item) => {
            return !checkedFeatureType.includes(item);
          });
          return filteredTypes;
        } else {
          return [`${promoCodeData?.type}`];
        }
      });
    }
  }, [promoCodeData]);

  //TODO:Parent Element
  return (
    <Modal open={open} className="bg-white w-11/12 max-w-[2000px] p-8">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit">
          {open && openModal
            ? "Choose Category Promo"
            : `${promoCodeData === undefined ? "Create" : "Edit"} Promo Code`}
        </p>
        <FiX
          onClick={() => {
            handleResetForm();
            setOpen(!open);
            if (openModal === true) {
              setOpenModal(!openModal);
            }
          }}
          className="cursor-pointer"
        />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        {isLoadingFeatureIds ? (
          <Loader />
        ) : open && openModal ? (
          <CategoryModal
            open={open}
            setOpen={setOpen}
            openModal={openModal}
            setOpenModal={setOpenModal}
            loadingUpsert={loadingUpsert}
            promoCodeData={promoCodeData}
            setValue={setValue}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleResetFilter={handleResetFilter}
            handleResetForm={handleResetForm}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            checkedFeature={checkedFeature}
            setCheckedFeature={setCheckedFeature}
            typeCategoryPromo={typeCategoryPromo}
            filterCircle={filterCircle}
            setFilterCircle={setFilterCircle}
            filterPlay={filterPlay}
            setFilterPlay={setFilterPlay}
            filterQuiz={filterQuiz}
            setFilterQuiz={setFilterQuiz}
            filterArticle={filterArticle}
            setFilterArticle={setFilterArticle}
            watch={watch}
          />
        ) : (
          <>
            <div className="flex justify-between gap-10">
              <LeftFormModal
                register={register}
                errors={errors}
                promoCodeData={promoCodeData}
                discountSelect={discountSelect}
                setDiscountSelect={setDiscountSelect}
                setValue={setValue}
              />
              <div className="border border-[#9B9B9B]"></div>
              <div className="flex flex-col gap-4 w-7/12">
                <FormRadio<PromoCodeFormDataI>
                  label="Status"
                  registerName="is_active"
                  data={statusPromo}
                  select={statusSelect}
                  setSelect={setStatusSelect}
                  setValue={setValue}
                  errors={errors}
                />
                <div className="flex gap-4 w-full">
                  <FormInput<PromoCodeFormDataI>
                    label="Start Date"
                    registerName="start_date"
                    type="datetime-local"
                    register={register}
                    errors={errors}
                  />
                  <FormInput<PromoCodeFormDataI>
                    label="End Date"
                    registerName="end_date"
                    type="datetime-local"
                    register={register}
                    errors={errors}
                  />
                </div>
                <FormInput<PromoCodeFormDataI>
                  label="Description"
                  registerName="description"
                  type="text"
                  register={register}
                  errors={errors}
                />
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                    Segment User
                  </label>
                  <Controller
                    control={control}
                    name="segment_user"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <Select
                          styles={{
                            control: (baseStyle) => ({
                              ...baseStyle,
                              padding: 5,
                              borderColor: "#BDBDBD",
                              borderRadius: "0.5rem",
                            }),
                          }}
                          options={segmentUserOptions}
                          value={
                            promoCodeData !== undefined && levelSelect !== 0
                              ? segmentUserOptions.find(
                                  (item) => item.value === ""
                                )
                              : promoCodeData !== undefined
                              ? segmentUserOptions.find(
                                  (item) => item.value === value
                                )
                              : defaultValueSegmentUser
                          }
                          isSearchable={false}
                          isDisabled={promoCodeData !== undefined}
                          onChange={(e) => {
                            onChange(e?.value);
                            if (e?.label !== "Tier Level (Xp Management)") {
                              setLevelSelect(0);
                              setValue("min_exp", 0);
                            } else {
                              setValue("segment_user", "All User");
                            }
                            if (e?.label !== "User based on referral") {
                              setValue("ref_code", "");
                            }
                            setDefaultValueSegmentUser(e);
                            setSegmentUser(e?.value ?? null);
                          }}
                        />
                        <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
                          {errors.segment_user?.message}
                        </p>
                      </>
                    )}
                  />
                </div>
                {(segmentUser === segmentUserOptions[3].value ||
                  (levelSelect !== 0 && segmentUser === "All User")) && (
                  <FormRadio<PromoCodeFormDataI>
                    label="Choose Level"
                    data={levelExpOptions}
                    registerName="min_exp"
                    select={levelSelect}
                    setSelect={setLevelSelect}
                    setValue={setValue}
                  />
                )}
                {segmentUser === segmentUserOptions[2].value && (
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                      Referral Code
                    </label>
                    <Controller
                      control={control}
                      name="ref_code"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          styles={{
                            control: (baseStyle) => ({
                              ...baseStyle,
                              padding: 5,
                              borderColor: "#BDBDBD",
                              borderRadius: "0.5rem",
                            }),
                          }}
                          onInputChange={(e) => {
                            setParamsRef((prev) => {
                              return { ...prev, search: e };
                            });
                          }}
                          isClearable={true}
                          options={refCodeSelection}
                          value={refCodeSelection.find(
                            (item) => item.value === value
                          )}
                          onChange={(e) => {
                            onChange(e?.value);
                            setValue(
                              "ref_code",
                              promoCodeData?.ref_code ?? e?.value ?? ""
                            );
                          }}
                        />
                      )}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                    Term & Conditions
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={richValue}
                    onChange={(e) => {
                      setRichValue(e);
                      setValue("tnc", e);
                    }}
                  />
                  <p className="font-poppins font-normal text-sm text-[#EF5350] text-right mt-10">
                    {errors.tnc?.message}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={async () => {
                trigger();
                if (await trigger()) {
                  setOpenModal(!openModal);
                }
              }}
              className="self-end border-none bg-[#3AC4A0] rounded-full text-white w-[268px] hover:bg-[#3AC4A0] disabled:text-white disabled:bg-[#3AC4A0]"
            >
              Next
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PromoCodeModalForm;
