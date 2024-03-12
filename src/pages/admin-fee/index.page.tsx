import SearchInput from "components/search-input";
import Select from "components/select";
import { useState } from "react";
import { Button, Tabs } from "react-daisyui";
import { FiDownload } from "react-icons/fi";
import PaymentSection from "./sections/payment.section";
import {
  categoryPaymentOptions,
  categoryWithdrawOptions,
  priorityOption,
  statusOption,
} from "data/admin-fee";
import { AdminFeeFilterI } from "_interfaces/admin-fee.interfaces";
import ContentContainer from "components/container";
import WithdrawalSection from "./sections/withdrawal.section";

export const afRouteName = "admin-fee";
const AdminFee = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [filter, setFilter] = useState<AdminFeeFilterI>({
    category: "",
    priority: "",
    status: "",
    search: "",
  });

  const [categoryOptions, setCategoryOptions] = useState(
    categoryPaymentOptions,
  );

  return (
    <ContentContainer>
      <div className="w-full flex flex-row justify-between items-end mb-5">
        <div className="w-full flex flex-row gap-8">
          <div className="min-w-40">
            <label
              htmlFor="merchant"
              className="font-semibold text-[#7C7C7C] mb-3"
            >
              Category Payment
            </label>
            <Select
              value={
                categoryOptions.find((item) => item.value === filter?.category)
                  ?.value
              }
              onChange={(e): void => {
                setFilter((prev) => ({ ...prev, category: e.value }));
              }}
              options={categoryOptions}
              rounded={true}
            />
          </div>
          <div className=" min-w-40">
            <label
              htmlFor="merchant"
              className="font-semibold text-[#7C7C7C] mb-3"
            >
              Priority
            </label>
            <Select
              value={
                priorityOption.find((item) => item.value === filter?.priority)
                  ?.value
              }
              onChange={(e): void => {
                setFilter((prev) => ({ ...prev, priority: e.value }));
              }}
              options={priorityOption}
              rounded={true}
            />
          </div>
          <div className=" min-w-40">
            <label
              htmlFor="merchant"
              className="font-semibold text-[#7C7C7C] mb-3"
            >
              Status
            </label>
            <Select
              value={
                statusOption.find((item) => item.value === filter?.status)
                  ?.value
              }
              onChange={(e): void => {
                setFilter((prev) => ({ ...prev, status: e.value }));
              }}
              options={statusOption}
              rounded={true}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-end gap-4">
          <Button className="bg-transparent rounded-full p-2 h-11 w-11 border border-[#3AC4A0]">
            <FiDownload className="text-xl font-normal text-[#3AC4A0] m-auto" />
          </Button>
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) =>
              setFilter((prev) => ({ ...prev, search: text }))
            }
          />
        </div>
      </div>
      <div className="flex">
        <Tabs>
          <Tabs.Tab
            active={1 === activeTab}
            onClick={() => {
              setActiveTab(1);
              setFilter({
                category: "",
                priority: "",
                status: "",
                search: "",
              });
              setCategoryOptions(categoryPaymentOptions);
            }}
            className={`${
              1 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            Payment
          </Tabs.Tab>
          <Tabs.Tab
            active={2 === activeTab}
            onClick={() => {
              setActiveTab(2);
              setFilter({
                category: "",
                priority: "",
                status: "",
                search: "",
              });
              setCategoryOptions(categoryWithdrawOptions);
            }}
            className={`${
              2 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            Withdrawal
          </Tabs.Tab>
        </Tabs>
      </div>
      <div className="mt-3">
        {activeTab === 1 ? (
          <PaymentSection filter={filter} />
        ) : (
          <WithdrawalSection filter={filter} />
        )}
      </div>
    </ContentContainer>
  );
};

export default AdminFee;
