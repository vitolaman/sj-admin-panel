import { useEffect, useState } from "react";
import { Button, Modal, Tabs } from "react-daisyui";
import TabRadio from "./tabRadio.section";
import {
  useArticleSelection,
  useCircleSelection,
  usePlaySelection,
  useQuizSelection,
} from "hooks/promo-code/useCategoryState";
import { PlayReq } from "_interfaces/play.interfaces";
import { GetQuizQuery } from "_interfaces/quiz.interfaces";
import { CategoryModalPromoCodeI } from "_interfaces/promo-code.interfaces";
import { Loader } from "components/spinner/loader";
import { toast } from "react-toastify";

export default function CategoryModal({
  open,
  setOpen,
  openModal,
  setOpenModal,
  loadingUpsert,
  promoCodeData,
  setValue,
  handleCreate,
  handleUpdate,
  handleResetFilter,
  handleResetForm,
  selectAll,
  setSelectAll,
  checkedFeature,
  setCheckedFeature,
  typeCategoryPromo,
  filterCircle,
  setFilterCircle,
  filterPlay,
  setFilterPlay,
  filterQuiz,
  setFilterQuiz,
  filterArticle,
  setFilterArticle,
  watch,
}: CategoryModalPromoCodeI) {
  const [openTab, setOpenTab] = useState<string>("circle");
  const [playCategory, setPlayCategory] = useState<string>("Tournament");

  const { circleSelection, setCircleSelection, dataCircle, isLoadingCircle } =
    useCircleSelection(filterCircle);
  const { playSelection, setPlaySelection, dataPlay, isLoadingPlay } =
    usePlaySelection(filterPlay);
  const { quizSelection, setQuizSelection, dataQuiz, isLoadingQuiz } =
    useQuizSelection(filterQuiz);
  const {
    articleSelection,
    setArticleSelection,
    dataArticle,
    isLoadingArticle,
  } = useArticleSelection(filterArticle);

  const handleCategoryPromo = (type: string) => {
    if (selectAll.find((item) => item === type)) {
      setSelectAll((prev) => prev.filter((item) => item !== type));
    } else {
      setSelectAll((prev) => [...prev, type]);
      setCheckedFeature((prev) => prev.filter((item) => item.type !== type));
    }
  };

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
  return (
    <>
      {isLoadingCircle || isLoadingPlay || isLoadingQuiz || isLoadingArticle ? (
        <Loader />
      ) : (
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
                  setOpenTab("circle");
                  handleResetFilter();
                }}
                onClickSelectAll={() => {
                  handleCategoryPromo("Premium Circle");
                }}
                label="circle"
                isLoading={isLoadingCircle}
                typePromoCategory="Premium Circle"
                openTab={openTab}
                selectAll={selectAll}
                checkedFeature={checkedFeature}
                setCheckedFeature={setCheckedFeature}
              />
            )}
            {playSelection !== undefined && (
              <TabRadio
                data={
                  playCategory === "Tournament" ? playSelection : quizSelection
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
                  setOpenTab("play");
                  handleResetFilter();
                }}
                onClickSelectAll={() => {
                  if (playCategory === "Tournament") {
                    handleCategoryPromo("Paid Tournament");
                  } else {
                    handleCategoryPromo("Paid Quiz");
                  }
                }}
                label="play"
                isLoading={
                  playCategory === "Tournament" ? isLoadingPlay : isLoadingQuiz
                }
                typePromoCategory={
                  playCategory === "Tournament"
                    ? "Paid Tournament"
                    : "Paid Quiz"
                }
                openTab={openTab}
                selectAll={selectAll}
                checkedFeature={checkedFeature}
                setCheckedFeature={setCheckedFeature}
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
                  setOpenTab("article");
                  handleResetFilter();
                }}
                onClickSelectAll={() => {
                  handleCategoryPromo("Premium Content");
                }}
                label="article"
                isLoading={isLoadingArticle}
                typePromoCategory="Premium Content"
                openTab={openTab}
                selectAll={selectAll}
                checkedFeature={checkedFeature}
                setCheckedFeature={setCheckedFeature}
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
                  if (checkedFeature.length !== 0) {
                    setValue(
                      "feature_ids",
                      checkedFeature.map((obj) => obj.id.toString())
                    );
                  } else {
                    setValue("feature_ids", []);
                  }
                  setValue("type", typeCategoryPromo.join(","));
                  if (watch("type") !== "") {
                    if (promoCodeData !== undefined) {
                      await handleUpdate(e);
                    } else {
                      await handleCreate(e);
                    }
                    handleResetForm();
                    setOpen(!open);
                    setOpenModal(!openModal);
                  } else {
                    toast.error("You must select at least one promo code");
                  }
                }}
                className="border-none bg-[#3AC4A0] rounded-full text-white w-[268px] hover:bg-[#3AC4A0]"
              >
                Save
              </Button>
            </Modal.Actions>
          </div>
        </>
      )}
    </>
  );
}
