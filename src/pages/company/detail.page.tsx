import ContentContainer from "components/container";
import SummaryReport from "./sections/summary-report.section";
import TransactionHistory from "./sections/transaction-history.section";
import { useParams } from "react-router-dom";

export const detailCompanyRouteName = ":id/detail";

const DetailCompany = () => {
  const params = useParams();
  return (
    <ContentContainer>
      <section>
        <SummaryReport id={params.id!} />
      </section>
      <section className="mt-10">
        <TransactionHistory id={params.id!} />
      </section>
    </ContentContainer>
  );
};

export default DetailCompany;
