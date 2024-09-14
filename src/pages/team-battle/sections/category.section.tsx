import { TeamBattleReq } from "_interfaces/team-battle.interface";
import { MouseEventHandler, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<TeamBattleReq>;
  handleResetForm: () => void;
}

interface ButtonPros {
  onClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
}

const ButtonCategory = ({ onClick, title }: ButtonPros) => (
  <Button
    fullWidth
    className="font-poppins text-base font-semibold text-[#7C7C7C] focus:text-[#3AC4A0]"
    onClick={onClick}
  >
    {title}
  </Button>
);

const TBCategoryModal = ({
  open,
  setOpen,
  setValue,
  handleResetForm,
}: Props) => {
  const [category, setCategory] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [state, setState] = useState<boolean>(true);
  const handleCategoryChange = (text: string) => {
    setCategory(text);
  };
  const handleTypeChange = (text: string) => {
    setMode(text);
  };
  return (
    <Modal
      open={open}
      className="bg-white max-w-[372px] p-8 flex flex-col gap-4 items-center"
    >
      <p className="font-poppins text-lg font-bold text-[#262626]">
        {state ? "Choose Game Mode" : "Choose Category"}
      </p>
      {state ? (
        <>
          <ButtonCategory
            onClick={() => handleTypeChange("PROVINCE")}
            title="Regional Clash"
          />
          <ButtonCategory
            onClick={() => handleTypeChange("UNIKOM")}
            title="Campus & Community Clash"
          />
        </>
      ) : (
        <>
          <ButtonCategory
            onClick={() => handleCategoryChange("ID_STOCK")}
            title="ID Stock"
          />
          <ButtonCategory
            onClick={() => handleCategoryChange("US_STOCK")}
            title="US Stock"
          />
          <ButtonCategory
            onClick={() => handleCategoryChange("CRYPTO")}
            title="Crypto"
          />
        </>
      )}

      <div className="w-full flex gap-4 justify-center">
        <Button
          className="w-[40%] font-poppins text-base font-semibold text-white bg-[#3AC4A0] hover:bg-[#3AC4A0]"
          onClick={() => {
            if (mode !== "") {
              setState(false);
              setValue("type", mode);
            }
            if (category !== "") {
              setValue("category", [category!]);
            }
          }}
        >
          OK
        </Button>
        <Button
          className="w-[40%] font-poppins text-base font-semibold text-[#3AC4A0]"
          onClick={() => {
            handleResetForm();
            setOpen(!open);
            setState(true);
            setMode("");
            setCategory("");
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default TBCategoryModal;
