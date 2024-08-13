import { MdDateRange } from "react-icons/md";
import { useState } from "react";

interface PeriodTimeProps {
  onPeriodChange: (period: string) => void;
}

const PeriodeTime: React.FC<PeriodTimeProps> = ({ onPeriodChange }) => {
  const [summaryIncome, setSummaryIncome] = useState(true);
  const [incomeStatus, setIncomeStatus] = useState("");
  const handleTimePeriod = () => {
    setSummaryIncome(!summaryIncome);
  };

  const handlePeriodChange = (period: string) => {
    setIncomeStatus(period);
    onPeriodChange(period === "Monthly" ? "MONTHLY" : "WEEKLY");
  };
  return (
    <>
      <div className="relative">
        <div
          className="flex flex-row items-center gap-2 p-2 bg-white rounded-xl cursor-pointer"
          onClick={handleTimePeriod}
        >
          <div>
            <MdDateRange size={20} />
          </div>
          <div>{incomeStatus !== "" ? incomeStatus : "This Month"}</div>
        </div>
        <div
          className={`bg-white p-2 ${
            summaryIncome ? "hidden" : "flex"
          } flex-col gap-3 rounded-xl absolute bottom-[-80px] right-0 z-10`}
          onClick={handleTimePeriod}
        >
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handlePeriodChange("Monthly")}
          >
            <div>
              <MdDateRange size={20} />
            </div>
            <div>Monthly</div>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handlePeriodChange("Weekly")}
          >
            <div>
              <MdDateRange size={20} />
            </div>
            <div>Weekly</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeriodeTime;
