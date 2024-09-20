interface SummaryCardProps {
  bgcolor: string;
  title: string;
  amount?: number;
  growthPercentage?: number;
  currency?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  bgcolor,
  title,
  amount,
  growthPercentage,
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
            ? `${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}`
            : amount
          : "-"}
      </div>
      {growthPercentage !== undefined && (
        <div className="text-right text-[10px]">
          <span
            className={`font-bold text-base ${
              growthPercentage > 0 ? "text-[#FDD059]" : "text-[#DA2D1F]"
            }`}
          >
            {growthPercentage > 0 ? "+" : ""}
            {growthPercentage}%
          </span>{" "}
          growth/lost
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
