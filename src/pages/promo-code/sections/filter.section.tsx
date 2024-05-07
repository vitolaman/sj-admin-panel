import { PromoCodeFilter } from "_interfaces/promo-code.interfaces";
import CInput from "components/input";
import { categoryPromo } from "data/promo-code";
import { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FiX } from "react-icons/fi";
import { customMonth } from "data/promo-code";

const Filter = ({
  open,
  setOpen,
  setParams,
  defaultValue,
}: PromoCodeFilter) => {
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  return (
    <Modal open={open} className="bg-white w-2/4 max-w-[1000px]">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black">Filter</p>
        <FiX className="cursor-pointer" onClick={() => setOpen(!open)} />
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-5">
        <div className="flex gap-8">
          <div className="w-52">
            <label className="font-semibold font-poppins text-base text-[#262626]">
              Start
            </label>
            <div className="relative">
              <CInput
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
              <div
                className={`${
                  startDate === "" ? "hidden" : ""
                } absolute top-1 flex items-center left-0 ms-4 h-10 bg-white`}
              >
                <p className=" font-poppins font-normal text-base text-[#262626]">
                  {`${startDate?.split("-")[2]} ${
                    customMonth[
                      parseInt(startDate?.split("-")[1]?.replace("0", "")) - 1
                    ]
                  } ${startDate?.split("-")[0]}`}
                </p>
              </div>
            </div>
          </div>
          <div className="w-52">
            <label className="font-semibold font-poppins text-base text-[#262626]">
              End
            </label>
            <div className="relative">
              <CInput
                type="date"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                value={endDate}
              />
              <div
                className={`${
                  endDate === "" ? "hidden" : ""
                } absolute top-1 flex items-center left-0 ms-4 h-10 bg-white`}
              >
                <p className="w-full font-poppins font-normal text-base text-[#262626]">
                  {`${endDate?.split("-")[2]} ${
                    customMonth[
                      parseInt(endDate?.split("-")[1]?.replace("0", "")) - 1
                    ]
                  } ${endDate?.split("-")[0]}`}
                </p>
              </div>
            </div>
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
        <div className="flex gap-3 self-end">
          <Button
            className="rounded-full w-32 border-seeds hover:border-seeds text-seeds"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setParams(defaultValue);
              setOpen(!open);
            }}
          >
            Clear
          </Button>
          <Button
            className="rounded-full w-32 bg-seeds border-seeds hover:border-seeds hover:bg-seeds text-white"
            onClick={() => {
              setParams((prev) => ({
                ...prev,
                start_date_from: startDate,
                start_date_until: endDate,
              }));
              setOpen(!open);
            }}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Filter;
