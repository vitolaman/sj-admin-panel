import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import type { CircleOwner } from "_interfaces/circle.interface";
import { Select } from "components/forms/Select";
import { Date } from "components/forms/dateTime";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useOwnerCircleListQuery } from "services/modules/circle";

export default function ModalFilterTokenReport({
  openFilter,
  handleOpenFilter,
  filter,
  changeDateFrom,
  changeDateTo,
  search,
  clearFilter,
  changeFilterTicket,
  changeFilterCircleOwner,
  changeFilterStatus,
}: any): React.ReactElement {
  const [optionsOwner, setOptionsOwner] = useState<any[]>([]);
  const { data, isLoading } = useOwnerCircleListQuery({ page: 1, limit: 200 });
  const typeTicket = [
    {
      label: "Fraud",
      value: "fraud",
    },
    {
      label: "Scam",
      value: "scam",
    },
    {
      label: "Innapropriate",
      value: "innapropriate",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const typeStatus = [
    {
      label: "To-Do",
      value: "to-do",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Solve",
      value: "solve",
    },
  ];

  const optionsTicket = [
    ...Object.values(typeTicket).map((type, idx) => {
      return {
        key: idx + 1,
        label: type.label,
        value: type.value,
        data: "test",
      };
    }),
  ];

  const handleOptionOwner = (ownerData: CircleOwner[]): void => {
    const newOwner: any[] = ownerData?.map((data, idx) => {
      return {
        key: idx + 1,
        label: data.name,
        value: data.id,
      };
    });

    setOptionsOwner(newOwner);
  };

  const getLabelTypeTicket = (type: string): string => {
    const data = typeTicket.find((o) => o.value === type);
    return data !== undefined ? data.label : "Choose Type";
  };

  const getLabelTypeOwner = (id: string): string => {
    const data = optionsOwner?.find((o) => o.value === id);
    return data !== undefined ? data.label : "Choose Circle Owner";
  };

  useEffect(() => {
    handleOptionOwner(data?.data as CircleOwner[]);
  }, []);

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
              <div>
                <Typography className="text-black text-base font-semibold mb-3">
                  Ticket
                </Typography>
                <Select
                  name="ticket"
                  placeholder="Choose Ticket"
                  value={{
                    key: 1,
                    label: getLabelTypeTicket(filter.ticket),
                    data: "test",
                  }}
                  options={optionsTicket}
                  onChange={(e) => changeFilterTicket(e)}
                />
              </div>

              <div className="">
                <Typography className="mb-2 text-black text-base font-semibold">
                  Reported At
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

              <div>
                <Typography className="text-black text-base font-semibold mb-3">
                  Circle Owner
                </Typography>
                <Select
                  name="circle_owner_id"
                  placeholder="Choose Circle Owner"
                  value={{
                    key: 1,
                    label: getLabelTypeOwner(filter.circle_owner_id),
                    data: "test",
                  }}
                  options={optionsOwner}
                  onChange={(e) => changeFilterCircleOwner(e)}
                />
              </div>
              <div>
                <section className="flex flex-col">
                  <Typography className="text-black text-base font-semibold mb-3">
                    Status
                  </Typography>

                  <section className="flex flex-row gap-3">
                    {typeStatus.map((data, key) => (
                      <section
                        key={key}
                        className="flex flex-row gap-3 border border-[#BDBDBD] px-[16px] py-[8px] rounded-lg"
                      >
                        <input
                          type="checkbox"
                          name={data.label}
                          value={data.value}
                          onChange={changeFilterStatus}
                        />

                        <p className="text-[#262626] text-base font-normal">
                          {data.label}
                        </p>
                      </section>
                    ))}
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
