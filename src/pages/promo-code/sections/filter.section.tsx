import { PromoCodeFilter } from "_interfaces/promo-code.interfaces";
import close from "assets/svg/close.svg";
import CInput from "components/input";
import { categoryPromo } from "data/promo-code";
import { useState } from "react";
import { Button, Modal } from "react-daisyui";

const Filter = ({ open, setOpen }: PromoCodeFilter) => {
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);
  return (
    <Modal open={open} className="bg-white w-2/4 max-w-[1000px]">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black">Filter</p>
        <img
          src={close}
          alt="close"
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-5">
        <div className="flex gap-8">
          <div>
            <label className="font-semibold font-poppins text-base text-[#262626]">
              Start
            </label>
            <CInput type="datetime-local" />
          </div>
          <div>
            <label className="font-semibold font-poppins text-base text-[#262626]">
              End
            </label>
            <CInput type="datetime-local" />
          </div>
        </div>
        <div>
          <label className="font-semibold font-poppins text-base text-[#262626]">
            Status
          </label>
          <div className="flex gap-4">
            <Button
              className="border-[#BDBDBD]"
              onClick={() => setActive(!active)}
            >
              <input type="checkbox" checked={active} className="w-5 h-5" />
              <p className="font-normal font-poppins text-base text-[#262626]">
                Active
              </p>
            </Button>
            <Button
              className="border-[#BDBDBD]"
              onClick={() => {
                setInactive(!inactive);
                console.log(inactive);
              }}
            >
              <input type="checkbox" checked={inactive} className="w-5 h-5" />
              <p className="font-normal font-poppins text-base text-[#262626]">
                Inactive
              </p>
            </Button>
          </div>
        </div>
        <div>
          <label className="font-semibold font-poppins text-base text-[#262626]">
            Category Promo
          </label>
          <div className="flex gap-7">
            {categoryPromo.map((value, index) => {
              return (
                <label
                  htmlFor={value}
                  className="flex gap-5 cursor-pointer font-normal font-poppins text-base text-[#262626]"
                >
                  <input
                    type="radio"
                    name="radio"
                    className="w-6 h-6"
                    id={value}
                  />
                  {value}
                </label>
              );
            })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Filter;
