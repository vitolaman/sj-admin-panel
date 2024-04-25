import {
  ListIdI,
  PromoCodeInput,
  PromoCodeModal,
  PromoCodeRadio,
  PromoCodeTab,
} from "_interfaces/promo-code.interfaces";
import { Button, Modal, Tabs } from "react-daisyui";
import useUpsertCodeForm from "hooks/promo-code/useUpsertPromoCodeForm";
import CInput from "components/input";
import { useEffect, useState } from "react";
import {
  discountType,
  levelExpOptions,
  segmentUserOptions,
  // statusPromo,
} from "data/promo-code";
import { Controller } from "react-hook-form";
import { useGetReferralCodesQuery } from "services/modules/referral-code";
import ReactSelect from "react-select";
import SearchInput from "components/search-input";
import { useFilterRef } from "../../../hooks/promo-code/useFilterState";
import { PlayReq } from "_interfaces/play.interfaces";
import { GetQuizQuery } from "_interfaces/quiz.interfaces";
import { useLazyGetPromoCodeByIdQuery } from "services/modules/promo-code";
import moment from "moment";
import { FiX } from "react-icons/fi";
import {
  useArticleSelection,
  useCircleSelection,
  usePlaySelection,
  useQuizSelection,
} from "hooks/promo-code/useCategoryState";

