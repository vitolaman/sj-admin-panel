// import { Select } from "@/components";
import { Select } from "components/forms/Select";
import React, { Fragment } from "react";
import { Button, Modal } from "react-daisyui";
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
      <Modal backdrop={false} open={modalStatus} className="bg-white">
        <Modal.Header className="flex flex-row justify-between">
          Change Status
          <IoClose onClick={handleModalStatus} />{" "}
        </Modal.Header>

        <Modal.Body>
          <div className="grid gap-6">
            <p className="text-black text-base font-semibold -mb-3">Status</p>
            <Select name="type" placeholder="Choose Type" options={options} />
          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button
            onClick={handleModalStatus}
            className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
          >
            Clear
          </Button>
          <Button
            onClick={handleModalStatus}
            className="rounded-full border bg-[#3AC4A0] text-white font-semibold hover:bg-[#3AC4A0]/90"
          >
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
