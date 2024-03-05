import ReactSelect, {
  GroupBase,
  OptionsOrGroups,
  components,
} from "react-select";

interface Props {
  options: OptionsOrGroups<any, GroupBase<any>>;
  value: string;
  disabled?: boolean;
  onChange: (e: any) => void;
}

const Select = ({ options, value, disabled = false, onChange }: Props) => {
  return (
    <ReactSelect
      value={options.find((item) => item.data === value)}
      options={options}
      isDisabled={disabled}
      onChange={onChange}
      styles={{
        control: (baseStyle) => ({
          ...baseStyle,
          padding: 5,
          borderColor: '#BDBDBD',
          borderRadius: '0.5rem'
        }),
      }}
      components={{
        Option: (props) => (
          <components.Option {...props} className="bg-white">
            <div className="flex flex-row gap-2 items-center">
              {props.data.icon()}
              <div>{props.data.label}</div>
            </div>
          </components.Option>
        ),
        SingleValue: (props) => (
          <components.SingleValue {...props}>
            <div className="flex flex-row gap-2 items-center">
              {props.data.icon()}
              <div>{props.data.label}</div>
            </div>
          </components.SingleValue>
        ),
      }}
    />
  );
};

export default Select;
