import React, { MutableRefObject, RefObject } from "react";
import { Modal } from "react-daisyui";
import imageLogo from "assets/images/logo.png";
import { FiXCircle } from "react-icons/fi";
import QrScanner from "qr-scanner";

interface Props {
  open: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  divRef: RefObject<HTMLDivElement>;
  scanner: MutableRefObject<QrScanner | undefined>;
  setScanResult:React.Dispatch<React.SetStateAction<{result?:string, open:boolean}>>
}

const ScanModal = ({ open, videoRef, divRef, scanner, setScanResult }: Props) => {
  return (
    <Modal
      open={open}
      className="flex flex-col overflow-hidden items-center shadow-none gap-2"
    >
      <Modal.Body className="relative flex flex-col justify-center">
        <video ref={videoRef} className="w-96"></video>
        <div className="flex flex-col items-center justify-center gap-3 absolute !top-0 !left-1/2 !-translate-x-1/2 !translate-y-1/2 w-full">
          <img src={imageLogo} className="w-[80px]" />
          <div ref={divRef} className="!static !w-40 !h-40">
            <svg
              width="160"
              height="160"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 127C32 127.55 31.55 128 31 128L1 128C0.45 128 5.3662e-09 127.55 1.19249e-08 127L3.69671e-07 97C3.7623e-07 96.45 0.45 96 1 96C1.55 96 2 96.45 2 97L2 126L31 126C31.55 126 32 126.45 32 127Z"
                fill="#FEFEFE"
              />
              <path
                d="M127 96C127.55 96 128 96.45 128 97L128 127C128 127.55 127.55 128 127 128L97 128C96.45 128 96 127.55 96 127C96 126.45 96.45 126 97 126L126 126L126 97C126 96.45 126.45 96 127 96Z"
                fill="#FEFEFE"
              />
              <path
                d="M1 32C0.45 32 0 31.55 0 31V1C0 0.45 0.45 0 1 0H31C31.55 0 32 0.45 32 1C32 1.55 31.55 2 31 2H2V31C2 31.55 1.55 32 1 32Z"
                fill="#FEFEFE"
              />
              <path
                d="M96 0.999999C96 0.449999 96.45 -1.37909e-06 97 -1.35505e-06L127 -4.37114e-08C127.55 -1.96701e-08 128 0.45 128 1L128 31C128 31.55 127.55 32 127 32C126.45 32 126 31.55 126 31L126 2L97 2C96.45 2 96 1.55 96 0.999999Z"
                fill="#FEFEFE"
              />
            </svg>
          </div>

          <p className="font-normal text-base font-poppins text-white">
            Please Scan the QR Code
          </p>
        </div>
        <FiXCircle
          className="absolute top-2 right-2 bg-white/50 rounded-full cursor-pointer"
          size={24}
          onClick={async () => {
            setScanResult((prev)=>({...prev, open:!open}))
            await scanner?.current?.stop();
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ScanModal;
