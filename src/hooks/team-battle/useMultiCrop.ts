import { TeamBattleReq } from "_interfaces/team-battle.interface";
import useCropper, { CropProps, Image } from "hooks/shared/useCropper";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SetFieldValue, UseFormWatch } from "react-hook-form";

interface Props {
  tmpNumber?: number;
  setValue: SetFieldValue<TeamBattleReq>;
  watch: UseFormWatch<TeamBattleReq>;
  setTmpImgArray: Dispatch<
    SetStateAction<{
      sponsor: { new: string; cropped: string }[];
      university: { new: string; cropped: string }[];
      community: { new: string; cropped: string }[];
    }>
  >;
  handleOpen: (key: "sponsor" | "university" | "community") => void;
}

interface ReturnProps {
  imagePreview: Image | undefined;
  propsCrop: CropProps;
}

const useMultiCrop = ({
  tmpNumber,
  setValue,
  watch,
  setTmpImgArray,
  handleOpen,
}: Props): [ReturnProps, ReturnProps, ReturnProps] => {
  const image = watch(`sponsors.${tmpNumber!}.logo`);
  const imageUniv = watch(`university.${tmpNumber!}.logo`);
  const imageCom = watch(`community.${tmpNumber!}.logo`);
  const [imageURLPreview, propsCrop] = useCropper({
    registerName: `sponsors.${tmpNumber}.logo`,
    setValue,
    handleOpen: () => {
      handleOpen("sponsor");
    },
    file: typeof image === "string" ? undefined : (image as FileList),
  });
  const [imageURLUniv, propsCropUniv] = useCropper({
    registerName: `university.${tmpNumber}.logo`,
    setValue,
    handleOpen: () => {
      handleOpen("university");
    },
    file: typeof imageUniv === "string" ? undefined : (imageUniv as FileList),
  });
  const [imageURLCom, propsCropCom] = useCropper({
    registerName: `community.${tmpNumber}.logo`,
    setValue,
    handleOpen: () => {
      handleOpen("community");
    },
    file: typeof imageCom === "string" ? undefined : (imageCom as FileList),
  });
  useEffect(() => {
    if (imageURLPreview) {
      setTmpImgArray((prev) => {
        const newArray = { ...prev };
        newArray.sponsor[tmpNumber!] = {
          new: imageURLPreview?.new!,
          cropped: imageURLPreview?.cropped!,
        };
        return newArray;
      });
    }
  }, [imageURLPreview]);
  useEffect(() => {
    if (imageURLUniv) {
      setTmpImgArray((prev) => {
        const newArray = { ...prev };
        newArray.university[tmpNumber!] = {
          new: imageURLUniv?.new!,
          cropped: imageURLUniv?.cropped!,
        };
        return newArray;
      });
    }
  }, [imageURLUniv]);
  useEffect(() => {
    if (imageURLCom) {
      setTmpImgArray((prev) => {
        const newArray = { ...prev };
        newArray.community[tmpNumber!] = {
          new: imageURLCom?.new!,
          cropped: imageURLCom?.cropped!,
        };
        return newArray;
      });
    }
  }, [imageURLCom]);
  return [
    {
      imagePreview: imageURLPreview,
      propsCrop: propsCrop,
    },
    {
      imagePreview: imageURLUniv,
      propsCrop: propsCropUniv,
    },
    {
      imagePreview: imageURLCom,
      propsCrop: propsCropCom,
    },
  ];
};

export default useMultiCrop;
