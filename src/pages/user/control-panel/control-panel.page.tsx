import { useState } from "react";
import { Tabs } from "react-daisyui";
import UserDatabase from "./section/user";

export const ucpRouteName = "control-panel";
const UserControlPanel = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <div className="bg-white w-full p-4">
      <div className="flex">
        <Tabs>
          <Tabs.Tab
            active={1 === activeTab}
            onClick={() => setActiveTab(1)}
            className={`${
              1 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            User Database
          </Tabs.Tab>
          <Tabs.Tab
            active={2 === activeTab}
            onClick={() => setActiveTab(2)}
            className={`${
              2 === activeTab ? "border-b-2" : "border-b"
            } border-gray-400`}
          >
            Staff Database
          </Tabs.Tab>
        </Tabs>
      </div>
      <div className="mt-3">
        {activeTab === 1 ? <UserDatabase /> : <>Staff Database</>}
      </div>
    </div>
  );
};

export default UserControlPanel;
