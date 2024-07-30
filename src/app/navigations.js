import useAuth from "./hooks/useAuth";

const adminNav = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "Products",
    icon: "shopping_basket",
    children: [
      { name: "Summary", iconText: "E", path: "/product/store/list" },
      { name: "Create product", iconText: "E", path: "/product/create" },
    ],
  },
  {
    name: "Stake Holders",
    icon: "group",
    children: [
      { name: "Users", iconText: "E", path: "/user/list" },
      // { name: "Customers", iconText: "E", path: "/customer/list" },
      // { name: "Suppliers", iconText: "E", path: "/supplier/list" },
    ],
  },
];

const inventoryNav = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "GRN",
    icon: "summarize",
    children: [{ name: "Summary", iconText: "E", path: "/grn/list" }],
  },
  {
    name: "Inventory",
    icon: "inventory",
    children: [
      { name: "Summary", iconText: "E", path: "/inventory/list" },
      { name: "Reservation", iconText: "E", path: "/inventory/reservation" },
      // { name: "GRN", iconText: "E", path: "/inventory/Grn" },
      {
        name: "Credit/Debit Note",
        iconText: "E",
        path: "/inventory/creditdebitnote",
      },
      {
        name: "Stock Adjustments",
        iconText: "E",
        children: [
          {
            name: "Summary",
            iconText: "E",
            path: "/inventory/stock-adjustment/list",
          },
          {
            name: "Approve",
            iconText: "E",
            path: "/inventory/stock-adjustment",
          },
        ],
      },
    ],
  },
];

const salesNav = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },

];

const officeNav = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "Stake Holders",
    icon: "group",
    children: [
      // { name: "Users", iconText: "E", path: "/user/list" },
      { name: "Customers", iconText: "E", path: "/customer/list" },
      { name: "Suppliers", iconText: "E", path: "/supplier/list" },
    ],
  },
  {
    name: "Credit/Debit Note",
    iconText: "E",
    path: "/inventory/creditdebitnote",
  },
];

export const navigation = () => {
  const { role } = useAuth

  switch(role){
    case 'ADMIN':
      return adminNav;
    case 'INVENTORYMANAGER':
      return inventoryNav;
    case 'SALESMANAGER':
      return salesNav;
    case 'BACKOFFICE':
      return officeNav;
    default:
      return []      
  }
}


export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "Products",
    icon: "shopping_basket",
    children: [
      { name: "Summary", iconText: "E", path: "/product/list" },
      { name: "Create new product", iconText: "E", path: "/product/create" },
    ],
  },
  {
    name: "GRN",
    icon: "summarize",
    children: [{ name: "Summary", iconText: "E", path: "/grn/list" }],
  },
  {
    name: "Invoices",
    icon: "description",
    children: [
      { name: "Summary", iconText: "E", path: "/invoice/list" },
      
    ],
  },
  {
    name: "Orders",
    icon: "attach_money",
    children: [
      { name: "Retail", iconText: "E", path: "/order/retail/list" },
      { name: "WholeSale", iconText: "E", path: "/order/wholesale/list" },
    ],
  },
  {
    name: "Payments",
    icon: "account_balance",
    children: [
      { name: "Summary", iconText: "E", path: "/payment/list" },
      {
        name: "Bulk Payment Details",
        iconText: "E",
        path: "/payment/bulkpaymentdetails",
      },
    ],
  },
  {
    name: "Purchase Order",
    icon: "shopping_cart",
    children: [
      { name: "Summary", iconText: "E", path: "/purchase-order/list" },
    ],
  },
  {
    name: "Inventory",
    icon: "inventory",
    children: [
      { name: "Summary", iconText: "E", path: "/inventory/list" },
      { name: "Reservation", iconText: "E", path: "/inventory/reservation" },
      { name: "GRN", iconText: "E", path: "/inventory/Grn" },
      {
        name: "Credit/Debit Note",
        iconText: "E",
        path: "/inventory/creditdebitnote",
      },
      {
        name: "Stock Adjustments",
        iconText: "E",
        children: [
          {
            name: "Summary",
            iconText: "E",
            path: "/inventory/stock-adjustment/list",
          },
          {
            name: "Approve",
            iconText: "E",
            path: "/inventory/stock-adjustment",
          },
        ],
      },
    ],
  },
  {
    name: "Stake Holders",
    icon: "group",
    children: [
      { name: "Users", iconText: "E", path: "/user/list" },
      { name: "Customers", iconText: "E", path: "/customer/list" },
      { name: "Suppliers", iconText: "E", path: "/supplier/list" },
    ],
  },
  {
    name: "Reports",
    icon: "assessment",
    children: [],
  },
  {
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
  },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
  
];
