import { Button, Modal } from "react-daisyui";
import Cropper, { Area, Point } from "react-easy-crop";

interface Props {
  image: string;
  zoom: number;
  crop: Point;
  aspect: number;
  open: boolean;
  handleOpen:()=>void
  onCropChange: (location: Point) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onCrop: () => Promise<void>;
}

const CropperComponent = ({
  image,
  zoom,
  crop,
  aspect,
  open,
  handleOpen,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onCrop,
}: Props) => {
  return (
    <Modal open={open} className="h-screen w-screen bg-white p-4 md:p-8">
      <Modal.Header className="flex justify-between">
        <p className="font-semibold font-poppins text-xl text-black w-fit z-10">
          Crop Your Photo
        </p>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
          showGrid={false}
          style={{
            containerStyle: { top: "50%", transform: "translateY(-50%)" },
          }}
          classes={{ containerClassName: "h-3/6" }}
        />
        <div className="flex gap-4 absolute md:bottom-8 bottom-4 md:right-8 right-4">
          <Button
            className="border-none bg-[#3AC4A0] rounded-full text-white w-[128px] hover:bg-[#3AC4A0]"
            onClick={() => {
              onCrop();
              handleOpen()
            }}
          >
            Crop
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CropperComponent;
