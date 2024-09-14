import { MouseEventHandler } from "react";
import { Button, Dropdown } from "react-daisyui";

interface Props {
  onClick: MouseEventHandler<HTMLAnchorElement>;
  type: string;
}
const ItemCategory = ({ onClick, type }: Props) => {
  return (
    <Dropdown.Item className="p-0" onClick={onClick}>
      <Button
        fullWidth
        size="xs"
        className="border-none shadow-none p-0 font-normal font-poppins text-sm text-[#201B1C]"
      >
        {type}
      </Button>
    </Dropdown.Item>
  );
};

export default ItemCategory;
