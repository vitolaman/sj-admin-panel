import { rupiahFormatter } from "_helper/formatters";
import React from "react";

interface SummaryCardProps {
  bgcolor: string;
  title: string;
  amount?: number;
  percentage?: number;
  currency?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  bgcolor,
  title,
  amount,
  percentage,
  currency,
}) => {
  return (
    <div
      className={`${bgcolor} text-white p-3 text-center font-medium flex flex-col gap-2 rounded-[7px]`}
    >
      <div className="text-sm font-normal">{title}</div>
      <div className="font-semibold text-[28px]">
        {amount !== undefined
          ? currency
            ? `Rp. ${rupiahFormatter(amount)}`
            : amount
          : "-"}
      </div>
      {percentage !== undefined && (
        <div className="text-right text-[10px]">
          <span
            className={`font-bold text-base ${
              percentage > 0 ? "text-[#FDD059]" : "text-[#DA2D1F]"
            }`}
          >
            {percentage > 0 ? "+" : ""}
            {percentage}%
          </span>{" "}
          growth/lost
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
