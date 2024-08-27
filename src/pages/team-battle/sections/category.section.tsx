import { TeamBattleReq } from "_interfaces/team-battle.interface";
import { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<TeamBattleReq>;
  handleResetForm: () => void;
}

interface ButtonPros {
  handleCategoryChange: (text: string) => void;
  title: string;
  text: string;
}

const ButtonCategory = ({ handleCategoryChange, title, text }: ButtonPros) => (
  <Button
    fullWidth
    className="font-poppins text-base font-semibold text-[#7C7C7C] focus:text-[#3AC4A0]"
    onClick={() => {
      handleCategoryChange(text);
    }}
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
  const handleCategoryChange = (text: string) => {
    setCategory(text);
  };
  return (
    <Modal
      open={open}
      className="bg-white max-w-[372px] p-8 flex flex-col gap-4 items-center"
    >
      <p className="font-poppins text-lg font-bold text-[#262626]">
        Choose Category
      </p>
      <ButtonCategory
        handleCategoryChange={handleCategoryChange}
        title="ID Stock"
        text="ID_STOCKS"
      />
      <ButtonCategory
        handleCategoryChange={handleCategoryChange}
        title="US Stock"
        text="US_STOCKS"
      />
      <ButtonCategory
        handleCategoryChange={handleCategoryChange}
        title="Crypto"
        text="CRYPTO"
      />
      <div className="w-full flex gap-4 justify-center">
        <Button
          className="w-[40%] font-poppins text-base font-semibold text-white bg-[#3AC4A0] hover:bg-[#3AC4A0]"
          onClick={() => {
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
