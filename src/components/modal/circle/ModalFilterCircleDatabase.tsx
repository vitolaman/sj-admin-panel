import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { type Option, Select } from "components/forms/Select";
import { Date } from "components/forms/dateTime";
import moment from "moment";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";
export default function ModalFilterCircleDatabase({
  openFilter,
  handleOpenFilter,
  changeFilter,
  search,
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

  const getLabelType = (type: string): string => {
    const data = typeFilter.find((o) => o.value === type);
    return data !== undefined ? data.label : "Choose Type";
  };

  return (
    <Fragment>
      {filter && filter.created_at_from !== undefined && (
        <Dialog
          placeholder={""}
          open={openFilter}
          handler={handleOpenFilter}
          className="w-[70rem]"
        >
          <DialogHeader
            placeholder={""}
            className="flex flex-row justify-between"
          >
            Filter
            <IoClose onClick={handleOpenFilter} />{" "}
          </DialogHeader>

          <DialogBody
            placeholder={""}
            divider
            className="h-[25rem] overflow-scroll"
          >
            <div className="grid gap-6">
              <Typography className="text-black text-base font-semibold -mb-3">
                Type
              </Typography>
              <Select
                name="type"
                placeholder="Choose Type"
                options={options}
                value={{
                  key: 1,
                  label: getLabelType(filter.type),
                  data: "test",
                }}
                onChange={(e) => changeFilterType(e)}
              />

              <div className="">
                <Typography className="mb-2 text-black text-base font-semibold">
                  Created At
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <Typography className="mb-2 text-black text-base font-semibold">
                    Start
                  </Typography>
                  <Typography className="mb-2 text-black text-base font-semibold">
                    End
                  </Typography>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Date
                    name="created_at_from"
                    timeFormat="HH:mm:ss"
                    dateFormat="YYYY-MM-DD"
                    onChange={(date) =>
                      changeDateFrom(moment(date).format("YYYY-MM-DD HH:mm:ss"))
                    }
                    placeholder="Choose Start"
                    value={filter.created_at_from}
                  />
                  <Date
                    name="created_at_to"
                    timeFormat="HH:mm:ss"
                    dateFormat="YYYY-MM-DD"
                    onChange={(date) =>
                      changeDateTo(moment(date).format("YYYY-MM-DD HH:mm:ss"))
                    }
                    placeholder="Choose End"
                    value={filter.created_at_to}
                  />
                </div>
              </div>

              <div className="">
                <Typography className="text-black text-base font-semibold">
                  Members
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    crossOrigin={""}
                    placeholder="From"
                    variant="static"
                    type="number"
                    name="total_member_from"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_member_from}
                  />

                  <Input
                    crossOrigin={""}
                    placeholder="To"
                    variant="static"
                    type="number"
                    name="total_member_to"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_member_to}
                  />
                </div>
              </div>

              <div className="">
                <Typography className="text-black text-base font-semibold">
                  Post
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    crossOrigin={""}
                    placeholder="From"
                    variant="static"
                    type="number"
                    name="total_post_from"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_post_from}
                  />

                  <Input
                    crossOrigin={""}
                    placeholder="To"
                    variant="static"
                    type="number"
                    name="total_post_to"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_post_to}
                  />
                </div>
              </div>

              <div className="">
                <Typography className="text-black text-base font-semibold">
                  Like
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    crossOrigin={""}
                    placeholder="From"
                    variant="static"
                    type="number"
                    name="total_like_from"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_like_from}
                  />

                  <Input
                    crossOrigin={""}
                    placeholder="To"
                    variant="static"
                    type="number"
                    name="total_like_to"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_like_to}
                  />
                </div>
              </div>

              <div className="">
                <Typography className="text-black text-base font-semibold">
                  Share
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    crossOrigin={""}
                    placeholder="From"
                    variant="static"
                    type="number"
                    name="total_share_from"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_share_from}
                  />

                  <Input
                    crossOrigin={""}
                    placeholder="To"
                    variant="static"
                    type="number"
                    name="total_share_to"
                    onChange={(e) => changeFilter(e)}
                    value={filter.total_share_to}
                  />
                </div>
              </div>

              <div>
                <section className="flex flex-col">
                  <Typography className="text-black text-base font-semibold mb-3">
                    Status
                  </Typography>
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
          </DialogBody>

          <DialogFooter placeholder={""}>
            <Button
              placeholder={""}
              onClick={clearFilter}
              className="mr-4 rounded-full border border-[#3AC4A0] bg-transparent text-[#3AC4A0] font-semibold"
            >
              Clear
            </Button>
            <Button
              placeholder={""}
              onClick={search}
              className="rounded-full border bg-[#3AC4A0] text-white font-semibold"
            >
              Submit
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </Fragment>
  );
}
