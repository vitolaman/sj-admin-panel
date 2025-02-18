interface SubMenuItem {
  name: string;
  path: string;
}
interface MenuItem {
  name: string;
  path: string;
  child?: SubMenuItem[];
  expand?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: "User",
    path: "#",
    child: [
      { name: "Control Panel", path: "/user/control-panel" },
    ],
  },
  {
    name: "Item",
    path: "/item",
  },
  {
    name: "Gudang",
    path: "#",
    child: [
      { name: "Barang Masuk", path: "/masuk" },
      {
        name: "Barang Keluar",
        path: "/keluar",
      },
    ],
  },
  {
    name: "Pending Stock",
    path: "/pending-item",
  },
  {
    name: "Nota",
    path: "/bill",
  },
  {
    name: "Stock Order",
    path: "/stock-order",
  },
  {
    name: "Client",
    path: "/client",
  },
];

export { menuItems };
export type { MenuItem };
