import { FeatureIdI } from "_interfaces/promo-code.interfaces";

const FeatureId = ({
  index,
  indexId,
  id,
  name,
  type,
  logic,
  checkedFeature,
  setCheckedFeature,
}: FeatureIdI) => {
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

export default FeatureId;