const PromoCodeForm = ({
  open,
  setOpen,
  id,
  setPromoCodeId,
}: PromoCodeModal) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState<string>("circle");
  const [discountSelect, setDiscountSelect] = useState<string>("");
  const [levelSelect, setLevelSelect] = useState<string>("");
  // hide until endpoint updated
  // const [statusSelect, setStatusSelect] = useState<string>("");
  // const [richValue, setRichValue] = useState("");
  const [segmentUser, setSegmentUser] = useState("");
  const [playCategory, setPlayCategory] = useState<string>("Tournament");
  const [selectAll, setSelectAll] = useState<string[]>([]);
  const [selectIdType, setSelectIdType] = useState<string[]>([]);
  const [typeCategoryPromo, setTypeCategoryPromo] = useState<string[]>([]);
  const [checkedFeature, setCheckedFeature] = useState<
    {
      id: string;
      name: string;
      type: string;
    }[]
  >([]);
  const [refCodeSelection, setRefCodeSelection] = useState<
    {
      key: number;
      label: string;
      value: string;
    }[]
  >([]);

  const {
    circleSelection,
    setCircleSelection,
    filterCircle,
    setFilterCircle,
    dataCircle,
    isLoadingCircle,
  } = useCircleSelection();
  const {
    playSelection,
    setPlaySelection,
    filterPlay,
    setFilterPlay,
    dataPlay,
    isLoadingPlay,
  } = usePlaySelection();
  const {
    quizSelection,
    setQuizSelection,
    filterQuiz,
    setFilterQuiz,
    dataQuiz,
    isLoadingQuiz,
  } = useQuizSelection();
  const {
    articleSelection,
    setArticleSelection,
    filterArticle,
    setFilterArticle,
    dataArticle,
    isLoadingArticle,
  } = useArticleSelection();

  const { paramsRef, setParamsRef } = useFilterRef();
  const [getPromoCode, promoCodeDetailState] = useLazyGetPromoCodeByIdQuery();
  const dataRef = useGetReferralCodesQuery(paramsRef).data;

  const {
    handleCreate,
    handleUpdate,
    register,
    errors,
    reset,
    control,
    errorUpsert,
    loadingUpsert,
    defaultValues,
    getValues,
    setValue,
    trigger,
  } = useUpsertCodeForm();

  const validModal =
    getValues().name_promo_code !== "" &&
    getValues().promo_code !== "" &&
    getValues().discount_type !== "" &&
    getValues().min_transaction !== 0 &&
    getValues().start_date !== "" &&
    getValues().end_date !== "" &&
    getValues().description !== "";

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
  const handleCategoryPromo = (type: string) => {
    if (selectAll.find((item) => item === type)) {
      setSelectAll((prev) => prev.filter((item) => item !== type));
    } else {
      setSelectAll((prev) => [...prev, type]);
      setCheckedFeature((prev) => prev.filter((item) => item.type !== type));
    }
  };

  const handleSelectedIdType=(category:string)=>{if (
    checkedFeature.find((item) => {
      item.type === category;
    }) === undefined
  ) {
    setSelectIdType((prev) =>
      prev.filter((item) => item !== category)
    );
  }}
  //TODO:UseEffect
  useEffect(() => {
    handleSelectedIdType("Premium Circle")
    handleSelectedIdType("Paid Tournament")
    handleSelectedIdType("Paid Quiz")
    handleSelectedIdType("Premium Content")
  }, [checkedFeature]);
  useEffect(() => {
    const filteredTypeCategoryPromo = [...selectAll, ...selectIdType].filter(
      (value, index, self) => {
        return self.indexOf(value) === index;
      }
    );
    setTypeCategoryPromo(filteredTypeCategoryPromo);
  }, [checkedFeature]);
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
    if (dataCircle?.data === null) {
      setCircleSelection([]);
    } else if (dataCircle) {
      const tempOptPlay: {
        id: string;
        name: string;
        type: string;
      }[] = dataCircle?.data.map((item, i) => ({
        id: item.id,
        name: item.name,
        type: "Premium Circle",
      }));
      setCircleSelection(tempOptPlay);
    }
  }, [dataCircle, filterCircle]);

  useEffect(() => {
    if (dataPlay?.playList === null) {
      setPlaySelection([]);
    } else if (dataPlay) {
      const tempOptPlay: {
        id: string;
        name: string;
        type: string;
      }[] = dataPlay?.playList.map((item, i) => ({
        id: item.id,
        name: item.name,
        type: "Paid Tournament",
      }));
      setPlaySelection(tempOptPlay);
    }
  }, [dataPlay, filterPlay]);

  useEffect(() => {
    if (dataQuiz?.data === null) {
      setQuizSelection([]);
    } else if (dataQuiz) {
      const tempOptQuiz: {
        id: string;
        name: string;
        type: string;
      }[] = dataQuiz?.data.map((item, i) => ({
        id: item.id,
        name: item.name,
        type: "Paid Quiz",
      }));
      setQuizSelection(tempOptQuiz);
    }
  }, [dataQuiz, filterQuiz]);

  useEffect(() => {
    if (dataArticle?.data === null) {
      setArticleSelection([]);
    } else if (dataArticle) {
      const tempOptArticle: {
        id: string;
        name: string;
        type: string;
      }[] = dataArticle?.data.map((item, i) => ({
        id: String(item.id),
        name: item.title,
        type: "Premium Content",
      }));
      setArticleSelection(tempOptArticle);
    }
  }, [dataArticle, filterArticle]);

  useEffect(() => {
    if (promoCodeDetailState.data && id) {
      reset({
        ...promoCodeDetailState.data,
        start_date: moment(promoCodeDetailState.data.start_date).format(
          "YYYY-MM-DD"
        ),
        end_date: moment(promoCodeDetailState.data.start_date).format(
          "YYYY-MM-DD"
        ),
      });
    }
    if (id !== undefined && id !== "") {
      getPromoCode(id);
      setSegmentUser(promoCodeDetailState.data?.segment_user as string);
      setDiscountSelect(promoCodeDetailState.data?.discount_type as string);
    }
  }, [promoCodeDetailState.data, id]);

  const CustomInput = ({
    label,
    registerName,
    type,
    maxLength,
    placeholder,
    extraElement,
  }: PromoCodeInput) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          className="font-semibold font-poppins text-base text-[#262626] cursor-pointer"
          htmlFor={`${label} label`}
        >
          {label}
        </label>
        <CInput
          type={type}
          maxLength={maxLength}
          min={0}
          disabled={
            (label === "Title" ||
              label === "Promo Code" ||
              label === "Discount Nominal" ||
              label === "Discount Percentage" ||
              label === "Max Discount") &&
            id !== ""
              ? true
              : false
          }
          style={{
            fontWeight: "400",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#201B1C",
          }}
          id={`${label} label`}
          placeholder={placeholder}
          {...register(registerName)}
        />
        {extraElement}
        <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
          {errors[registerName]?.message}
        </p>
      </div>
    );
  };
  const RadioInput = ({
    label,
    registerName,
    name,
    disabled,
    mapping,
    select,
    setSelect,
  }: PromoCodeRadio) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold font-poppins text-base text-[#262626]">
          {label}
        </label>
        <div className="flex gap-7 flex-wrap">
          {mapping.map((value, index) => {
            return (
              <label
                key={index}
                onClick={() => {
                  if (id === "") {
                    setSelect(value.label);
                    setValue(registerName, value.value);
                  }
                }}
                htmlFor={value.label}
                className={`flex gap-5 font-normal font-poppins text-base ${
                  id !== ""
                    ? "text-[#727272] cursor-not-allowed"
                    : select === value.label
                    ? "text-[#007bff] cursor-pointer"
                    : "text-[#262626] cursor-pointer"
                }`}
              >
                <input
                  type="radio"
                  name={name}
                  className={`w-6 h-6 ${
                    disabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  id={value.label}
                  disabled={disabled}
                  checked={select === value.label}
                />
                {value.label}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const ListId = ({ index, indexId, id, name, type, logic }: ListIdI) => {
    return (
      <div
        key={index}
        className={`${logic} items-center gap-3 py-3 border-b border-[#E9E9E9] cursor-pointer`}
        onClick={() => {
          if (indexId === -1) {
            setCheckedFeature((prev) => [
              ...prev,
              { id: id, name: name, type: type },
            ]);
            setSelectIdType((prev) => [...prev, type]);
          } else {
            setCheckedFeature((prev) => prev.filter((item) => item.id !== id));
          }
        }}
      >
        <input
          type="checkbox"
          className="w-4 h-4 m-3"
          checked={checkedFeature.find((item) => item.id === id) !== undefined}
        />
        <div>
          <p className="font-normal font-poppins text-sm text-[#7C7C7C]">
            ID : {id}
          </p>
          <p className="uppercase font-normal font-poppins text-base text-[#262626]">
            {name}
          </p>
        </div>
      </div>
    );
  };

  const TabRadio = ({
    data,
    onSubmit,
    onClick,
    label,
    isLoading,
    typePromoCategory,
    extraElement,
  }: PromoCodeTab) => {
    return (
      <>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Tabs.RadioTab
            name="modal2"
            label={label}
            active={openTab === label}
            onClick={() => {
              setOpenTab(label);
              handleResetFilter();
            }}
            className={`!w-[390px] capitalize text-center font-semibold font-poppins text-base ${
              openTab === label
                ? "border-b-4 border-[#27A590] text-[#27A590]"
                : "border-b border-[#BDBDBD] text-[#7C7C7C]"
            }`}
          >
            {extraElement}
            <SearchInput
              onSubmit={onSubmit}
              placeholder="Search"
              formClassName="w-full my-4 border-[#7C7C7C]"
              className="w-full"
            />
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={onClick}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 m-3"
                  checked={
                    selectAll.find((item) => item === typePromoCategory) !==
                    undefined
                  }
                />
                <p className="font-semibold font-poppins text-sm text-[#262626]">
                  Select All
                </p>
              </div>
              <div
                className={`${
                  checkedFeature.length === 0
                    ? "hidden"
                    : checkedFeature.length <= 2
                    ? "h-[100px]"
                    : "h-[200px]"
                } overflow-auto`}
              >
                {checkedFeature.length !== 0 &&
                  checkedFeature?.map((value, index) => {
                    const indexId = checkedFeature.findIndex(
                      (item) => item.id === value.id
                    );
                    return (
                      <ListId
                        index={index}
                        indexId={indexId}
                        id={value.id}
                        name={value.name}
                        type={value.type}
                        logic={indexId !== -1 ? "flex" : "hidden"}
                      />
                    );
                  })}
              </div>
              <div className="overflow-auto h-[200px]">
                {data !== null &&
                  selectAll.find((item) => item === typePromoCategory) ===
                    undefined &&
                  data?.map((value, index) => {
                    const indexId = checkedFeature.findIndex(
                      (item) => item.id === value.id
                    );
                    return (
                      <ListId
                        index={index}
                        indexId={indexId}
                        id={value.id}
                        name={value.name}
                        type={value.type}
                        logic={indexId !== -1 ? "hidden" : "flex"}
                      />
                    );
                  })}
              </div>
            </div>
          </Tabs.RadioTab>
        )}
      </>
    );
  };

  //TODO:Parent Element
  return (
    <Modal
      open={open}
      className="bg-white w-11/12 max-w-[2000px] p-8"
    >
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit">
          {open && openModal
            ? "Choose Category Promo"
            : `${id === undefined ? "Create" : "Edit"} Promo Code`}
        </p>
        <FiX
          onClick={() => {
            reset({ ...defaultValues });
            setPromoCodeId("");
            setDiscountSelect("");
            setSegmentUser("");
            handleResetFilter();
            setOpen(!open);
            if (openModal === true) {
              setOpenModal(!openModal);
            }
          }}
          className="cursor-pointer"
        />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        {open && openModal ? (
          <>
            <Tabs className="w-full">
              {circleSelection !== undefined && (
                <TabRadio
                  data={circleSelection}
                  onSubmit={(formData) => {
                    setFilterCircle((prev) => ({
                      ...prev,
                      search: formData.text,
                    }));
                  }}
                  onClick={() => {
                    handleCategoryPromo("Premium Circle");
                  }}
                  label="circle"
                  isLoading={isLoadingCircle}
                  typePromoCategory="Premium Circle"
                />
              )}
              {playSelection !== undefined && (
                <TabRadio
                  data={
                    playCategory === "Tournament"
                      ? playSelection
                      : quizSelection
                  }
                  onSubmit={(formData) => {
                    if (playCategory === "Tournament") {
                      setFilterPlay((prev: PlayReq) => ({
                        ...prev,
                        search: formData.text,
                      }));
                    } else {
                      setFilterQuiz((prev: GetQuizQuery) => ({
                        ...prev,
                        search: formData.text,
                      }));
                    }
                  }}
                  onClick={() => {
                    if (playCategory === "Tournament") {
                      handleCategoryPromo("Paid Tournament");
                    } else {
                      handleCategoryPromo("Paid Quiz");
                    }
                  }}
                  label="play"
                  isLoading={
                    playCategory === "Tournament"
                      ? isLoadingPlay
                      : isLoadingQuiz
                  }
                  typePromoCategory={
                    playCategory === "Tournament"
                      ? "Paid Tournament"
                      : "Paid Quiz"
                  }
                  extraElement={
                    <div className="flex gap-5 items-center my-4">
                      <p className="font-semibold font-poppins text-lg text-[#201B1C]">
                        Play Category
                      </p>
                      <Button
                        onClick={() => {
                          setPlayCategory("Tournament");
                          setFilterQuiz((prev: GetQuizQuery) => ({
                            ...prev,
                            search: "",
                          }));
                        }}
                        className={`${
                          playCategory === "Tournament"
                            ? "bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]"
                            : "bg-[#E9E9E980] text-[#7C7C7C] hover:bg-[#E9E9E980]"
                        } border-none w-[174px] font-normal  font-poppins text-sm`}
                      >
                        Play Tournament
                      </Button>
                      <Button
                        onClick={() => {
                          setPlayCategory("Quiz");
                          setFilterPlay((prev: PlayReq) => ({
                            ...prev,
                            search: "",
                          }));
                        }}
                        className={`${
                          playCategory === "Quiz"
                            ? "bg-[#3AC4A0] text-white hover:bg-[#3AC4A0]"
                            : "bg-[#E9E9E980] text-[#7C7C7C] hover:bg-[#E9E9E980]"
                        } border-none w-[174px] font-normal font-poppins text-sm`}
                      >
                        Play Quiz
                      </Button>
                    </div>
                  }
                />
              )}
              {articleSelection !== undefined && (
                <TabRadio
                  data={articleSelection}
                  onSubmit={(formData) => {
                    setFilterArticle((prev) => ({
                      ...prev,
                      search_title: formData.text,
                    }));
                  }}
                  onClick={() => {
                    handleCategoryPromo("Premium Content");
                  }}
                  label="article"
                  isLoading={isLoadingArticle}
                  typePromoCategory="Premium Content"
                />
              )}
            </Tabs>
            <div className="self-end flex gap-4">
              <Button
                onClick={() => {
                  setOpenModal(!openModal);
                  handleResetFilter();
                }}
                className="border-[#3AC4A0] bg-white rounded-full text-[#3AC4A0] w-[268px] hover:bg-white"
              >
                Back
              </Button>
              <Modal.Actions className="m-0">
                <Button
                  loading={loadingUpsert}
                  onClick={async (e) => {
                    setValue(
                      "feature_ids",
                      checkedFeature.map((obj) => obj.id.toString())
                    );
                    setValue("type", typeCategoryPromo.join(","));
                    if (id !== undefined && id !== "") {
                      await handleUpdate(e);
                    } else {
                      await handleCreate(e);
                    }
                    setOpen(!open);
                    setOpenModal(!openModal);
                  }}
                  className="border-none bg-[#3AC4A0] rounded-full text-white w-[268px] hover:bg-[#3AC4A0]"
                >
                  Save
                </Button>
              </Modal.Actions>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-10">
              <div className="flex flex-col gap-4 w-5/12">
                <CustomInput
                  label="Title"
                  type="string"
                  registerName="name_promo_code"
                />
                <CustomInput
                  label="Promo Code"
                  registerName="promo_code"
                  type="string"
                  maxLength={10}
                  extraElement={
                    <p className="font-light font-poppins text-sm text-[#7C7C7C]">
                      Max 10 character
                    </p>
                  }
                />
                <CustomInput
                  label="Quota"
                  type="number"
                  registerName="quantity"
                />
                <RadioInput
                  label="Discount Type"
                  registerName="discount_type"
                  name="discount"
                  disabled={id !== ""}
                  mapping={discountType}
                  select={discountSelect}
                  setSelect={setDiscountSelect}
                />
                <div className="flex gap-4 w-full">
                  {discountSelect === "Percentage" ? (
                    <>
                      <CustomInput
                        label="Discount Percentage"
                        registerName="discount_percentage"
                        type="number"
                        placeholder="%"
                      />
                      <CustomInput
                        label="Max Discount"
                        registerName="max_discount"
                        type="number"
                        placeholder="Rp"
                      />
                    </>
                  ) : discountSelect === "Nominal" ? (
                    <CustomInput
                      label="Discount Nominal"
                      registerName="discount_amount"
                      type="number"
                      placeholder="Rp"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {/* this registerName should change if endpoint already updated */}
                {/* <CustomInput label="Max Redeem" type="number" registerName='' /> */}
                <CustomInput
                  label="Min Transaction"
                  type="number"
                  registerName="min_transaction"
                />
              </div>
              <div className="border border-[#9B9B9B]"></div>
              <div className="flex flex-col gap-4 w-7/12">
                {/* <RadioInput
    label="Status"
    // this registerName should change if endpoint already updated 
    registerName=""
    name="status"
    mapping={statusPromo}
    select={statusSelect}
    setSelect={setStatusSelect}
  /> */}
                <div className="flex gap-4 w-full">
                  <CustomInput
                    label="Start Date"
                    registerName="start_date"
                    type="date"
                  />
                  <CustomInput
                    label="End Date"
                    registerName="end_date"
                    type="date"
                  />
                </div>
                <CustomInput
                  label="Description"
                  registerName="description"
                  type="string"
                />
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
                    Segment User
                  </label>
                  <Controller
                    control={control}
                    name="segment_user"
                    render={({ field: { value, onChange } }) => (
                      <ReactSelect
                        styles={{
                          control: (baseStyle) => ({
                            ...baseStyle,
                            padding: 5,
                            borderColor: "#BDBDBD",
                            borderRadius: "0.5rem",
                          }),
                        }}
                        options={segmentUserOptions}
                        value={segmentUserOptions.find(
                          (item) => item.value === value
                        )}
                        isDisabled={id !== ""}
                        onChange={(e) => {
                          onChange(e?.value);
                          if (e?.label !== "Tier Level (Xp Management)") {
                            setLevelSelect("");
                            setValue("min_exp", 0);
                          }
                          if (e?.label !== "User based on referral") {
                            setValue("ref_code", "");
                          }
                          setSegmentUser(e?.value ?? "");
                        }}
                      />
                    )}
                  />
                </div>
                {segmentUser === segmentUserOptions[3].value && (
                  <RadioInput
                    label="Choose Level"
                    name="level"
                    mapping={levelExpOptions}
                    registerName="min_exp"
                    select={levelSelect}
                    setSelect={setLevelSelect}
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
                        <ReactSelect
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
                          options={refCodeSelection}
                          value={refCodeSelection.find(
                            (item) => item.value === value
                          )}
                          onChange={(e) => {
                            onChange(e?.value);
                            setValue(
                              "ref_code",
                              promoCodeDetailState.data?.ref_code ??
                                e?.value ??
                                ""
                            );
                          }}
                        />
                      )}
                    />
                  </div>
                )}
                {/* Input setValue if endpoint already updated */}
                {/* <div className="flex flex-col gap-2 w-full">
    <label className="font-semibold font-poppins text-base text-[#262626] cursor-pointer">
      Term & Conditions
    </label>
    
    <ReactQuill
      theme="snow"
      value={richValue}
      onChange={setRichValue}
    />
  </div> */}
              </div>
            </div>
            <Button
              onClick={() => {
                trigger();
                if (validModal) {
                  setOpenModal(!openModal);
                }
              }}
              className="self-end border-none bg-[#3AC4A0] rounded-full text-white w-[268px] hover:bg-[#3AC4A0]"
            >
              Next
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PromoCodeForm;
