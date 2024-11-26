export const authRoles = {
  // sa: ["SA"], // Only Super Admin has access
  admin: ["ADMIN"], // Only SA & Admin has access
  back_office: ["BACKOFFICE"], // Only SA & Admin has access
  cachier: ["CASHIER"], // Only SA & Admin has access
  inventory_manager: ["INVENTORYMANAGER"], // Only SA & Admin has access
  sales_manager: ["SALESMANAGER"], // Only SA & Admin has access
  manager: ["ADMIN", "BACKOFFICE", "INVENTORYMANAGER", "SALESMANAGER"],
  user: ["USER"],
  guest: ["GUEST"],
  userOrGuest: ["USER", "GUEST"]
    // editor: ["SA", "ADMIN", "EDITOR"], // Only SA & Admin & Editor has access
  // guest: ["MANAGER", "ADMIN", "USER"] // Everyone has access
};
