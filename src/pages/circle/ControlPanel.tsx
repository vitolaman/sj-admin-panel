import CircleDatabase from "components/circle/CircleDatabase";
import TokenReport from "components/circle/TokenReport";
interface ControlPanelProps {}
const ControlPanel: React.FC<ControlPanelProps> = () => {
  return (
    <>
      <CircleDatabase />
      <div className="mt-14"></div>
      <TokenReport />
    </>
  );
};

export default ControlPanel;
