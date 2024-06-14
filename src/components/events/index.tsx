import React, { ForwardRefRenderFunction, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaidState } from "store/events/paidSlice";
  
interface IModalCreateEvent {
  ref: React.DialogHTMLAttributes<HTMLDialogElement>;
  handleClose: () => void;
}

const CreateEventModal: ForwardRefRenderFunction<
  HTMLDialogElement,
  IModalCreateEvent
> = ({ handleClose }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFreeEvent, setIsFreeEvent] = useState<boolean>(false);
  const [isPaidEvent, setIsPaidEvent] = useState<boolean>(false);

  const handleChooseFreeEvent = (): void => {
    setIsFreeEvent(true)
    setIsPaidEvent(false)
    dispatch(setPaidState(false));
  }

  const handleChoosePaidEvent = (): void => {
    setIsFreeEvent(false)
    setIsPaidEvent(true)
    dispatch(setPaidState(true));
  }

  const handleRedirectCreate = (): void => {
    handleClose
    navigate("/homepage-feature/events/create");
  }

  return (
    <div className="font-sans">
      <Modal
        backdrop={true}
        ref={ref}
        className="bg-white"
      >
        <Modal.Body>
          <div className="w-full text-center font-bold text-lg">
            Choose Category
          </div>
          <div className="text-center text-[14px] text-[#7C7C7C]">
            Please select the event category you want to create.
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div
              onClick={() => handleChooseFreeEvent()}
              className="w-full flex justify-between cursor-pointer p-4 rounded-full hover:bg-[#F9F9F9] duration-300"
            >
              <div className={`${isFreeEvent ? 'text-[#3AC4A0]' : 'text-black'} font-poppins`}>
                Free Events
              </div>
              <input
                type="radio"
                name="isFreeEvent"
                className='w-6 h-6 cursor-pointer'
                onChange={handleChooseFreeEvent}
                checked={isFreeEvent}
              />
            </div>
            <div
              onClick={() => handleChoosePaidEvent()}
              className="w-full flex justify-between cursor-pointer p-4 rounded-full hover:bg-[#F9F9F9] duration-300"
            >
              <div className={`${isPaidEvent ? 'text-[#3AC4A0]' : 'text-black'} font-poppins`}>
                Paid Events
              </div>
              <input
                type="radio"
                name="isPaidEvent"
                className='w-6 h-6 cursor-pointer'
                onChange={handleChoosePaidEvent}
                checked={isPaidEvent}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions className="flex w-full flex-col items-center mb-2">
          <Button
            onClick={() => handleRedirectCreate()}
            disabled={!isFreeEvent && !isPaidEvent}
            className="w-[80%] rounded-full bg-seeds hover:bg-seeds/90 text-white border-collapse"
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateEventModal;
