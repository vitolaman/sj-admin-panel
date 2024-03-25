import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";
import { Card, CardBody } from "@material-tailwind/react";
import PaymentHistory from "components/circle/PaymentHistory";

export const circleMembershipRouteName = "membership";
export default function Membership(): React.ReactElement {
  return (
    <div>
      <div className="flex flex-row">
        <Card className="mt-6 w-1/3 mr-5" placeholder={""}>
          <CardBody placeholder={""}>
            <div className="flex flex-row items-center">
              <div className="w-3/4">
                <p className="text-sm font-light mb-2">Total Transaction</p>
                <p className="text-2xl font-semibold text-[#553BB8]">430</p>
              </div>

              <div className="w-1/4">
                <span className="flex flex-row align-middle text-[#27A590]">
                  <p>+5 %</p>
                  <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-6 w-1/3 mr-5" placeholder={""}>
          <CardBody placeholder={""}>
            <div className="flex flex-row items-center">
              <div className="w-3/4">
                <p className="text-sm font-light mb-2">Total Payment Success</p>
                <p className="text-2xl font-semibold text-[#553BB8]">300</p>
              </div>

              <div className="w-1/4">
                <span className="flex flex-row align-middle text-[#27A590]">
                  <p>+5 %</p>
                  <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-6 w-1/3" placeholder={""}>
          <CardBody placeholder={""}>
            <div className="flex flex-row items-center">
              <div className="w-3/4">
                <p className="text-sm font-light mb-2">Total Payment Failed</p>
                <p className="text-2xl font-semibold text-[#553BB8]">130</p>
              </div>

              <div className="w-1/4">
                <span className="flex flex-row align-middle text-[#27A590]">
                  <p>+5 %</p>
                  <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-row">
        <Card className="mt-6 w-1/3 mr-5" placeholder={""}>
          <CardBody placeholder={""}>
            <div className="flex flex-row items-center">
              <div className="w-3/4">
                <p className="text-sm font-light mb-2">
                  Total Value of Success Transaction
                </p>
                <p className="text-2xl font-semibold text-[#553BB8]">
                  Rp 25.000.000
                </p>
              </div>

              <div className="w-1/4">
                <span className="flex flex-row align-middle text-[#27A590]">
                  <p>+5 %</p>
                  <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-6 w-1/3 mr-5" placeholder={""}>
          <CardBody placeholder={""}>
            <div className="flex flex-row items-center">
              <div className="w-3/4">
                <p className="text-sm font-light mb-2">
                  Total Value of Seeds Admind Fee
                </p>
                <p className="text-2xl font-semibold text-[#553BB8]">
                  Rp 5.000.000
                </p>
              </div>

              <div className="w-1/4">
                <span className="flex flex-row align-middle text-[#27A590]">
                  <p>+5 %</p>
                  <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-6 w-1/3" placeholder={""}>
          <CardBody placeholder={""}>
            <div className="flex flex-row items-center">
              <div className="w-3/4">
                <p className="text-sm font-light mb-2">
                  Total Value of Circle Owner`s Income
                </p>
                <p className="text-2xl font-semibold text-[#553BB8]">
                  Rp 20.000.000
                </p>
              </div>

              <div className="w-1/4">
                <span className="flex flex-row align-middle text-[#27A590]">
                  <p>+5 %</p>
                  <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-14"></div>
      <div className="mt-14"></div>
      <PaymentHistory />
    </div>
  );
}
