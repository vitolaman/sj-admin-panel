import { PromoCodeModal } from "_interfaces/promo-code.interfaces";
import { Button, Modal } from "react-daisyui";
import RightSide from "./rightSide.section";
import LeftSide from "./leftSide.section";

const PromoCodeForm = ({ open, type }: PromoCodeModal) => {
  return (
    <Modal open={open} className="bg-white w-5/6 max-w-[1200px] p-10">
      <Modal.Header className="font-semibold font-poppins text-xl text-black">
        {type} Promo Code
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-16">
        <div className="flex justify-between gap-10">
          <RightSide />
          <div className="border border-[#9B9B9B]"></div>
          <LeftSide />
        </div>

        <Button className="self-end border-none bg-[#3AC4A0] rounded-full text-white w-[268px] hover:bg-[#3AC4A0]">
          Next
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PromoCodeForm;
