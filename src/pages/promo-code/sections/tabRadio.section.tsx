import { PromoCodeTabI } from "_interfaces/promo-code.interfaces";
import SearchInput from "components/search-input";
import { Tabs } from "react-daisyui";
import FeatureId from "./featureId.section";

const TabRadio = ({
  data,
  onSubmit,
  onClick,
  onClickSelectAll,
  label,
  isLoading,
  typePromoCategory,
  extraElement,
  openTab,
  selectAll,
  checkedFeature,
  setCheckedFeature,
}: PromoCodeTabI) => {
  return (
    <>
      {!isLoading && (
        <Tabs.RadioTab
          name="modal2"
          label={label}
          active={openTab === label}
          onClick={onClick}
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
          <div className="flex flex-row w-full gap-3">
            <div className="w-full">
              <div
                className="flex items-center gap-3 cursor-pointer w-fit"
                onClick={onClickSelectAll}
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
              <div className="overflow-auto h-[200px]">
                {data !== null &&
                  selectAll.find((item) => item === typePromoCategory) ===
                    undefined &&
                  data?.map((value, index) => {
                    const indexId = checkedFeature.findIndex(
                      (item) => item.id === value.id
                    );
                    return (
                      <FeatureId
                        index={index}
                        indexId={indexId}
                        id={value.id}
                        name={value.name}
                        type={value.type}
                        logic={indexId !== -1 ? "hidden" : "flex"}
                        checkedFeature={checkedFeature}
                        setCheckedFeature={setCheckedFeature}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center h-10">
                <p className="font-semibold font-poppins text-sm text-[#262626]">
                  Selected Promo Code List
                </p>
              </div>
              <div
                className={`${
                  checkedFeature.length === 0 ? "hidden" : "h-[200px]"
                } overflow-auto`}
              >
                {checkedFeature.length !== 0 &&
                  checkedFeature?.map((value, index) => {
                    const indexId = checkedFeature.findIndex(
                      (item) => item.id === value.id
                    );
                    return (
                      <FeatureId
                        index={index}
                        indexId={indexId}
                        id={value.id}
                        name={value.name}
                        type={value.type}
                        logic={indexId !== -1 ? "flex" : "hidden"}
                        checkedFeature={checkedFeature}
                        setCheckedFeature={setCheckedFeature}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </Tabs.RadioTab>
      )}
    </>
  );
};

export default TabRadio;
