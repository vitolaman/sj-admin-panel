import { PromoCodeModal } from "_interfaces/promo-code.interfaces";
import CInput from "components/input";
import { labelInput } from "data/promo-code";
import { Form, Modal, Radio } from "react-daisyui";

const PromoCodeForm = ({ open, type }: PromoCodeModal) => {
  const textInputStyling = {
    fontWeight: "400",
    fontFamily: "Poppins, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#201B1C",
  };
  const textLabelStyling =
    "font-semibold font-poppins text-base text-[#262626]";
  return (
    <Modal open={open} className="bg-white w-2/3 max-w-[1000px] py-10 px-16">
      <Modal.Header className="font-semibold font-poppins text-xl text-black">
        {type} Promo Code
      </Modal.Header>
      <Modal.Body className="flex justify-between gap-10">
        <div className="flex flex-col gap-4 w-full">
          {labelInput.slice(0, 3).map((value, index: number) => {
            return (
              <div className="flex flex-col gap-2" key={index}>
                <label
                  className="font-semibold font-poppins text-base text-[#262626]"
                  htmlFor={value.label}
                >
                  {value.label}
                </label>
                <CInput
                  type={value.label === "Quota" ? "number" : "string"}
                  maxLength={value.label === "Promo Code" ? 10 : undefined}
                  min={0}
                  style={textInputStyling}
                  id={value.label}
                />
                {value.label === "Quota" ? (
                  <p className="font-light font-poppins text-sm text-[#7C7C7C]">
                    Max 10 character
                  </p>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          <div className="flex flex-col gap-2">
            <label className={textLabelStyling}>Discount Type</label>
            <div className="flex gap-4">
              <Form.Label title="Tes" className="flex flex-row-reverse gap-4">
                <Radio />
              </Form.Label>
              <Form.Label title="Tes" className="flex flex-row-reverse gap-4">
                <Radio />
              </Form.Label>
            </div>
          </div>

          {labelInput.slice(6).map((value, index: number) => {
            return (
              <div className="flex flex-col gap-2" key={index}>
                <label
                  className="font-semibold font-poppins text-base text-[#262626]"
                  htmlFor={value.label}
                >
                  {value.label}
                </label>
                <CInput
                  type="number"
                  min={0}
                  style={textInputStyling}
                  id={value.label}
                />
              </div>
            );
          })}
        </div>
        <div className="border border-[#9B9B9B]"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold font-poppins text-base text-[#262626]"
              htmlFor="Title"
            >
              Title
            </label>
            <CInput id="Title" />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="font-semibold font-poppins text-base text-[#262626]"
              htmlFor="PromoCode"
            >
              Promo Code
            </label>
            <CInput id="PromoCode" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold font-poppins text-base text-[#262626]"
              htmlFor="Quota"
            >
              Quota
            </label>
            <CInput id="Quota" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold font-poppins text-base text-[#262626]"
              htmlFor="DiscountNominal"
            >
              Discount Nominal
            </label>
            <CInput id="DiscountNominal" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold font-poppins text-base text-[#262626]"
              htmlFor="MaxRedeem"
            >
              Max Redeem
            </label>
            <CInput id="MaxRedeem" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold font-poppins text-base text-[#262626]"
              htmlFor="MinTransaction"
            >
              Min Transaction
            </label>
            <CInput id="MinTransaction" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PromoCodeForm;
