export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "Products",
    icon: "shopping_basket",
    children: [
      { name: "Summary", iconText: "E", path: "/product/list" },
      { name: "Create new product", iconText: "E", path: "/product/create" },
      { name: "Product Details", iconText: "E", path: "/products/view" },
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

  // { label: "PAGES", type: "label" },
  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  // { label: "Components", type: "label" },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // },
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
