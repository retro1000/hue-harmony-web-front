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
    name: "Inventory",
    icon: "inventory",
    children: [
      { name: "Summary", iconText: "E", path: "/inventory/list" },
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
    name: "Products",
    icon: "shopping_basket",
    children: [
      { name: "Summary", iconText: "E", path: "/product/list" },
    ],
  },
  {
    name: "Credit/Debit",
    icon: "request_quote",
    children: [
      { name: "Credit Summary", iconText: "E", path: "/credit-debit/credit/list" },
      { name: "Debit Summary", iconText: "E", path: "/credit-debit/debit/list" },
    ],
  },
  {
    name: "Inventory",
    icon: "inventory",
    children: [
      { name: "Summary", iconText: "E", path: "/inventory/list" },
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
    name: "Invoices",
    icon: "description",
    children: [
      { name: "Sales Invoices", iconText: "E", path: "/invoice/sales/list" },
      
    ],
  },
  {
    name: "Purchase Order",
    icon: "shopping_cart",
    children: [
      { name: "Purchase Order", iconText: "E", path: "/purchase-order/list" },
      { name: "Sales Order", iconText: "E", path: "/sales-order/view" },
    ],
  },
];

const salesNav = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "Stake Holders",
    icon: "group",
    children: [
      { name: "Customers", iconText: "E", path: "/customer/list" },
    ],
  },
  {
    name: "Inventory",
    icon: "inventory",
    children: [
      { name: "Summary", iconText: "E", path: "/inventory/list" },
      { name: "Reservation", iconText: "E", path: "/inventory/reservation" },
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
      
    ],
  },
  {
    name: "Purchase Order",
    icon: "shopping_cart",
    children: [
      { name: "Sales Order", iconText: "E", path: "/sales-order/view" },
    ],
  },
];

const officeNav = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "Stake Holders",
    icon: "group",
    children: [
      { name: "Customers", iconText: "E", path: "/customer/list" },
      { name: "Suppliers", iconText: "E", path: "/supplier/list" },
    ],
  },
  {
    name: "Products",
    icon: "shopping_basket",
    children: [
      { name: "Summary", iconText: "E", path: "/product/list" },
    ],
  },
  {
    name: "Credit/Debit",
    icon: "request_quote",
    children: [
      { name: "Credit Summary", iconText: "E", path: "/credit-debit/credit/list" },
      { name: "Debit Summary", iconText: "E", path: "/credit-debit/debit/list" },
    ],
  },
  {
    name: "Inventory",
    icon: "inventory",
    children: [
      { name: "Summary", iconText: "E", path: "/inventory/list" },
    ],
  },
  {
    name: "Invoices",
    icon: "description",
    children: [
      { name: "Sales Invoices", iconText: "E", path: "/invoice/sales/list" },
      { name: "Purchase Invoices", iconText: "E", path: "/invoice/purchase/list" },
      
    ],
  },
  {
    name: "Payments",
    icon: "account_balance",
    children: [
      { name: "Summary", iconText: "E", path: "/payment/list" },
      
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
    name: "Purchase Order",
    icon: "shopping_cart",
    children: [
      { name: "Puchase Order", iconText: "E", path: "/purchase-order/list" },
    ],
  },
];

const getNavigation = (role) => {

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

export const useNavigation = () => {
  const { role } = useAuth();
  return getNavigation(role);
};


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
      { name: "Sales Order", iconText: "E", path: "/sales-order/view" },
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