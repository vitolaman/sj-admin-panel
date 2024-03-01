// import { Select } from "@/components";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { Select } from "components/forms/Select";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalChangeStatusTokenReport({
  modalStatus,
  handleModalStatus,
}: any): React.ReactElement {
  const typeFilter = ["Pending", "Solved", "To-Do"];

  const options = [
    {
      key: 0,
      label: "Choose Type",
      data: "test",
    },
    ...Object.values(typeFilter).map((category, idx) => {
      return {
        key: idx + 1,
        label: category,
        data: "test",
      };
    }),
  ];

  return (
    <Fragment>
      <Dialog
        placeholder={""}
        open={modalStatus}
        handler={handleModalStatus}
        className="w-[70rem]"
      >
        <DialogHeader
          placeholder={""}
          className="flex flex-row justify-between"
        >
          Change Status
          <IoClose onClick={handleModalStatus} />{" "}
        </DialogHeader>

        <DialogBody placeholder={""} divider>
          <div className="grid gap-6">
            <Typography className="text-black text-base font-semibold -mb-3">
              Status
            </Typography>
            <Select name="type" placeholder="Choose Type" options={options} />
          </div>
        </DialogBody>

        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            onClick={handleModalStatus}
            className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
          >
            Clear
          </Button>
          <Button
            placeholder={""}
            onClick={handleModalStatus}
            className="rounded-full border bg-[#3AC4A0] text-white font-semibold"
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
