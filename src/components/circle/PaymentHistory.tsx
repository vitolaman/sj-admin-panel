import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { Button } from "react-daisyui";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import ModalFilterPaymentHistory from "components/modal/circle/ModalFilterPaymentHistory";

export default function PaymentHistory(): React.ReactElement {
  const [openFilter, setOpenFilter] = useState(false);

  const handlePageChange = (page: number): void => {
    console.log("token report");
  };

  const handleOpenFilter = (): any => {
    setOpenFilter(!openFilter);
  };

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  const dummyPaymentHistory = [
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Success",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Success",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Success",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Pending",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Pending",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Pending",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Failed",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Failed",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Failed",
    },
    {
      transactionId: 32147896,
      user: "Emerson Press",
      circleName: "Circle Crypto",
      membership: "Lifetime",
      amount: "Rp 200.000",
      method: "Bank Transfer",
      name: "Emerson Press",
      accountNumber: "12012832",
      time: "22/05/2023 18:00",
      status: "Success",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl text-[#262626] font-semibold">
              Payment History
            </h3>
            <div className="flex items-center justify-between gap-4 ml-4">
              <Button className="bg-transparent rounded-full p-2 w-auto border border-[#3AC4A0]">
                <FiDownload className="text-xl font-normal text-[#3AC4A0]" />
              </Button>
              <Button className="bg-transparent rounded-full p-2 w-auto border border-[#3AC4A0]">
                <CiFilter
                  className="text-xl font-normal text-[#3AC4A0]"
                  onClick={handleOpenFilter}
                />
              </Button>

              <SearchInput placeholder="Search" onSubmit={({ text }) => {}} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-[#BDBDBD] rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-[#DCFCE4]">
                      <tr className="divide-x divide-[#BDBDBD]">
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          <div className="flex flex-row">
                            Transaction Id
                            <ArrowDownCircleIcon className="w-5 h-5 text-[#27A590] ml-2" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Circle Name
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Membership
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Method
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Name & <br />
                          Account Number
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-center whitespace-nowrap text-sm font-semibold text-[#27A590]"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {dummyPaymentHistory?.map((data, index) => (
                        <tr key={index} className="divide-x divide-[#BDBDBD]">
                          <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                            {index + 1}
                          </td>
                          <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                            {data.transactionId}
                          </td>
                          <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                            {data.user}
                            <p className="text-[#7C7C7C]">@emersonhehe</p>
                          </td>
                          <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                            {data.circleName} <br />
                          </td>
                          <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                            {data.membership}
                          </td>
                          <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                            {data.amount}
                          </td>
                          <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                            {data.method} <br />
                            <p className="text-[#7C7C7C] text-sm">BRI</p>
                          </td>
                          <td className="p-4 text-left whitespace-nowrap text-sm leading-7">
                            {data.name} <br />
                            <p className="text-[#7C7C7C] text-sm">
                              {data.accountNumber}
                            </p>
                          </td>
                          <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                            {data.time}
                          </td>
                          <td className="p-4 text-center whitespace-nowrap text-sm leading-7">
                            <span
                              className={classNames(
                                data.status === "Success"
                                  ? "bg-[#DCFCE4] text-[#27A590]"
                                  : data.status === "Pending"
                                  ? "bg-[#FFF7D2] text-[#D89918]"
                                  : "bg-[#FFEBEB] text-[#BB1616]",
                                "inline-flex items-center rounded px-2 py-1 text-sm"
                              )}
                            >
                              {data.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Pagination
              currentPage={1}
              totalPages={5}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <ModalFilterPaymentHistory
        openFilter={openFilter}
        handleOpenFilter={handleOpenFilter}
      />
    </div>
  );
}
