import { Label } from "@headlessui/react/dist/components/label/label";
import { MenuItem } from "@material-tailwind/react";
import {
  ReferralCodeI,
  GetReferralCodeQuery,
  ReferralCodeFormDataI
} from "_interfaces/referral-code.interface";
import ContentContainer from "components/container";
import CInput from "components/input";
import FormInput from "components/input/formInput";
import SearchInput from "components/search-input";
import Pagination from "components/table/pagination";
import { Columns, Table } from "components/table/table";
import { error } from "console";
import { levelExpOptions } from "data/promo-code";
import { useFilterRef } from "hooks/promo-code/useFilterState";
import { register } from "mixpanel-browser";
import React, { useCallback, useRef, useState } from "react";
import { Button, Form, Input, Menu, Modal } from "react-daisyui";
import { Summary } from "react-daisyui/dist/Dropdown/DropdownToggle";
import { useCreateReferralCodeMutation, useGetReferralCodesQuery } from "services/modules/referral-code";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import useCreateReferralCode from "hooks/referral-code/useCreateReferralCode";
export const reffCodeRouteName = "list";


const ReferralCode = () => {

  const ref = useRef<HTMLDialogElement>(null);
  const handleOpen = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  const [addReffBtn, setaddReffBtn] = useState<boolean>(false);
  const { handleSubmit ,handleCreate, control,formState,loadingCreate,register,reset,setValue,watch} = useCreateReferralCode();

  const [params, setParams] = useState<GetReferralCodeQuery>({
    search: "",
    minDate: "",
    maxDate: "",
    limit: 10,
    page: 1,
  });
  const { data, isLoading, refetch } = useGetReferralCodesQuery(params);
  const handlePageChange = (page: number): void => {
    setParams((prev) => ({ ...prev, page }));
  };

  const header: Columns<ReferralCodeI>[] = [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "ref_code",
      label: "Referral Code",
    },
    {
      fieldId: "",
      label: "Name & Seeds Tag",
      render: (item) => (
        <div className="flex flex-col items-start justify-start">
          <p className="text-sm font-normal font-poppins text-[#201B1C]">
            {item?.name}
          </p>
          <p className="font-normal font-poppins text-[#7C7C7C] text-sm ">
            {item?.seeds_tag}
          </p>
        </div>
      ),
    },
    {
      fieldId: "users",
      label: "Total Used",
    },
    {
      fieldId: "",
      label: "Action",
      render: (item) => (
        <Button
          size="xs"
          className="border-none rounded-full font-semibold text-base font-poppins bg-[#3AC4A0] py-1 px-3 h-fit  text-white hover:bg-[#3AC4A0] "
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <ContentContainer>
      <div className="flex flex-col gap-6 ">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <h1 className="self-start lg:self-center font-semibold md:text-2xl text-lg font-poppins">
            Referral Code List
          </h1>
          <div className="flex flex-col md:flex-row gap-3">
            <SearchInput
              placeholder="Search"
              disabled={true}
              formClassName="bg-[#F5F5F5]"
              onSubmit={({ text }) => {
                setParams((prev) => ({ ...prev, search: text }));
              }}
            />
            <Button
              onClick={() => {
                handleOpen();
                setaddReffBtn(!addReffBtn);
              }}
              type="button"
              className={`bg-[#3AC4A0] border-none hover:bg-[#3AC4A0] hover:border-white text-white rounded-[75px] font-poppins text-base`}
            >
              {" "}
              <span className="font-light text-[20px]">+</span> add Referral
            </Button>
            <Modal ref={ref} className="bg-white p-0">
              <Form method="dialog" className="bg-white py-1 px-2">
                <div className="lg:flex lg:justify-between lg:items-center py-3 px-2 border-b-2">
                  <label className={"text-xl font-poppins font-bold capitalize"}>add referral code</label>
                  <Button size="md" shape="circle" color="ghost" className="font-extralight text-[24px]">X</Button>
                </div>
                <Modal.Body className="min-w-full lg:h-auto">
                  <div className="lg:flex lg:flex-col py-3 px-2">
                    <FormInput<ReferralCodeFormDataI>
                     label="Name"
                     registerName="name" 
                     type="text"
                     placeholder="Input Name"
                     className="border-none w-96 py-3 px-2"
                     />
                  </div>
                  <div className="lg:flex lg:flex-col py-3 px-2">
                    <FormInput<ReferralCodeFormDataI>
                     label="SeedsTag"
                     type="text"
                     registerName="seeds_tag"
                     placeholder="Input seedstag"
                     className=""  
                     />
                  </div>
                  <div className="lg:flex lg:flex-col py-3 px-2">
                    <FormInput<ReferralCodeFormDataI>
                     label="Referral Code"
                     type="text"
                     registerName="ref_code"
                     placeholder="Input Referral Code" 
                     className=""/>
                  </div>
                </Modal.Body>
                <Modal.Actions className="py-3 border-t-2 border-b-blue-gray-400">
                  <div className="lg:flex lg:justify-end px-2">
                    <Button className="border-none rounded-[75px] w-24 hover:bg-[#3AC4A0] hover: bg-[#3AC4A0] py-1 px-2">
                      <p className="text-white text-base font-bold">Create</p>
                    </Button>
                  </div>
                </Modal.Actions>
              </Form>
            </Modal>
          
          </div>
        </div>
        <div className="max-w-full overflow-x-auto overflow-y-hidden border border-[#BDBDBD] rounded-lg">
          <Table<ReferralCodeI>
            columns={header}
            loading={isLoading}
            data={data?.data}
            currentPage={params.page}
            limit={params.limit}
          />
        </div>
        <div className="flex flex-col">
          <Pagination
            currentPage={data?.metadata.currentPage ?? 1}
            totalPages={data?.metadata?.totalPage ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default ReferralCode;
