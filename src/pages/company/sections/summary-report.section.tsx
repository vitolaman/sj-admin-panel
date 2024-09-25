import BarLineChart from "../components/barline-chart.component";
import PeriodeTime from "../components/period-time.component";
import PieChartComponent from "../components/pie-chart.component";
import SummaryCard from "../components/summary-card.component";
import CInput from "components/input";
import { Loader } from "components/spinner/loader";
import moment from "moment";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useGetIncomeReportQuery,
  useGetParticipantReportQuery,
  useGetSummaryReportQuery,
  useLazyGetSummaryReportByDateQuery,
} from "services/modules/company";

const SummaryReport = ({ id }: { id: string }) => {
  const [dateLabels, setDateLabels] = useState({
    fromDateLabel: "Start Date",
    endDateLabel: "End Date",
  });
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [periods, setPeriods] = useState({
    incomePeriod: "MONTHLY",
    participantPeriod: "MONTHLY",
  });

  const { data: SummaryData, isLoading: SummaryLoading } =
    useGetSummaryReportQuery(id);

  const [getSummaryReportByDate, summaryReportByDate] =
    useLazyGetSummaryReportByDateQuery();

  const { data: IncomeData, isLoading: IncomeLoading } =
    useGetIncomeReportQuery({ id: id, frame: periods.incomePeriod });

  const { data: ParticipantData, isLoading: ParticipantLoading } =
    useGetParticipantReportQuery({ id: id, frame: periods.participantPeriod });

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    const newDate = moment(event?.target.value).format(
      "YYYY-MM-DDTHH:mm:ss[Z]"
    );
    const newLabel = moment(event?.target.value).format("YYYY-MM-DD");

    if (type === "start") {
      if (dates.endDate && moment(newDate).isAfter(dates.endDate)) {
        toast.error("Start date cannot be later than end date");
        return;
      }
      setDateLabels({ ...dateLabels, fromDateLabel: newLabel });
      setDates({ ...dates, startDate: newDate });
    } else {
      if (dates.startDate && moment(newDate).isBefore(dates.startDate)) {
        toast.error("End date cannot be earlier than start date");
        return;
      }
      setDateLabels({ ...dateLabels, endDateLabel: newLabel });
      setDates({ ...dates, endDate: newDate });
    }

    const isStartDateValid = type === "start" && newDate && dates.endDate;
    const isEndDateValid = type === "end" && dates.startDate && newDate;

    if (isStartDateValid || isEndDateValid) {
      getSummaryReportByDate({
        id: id,
        start_date: type === "start" ? newDate : dates.startDate,
        end_date: type === "end" ? newDate : dates.endDate,
      })
        .unwrap()
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    }
  };

  const handlePeriodChange = (
    periodType: "income" | "participant",
    period: string
  ) => {
    setPeriods({ ...periods, [`${periodType}Period`]: period });
  };

  const percent = SummaryData?.transactions_detail;

  return (
    <>
      <div className="flex justify-between mb-10 items-center">
        <div className="font-semibold text-2xl">Company Detail Page</div>
        <div className="flex items-center gap-4">
          <label
            className="border rounded-xl relative w-48 bg-[#3AC4A0] text-white"
            htmlFor="started_at"
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center justify-center pe-5 font-semibold">
                <MdDateRange size={25} className="mr-2" />
                <div>{dateLabels.fromDateLabel}</div>
              </div>
              <div>
                <FaChevronDown />
              </div>
            </div>
            <div className="opacity-0 absolute top-0 right-0 w-48">
              <CInput
                type="date"
                className="absolute top-0 right-0 w-48 cursor-pointer"
                value={dates?.startDate}
                onChange={(e) => handleDateChange(e, "start")}
                onClick={(e) => e.currentTarget.showPicker()}
              />
            </div>
          </label>
          <label
            className="border rounded-xl relative w-48 bg-[#3AC4A0] text-white"
            htmlFor="ended_at"
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center justify-center pe-5 font-semibold">
                <MdDateRange size={25} className="mr-2" />
                <div>{dateLabels.endDateLabel}</div>
              </div>
              <div>
                <FaChevronDown />
              </div>
            </div>
            <div className="opacity-0 absolute top-0 right-0 w-48">
              <CInput
                type="date"
                className="absolute top-0 right-0 w-48 cursor-pointer"
                value={dates?.endDate}
                onChange={(e) => handleDateChange(e, "end")}
                onClick={(e) => e.currentTarget.showPicker()}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#58A399]"
            title="Summary Income"
            amount={SummaryData?.income}
            currency={true}
          />
          <SummaryCard
            bgcolor="bg-[#58A399]"
            title="Summary Income By Date"
            amount={summaryReportByDate?.data?.income}
            currency={true}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#3AC4A0]"
            title="Total Transaction"
            amount={SummaryData?.transaction}
          />
          <SummaryCard
            bgcolor="bg-[#3AC4A0]"
            title="Total Transaction By Date"
            amount={summaryReportByDate?.data?.transaction}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#106B6E]"
            title="Total Participant"
            amount={SummaryData?.participant}
          />
          <SummaryCard
            bgcolor="bg-[#106B6E]"
            title="Total Participant By Date"
            amount={summaryReportByDate?.data?.participant}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <SummaryCard
            bgcolor="bg-[#1A857D]"
            title="Total Quiz"
            amount={SummaryData?.quiz}
          />
          <SummaryCard
            bgcolor="bg-[#1A857D]"
            title="Total Quiz By Date"
            amount={summaryReportByDate?.data?.quiz}
          />
        </div>
        {IncomeLoading ? (
          <Loader />
        ) : (
          <div className="col-span-2 row-span-2">
            <div className="bg-[#EDF0F3] p-3 rounded-xl">
              <div className="flex justify-between items-center px-4">
                <div className="font-semibold text-2xl">Summary Income</div>
                <PeriodeTime
                  onPeriodChange={(period) =>
                    handlePeriodChange("income", period)
                  }
                />
              </div>
              <div className="h-[255px] 2xl:h-[505px] w-full">
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
                <PeriodeTime
                  onPeriodChange={(period) =>
                    handlePeriodChange("participant", period)
                  }
                />
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
