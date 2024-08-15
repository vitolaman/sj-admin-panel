import { useEffect, useState } from "react";
import { Point, Area } from "react-easy-crop";
import { FieldValues, SetFieldValue } from "react-hook-form";
import { errorHandler } from "services/errorHandler";

export interface Image {
  new?: string;
  cropped?: string;
  name?: string;
  size?: number;
}

export interface CropProps {
  crop: Point;
  zoom: number;
  croppedAreaPixels: Area | undefined;
  onCropChange: (crop: Point) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onCrop: () => Promise<void>;
}

type UseCropper = [Image | undefined, CropProps];

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0
): Promise<Blob> => {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        if (file) {
          resolve(file);
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, "image/*");
    });
  } catch (error) {
    errorHandler(error);
    throw new Error("Error cropping image");
  }
};

const useCropper = <T extends FieldValues>(
  registerName: string,
  setValue: SetFieldValue<T>,
  file?: FileList
): UseCropper => {
  const [imgSrc, setImgSrc] = useState<Image>();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };
  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedBlob = await getCroppedImg(
      imgSrc?.new as string,
      croppedAreaPixels as Area
    );
    setValue(registerName, [
      new File([croppedBlob], imgSrc?.name!, {
        type: `image/${imgSrc?.name?.split(".")[1]}`,
      }),
    ]);
    setImgSrc((prev) => ({
      ...prev,
      cropped: URL.createObjectURL(croppedBlob),
      size: croppedBlob.size,
    }));
  };

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);
      if (newUrl !== imgSrc?.new && file[0].size !== imgSrc?.size) {
        setImgSrc({ new: newUrl, name: file[0].name });
      }
    }
  }, [file]);

  return [
    imgSrc,
    {
      crop,
      zoom,
      croppedAreaPixels,
      onCropChange,
      onZoomChange,
      onCropComplete,
      onCrop,
    },
  ];
};

export default useCropper;
