import { GetSummaryReportByDateParams } from "_interfaces/company.interfaces";
import BarLineChart from "components/b2b-company/BarLineChart";
import PeriodeTime from "components/b2b-company/PeriodTime";
import PieChartComponent from "components/b2b-company/PieChart";
import SummaryCard from "components/b2b-company/SummaryCard";
import CInput from "components/input";
import { Loader } from "components/spinner/loader";
import moment from "moment";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useGetCompanyByIdQuery,
  useGetIncomeReportQuery,
  useGetParticipantReportQuery,
  useGetSummaryReportQuery,
  useLazyGetSummaryReportByDateQuery,
} from "services/modules/company";

const SummaryReport = ({ id }: { id: string }) => {
  const [datePeriodLabel, setDatePeriodLabel] = useState<string>("Date");
  const [incomePeriod, setIncomePeriod] = useState<string>("MONTHLY");
  const [participantPeriod, setParticipantPeriod] = useState<string>("MONTHLY");

  const { data: CompanyDetail } = useGetCompanyByIdQuery(id);

  const summaryByDateParams: GetSummaryReportByDateParams = {
    id: id,
    start_date: moment(CompanyDetail?.created_at).format("YYYY-MM-DD"),
    end_date: "",
  };

  const { data: SummaryData, isLoading: SummaryLoading } =
    useGetSummaryReportQuery(id);

  const [getSummaryReportByDate, summaryReportByDate] =
    useLazyGetSummaryReportByDateQuery();

  const { data: IncomeData, isLoading: IncomeLoading } =
    useGetIncomeReportQuery({ id: id, frame: incomePeriod });

  const { data: ParticipantData, isLoading: ParticipantLoading } =
    useGetParticipantReportQuery({ id: id, frame: participantPeriod });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endDate = moment(event?.target.value).format("YYYY-MM-DD");
    setDatePeriodLabel(endDate);
    getSummaryReportByDate({
      ...summaryByDateParams,
      end_date: endDate,
    })
      .unwrap()
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const handleIncomePeriodChange = (period: string) => {
    setIncomePeriod(period);
  };

  const handleParticipantPeriodChange = (period: string) => {
    setParticipantPeriod(period);
  };

  const percent = SummaryData?.transactions_detail;

  return (
    <>
      <div className="flex justify-between mb-10 items-center">
        <div className="font-semibold text-2xl">Company Detail Page</div>
        <label
          className="border rounded-xl relative w-48 bg-[#3AC4A0] text-white"
          htmlFor="published_at"
        >
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center justify-center pe-5 font-semibold">
              <MdDateRange size={25} className="mr-2" />
              <div>{datePeriodLabel}</div>
            </div>
            <div>
              <FaChevronDown />
            </div>
          </div>
          <div className="opacity-0 absolute top-0 right-0 w-48">
            <CInput
              type="date"
              className="absolute top-0 right-0 w-48 cursor-pointer"
              value={summaryByDateParams?.end_date}
              onChange={handleDateChange}
              onClick={(e) => e.currentTarget.showPicker()}
            />
          </div>
        </label>
      </div>
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#58A399]"
            title="Summary Income"
            amount={SummaryData?.income}
            percentage={23}
            currency={true}
          />
          <SummaryCard
            bgcolor="bg-[#58A399]"
            title="Summary Income By Date"
            amount={summaryReportByDate?.data?.income}
            percentage={-3}
            currency={true}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#3AC4A0]"
            title="Total Transaction"
            amount={SummaryData?.transaction}
            percentage={23}
          />
          <SummaryCard
            bgcolor="bg-[#3AC4A0]"
            title="Total Transaction By Date"
            amount={summaryReportByDate?.data?.transaction}
            percentage={-3}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#106B6E]"
            title="Total Participant"
            amount={SummaryData?.participant}
            percentage={23}
          />
          <SummaryCard
            bgcolor="bg-[#106B6E]"
            title="Total Participant By Date"
            amount={summaryReportByDate?.data?.participant}
            percentage={23}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#1A857D]"
            title="Total Quiz"
            amount={SummaryData?.quiz}
            percentage={23}
          />
          <SummaryCard
            bgcolor="bg-[#1A857D]"
            title="Total Quiz By Date"
            amount={summaryReportByDate?.data?.quiz}
            percentage={23}
          />
        </div>
        {IncomeLoading ? (
          <Loader />
        ) : (
          <div className="col-span-2 row-span-2">
            <div className="bg-[#EDF0F3] p-3 rounded-xl">
              <div className="flex justify-between items-center px-4">
                <div className="font-semibold text-2xl">Summary Income</div>
                <PeriodeTime onPeriodChange={handleIncomePeriodChange} />
              </div>
              <div className="h-[255px] 2xl:h-[500px] w-full">
                <BarLineChart
                  data={IncomeData?.data || {}}
                  amountFormat={true}
                />
              </div>
            </div>
          </div>
        )}
        <div className="col-span-2 flex flex-col gap-4">
          {SummaryLoading ? (
            <Loader />
          ) : (
            <div className="bg-[#EDF0F3] p-3 rounded-xl">
              <div className="grid grid-cols-2">
                <div className="col-span-2 font-semibold text-2xl">
                  Transaction Status
                </div>
                <div className="col-span-1">
                  <PieChartComponent
                    success={SummaryData?.transactions_detail?.success ?? 0}
                    pending={SummaryData?.transactions_detail?.pending ?? 0}
                    failed={SummaryData?.transactions_detail?.failed ?? 0}
                  />
                </div>
                <div className="col-span-1 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-[#3ac4a0] w-fit"></div>
                    <div className="flex flex-row items-center justify-between w-40">
                      <div>Success</div>
                      <div>
                        {percent &&
                          (percent?.success /
                            (percent?.success +
                              percent?.failed +
                              percent?.pending)) *
                            100}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-[#dd2525] w-fit"></div>
                    <div className="flex flex-row items-center justify-between w-40">
                      <div>Failed</div>
                      <div>
                        {percent &&
                          (percent?.failed /
                            (percent?.failed +
                              percent?.success +
                              percent?.pending)) *
                            100}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-[#fdba22] w-fit"></div>
                    <div className="flex flex-row items-center justify-between w-40">
                      <div>Pending</div>
                      <div>
                        {percent &&
                          (percent?.pending /
                            (percent?.pending +
                              percent?.failed +
                              percent?.success)) *
                            100}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {ParticipantLoading ? (
            <Loader />
          ) : (
            <div className="bg-[#EDF0F3] p-3 rounded-xl">
              <div className="flex justify-between items-center px-2">
                <div className="font-semibold text-2xl">Participants</div>
                <PeriodeTime onPeriodChange={handleParticipantPeriodChange} />
              </div>
              <div className="h-[255px] w-full">
                <BarLineChart data={ParticipantData?.data || {}} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SummaryReport;
