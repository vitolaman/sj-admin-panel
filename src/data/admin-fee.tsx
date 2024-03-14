const categoryPaymentOptions = [
  {
    key: 1,
    label: "All",
    value: "",
  },
  {
    key: 2,
    label: "Bank",
    value: "va",
  },
  {
    key: 3,
    label: "E-Wallet",
    value: "ewallet",
  },
  {
    key: 4,
    label: "QRIS",
    value: "qris",
  },
];

const categoryWithdrawOptions = [
  {
    key: 1,
    label: "All",
    value: "",
  },
  {
    key: 2,
    label: "Bank",
    value: "bank",
  },
  {
    key: 3,
    label: "E-Wallet",
    value: "ewallet",
  },
];

const priorityOption = [
  {
    id: 1,
    label: "All",
    value: "",
  },
  {
    id: 2,
    label: "Priority",
    value: "true",
  },
  {
    id: 3,
    label: "Reguler",
    value: "false",
  },
];

const statusOption = [
  {
    key: 1,
    label: "All",
    value: "",
  },
  {
    key: 2,
    label: "Hidden",
    value: "hidden",
  },
  {
    key: 3,
    label: "Displayed",
    value: "displayed",
  },
];

export {
  categoryPaymentOptions,
  categoryWithdrawOptions,
  priorityOption,
  statusOption,
};