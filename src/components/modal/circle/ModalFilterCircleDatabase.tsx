import { type Option } from "components/forms/Select";
import CInput from "components/input";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { IoClose } from "react-icons/io5";
import ReactSelect from "react-select";
export default function ModalFilterCircleDatabase({
  openFilter,
  handleOpenFilter,
  changeFilter,
  filter,
  changeFilterType,
  changeDateFrom,
  changeDateTo,
  clearFilter,
}: any): React.ReactElement {
  const typeFilter = [
    {
      label: "Free",
      value: "free",
    },
    {
      label: "Premium Lifetime",
      value: "lifetime",
    },
    {
      label: "Premium Subscription",
      value: "subscription",
    },
  ];

  const options: Option[] = [
    ...Object.values(typeFilter).map((category, idx) => {
      return {
        key: idx + 1,
        label: category.label,
        data: category.value,
      };
    }),
  ];

  const [search, setSearch] = useState<string>("");

  return (
    <Fragment>
      {filter && filter.created_at_from !== undefined && (
        <Modal backdrop={false} open={openFilter} className="bg-white">
          <Modal.Header className="flex flex-row justify-between">
            Filter
            <IoClose onClick={handleOpenFilter} />{" "}
          </Modal.Header>

          <Modal.Body className="h-[25rem] overflow-scroll">
            <div className="grid gap-6">
              <p className="text-black text-base font-semibold -mb-3">Type</p>
              <ReactSelect
                styles={{
                  control: (baseStyle) => ({
                    ...baseStyle,
                    padding: 2,
                    margin: 2,
                    borderColor: "#BDBDBD",
                    borderRadius: "0.5rem",
                  }),
                }}
                options={options}
                isSearchable={true}
                onInputChange={(e) => {
                  setSearch(e);
                }}
                value={options.find((item) => item.data === filter.type)}
                onChange={(e) => changeFilterType(e)}
              />
              <div className="">
                <p className="mb-2 text-black text-base font-semibold">
                  Created At
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <p className="mb-2 text-black text-base font-semibold">
                    Start
                  </p>
                  <p className="mb-2 text-black text-base font-semibold">End</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="datetime-local"
                    onChange={(e) => {
                      changeDateFrom(
                        moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                      );
                    }}
                    value={moment(filter.created_at_from)
                      .utc(true)
                      .format("YYYY-MM-DD HH:mm")}
                  />
                  <CInput
                    type="datetime-local"
                    onChange={(e) => {
                      changeDateTo(
                        moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                      );
                    }}
                    value={moment(filter.created_at_to)
                      .utc(true)
                      .format("YYYY-MM-DD HH:mm")}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">
                  Members
                </p>
                <div className="grid grid-cols-2 gap-4 m-1">
                  <CInput
                    type="number"
                    name="total_member_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_member_from}
                  />
                  <CInput
                    type="number"
                    name="total_member_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_member_to}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">Post</p>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="number"
                    name="total_post_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_post_from}
                  />
                  <CInput
                    type="number"
                    name="total_post_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_post_to}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">Like</p>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="number"
                    name="total_like_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_like_from}
                  />
                  <CInput
                    type="number"
                    name="total_like_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_like_to}
                  />
                </div>
              </div>

              <div className="">
                <p className="text-black text-base font-semibold mb-2">Share</p>
                <div className="grid grid-cols-2 gap-4 mx-1">
                  <CInput
                    type="number"
                    name="total_share_from"
                    placeholder="From"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_share_from}
                  />
                  <CInput
                    type="number"
                    name="total_share_to"
                    placeholder="To"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_share_to}
                  />
                </div>
              </div>

              <div>
                <section className="flex flex-col">
                  <p className="text-black text-base font-semibold mb-3">
                    Status
                  </p>
                  <section className="flex flex-row gap-3">
                    <section className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg">
                      <input
                        type="checkbox"
                        name="status"
                        id="active"
                        value={filter.status}
                        onChange={(e) => changeFilter(e)}
                      />
                      <p className="text-[#262626] text-base font-normal">
                        Active
                      </p>
                    </section>

                    <section className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg">
                      <input type="checkbox" name="status" id="" />
                      <p className="text-[#262626] text-base font-normal">
                        Idle
                      </p>
                    </section>

                    <section className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg">
                      <input type="checkbox" name="status" id="inactive" />
                      <p className="text-[#262626] text-base font-normal">
                        Inactive
                      </p>
                    </section>
                  </section>
                </section>
              </div>
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Button
              onClick={clearFilter}
              className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
            >
              Clear
            </Button>
            <Button
              onClick={handleOpenFilter}
              className="rounded-full border bg-[#3AC4A0] text-white font-semibold hover:bg-[#3AC4A0]/90"
            >
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Fragment>
  );
}
