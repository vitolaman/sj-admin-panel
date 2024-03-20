import { useCallback, useState } from "react";
import { Tabs } from "react-daisyui";
import ContentContainer from "components/container";
import Posted from "./section/posted";
import Draft from "./section/draft";
import Scheduled from "./section/scheduled";

export const articleRouteName = "article";
const Article = () => {
  const [activeTab, setActiveTab] = useState<number>(2);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 1:
        return <Draft />;
      case 2:
        return <Posted />;
      default:
        return <Scheduled />;
    }
  }, [activeTab]);

  return (
    <ContentContainer>
      <div className="flex">
        <Tabs>
          <Tabs.Tab
            active={1 === activeTab}
            onClick={() => setActiveTab(1)}
            className={`${
              1 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            Draft
          </Tabs.Tab>
          <Tabs.Tab
            active={2 === activeTab}
            onClick={() => setActiveTab(2)}
            className={`${
              2 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            Posted
          </Tabs.Tab>
          <Tabs.Tab
            active={3 === activeTab}
            onClick={() => setActiveTab(3)}
            className={`${
              3 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            Scheduled
          </Tabs.Tab>
        </Tabs>
      </div>
      <div className="mt-3">{renderContent()}</div>
    </ContentContainer>
  );
};

export default Article;
