// admin/src/data/adminData.js

/* =========================================================
   ADMIN PANEL DEMO DATA
   Ghar Sansar Mart
========================================================= */

/* =========================================================
   PRODUCTS
========================================================= */

export const adminProducts = [
  {
    id: "P001",
    name: "Premium Basmati Rice 5kg",
    category: "Grocery",
    subCategory: "Staples",
    price: 499,
    oldPrice: 599,
    stock: 24,
    unit: "5 kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
    description:
      "Premium quality basmati rice suitable for everyday cooking.",
    createdAt: "2026-09-28",
  },

  {
    id: "P002",
    name: "Fortune Sunflower Oil 1L",
    category: "Grocery",
    subCategory: "Cooking Oil",
    price: 149,
    oldPrice: 169,
    stock: 42,
    unit: "1 L",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",
    description:
      "Light and healthy sunflower cooking oil.",
    createdAt: "2026-09-27",
  },

  {
    id: "P003",
    name: "Tata Tea Premium 500g",
    category: "Grocery",
    subCategory: "Beverages",
    price: 245,
    oldPrice: 275,
    stock: 18,
    unit: "500 g",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500",
    description:
      "Rich and refreshing tea for your daily cup.",
    createdAt: "2026-09-26",
  },

  {
    id: "P004",
    name: "Aashirvaad Atta 5kg",
    category: "Grocery",
    subCategory: "Flour",
    price: 285,
    oldPrice: 320,
    stock: 7,
    unit: "5 kg",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
    description:
      "Whole wheat flour made from quality wheat grains.",
    createdAt: "2026-09-25",
  },

  {
    id: "P005",
    name: "Non-Stick Fry Pan",
    category: "Home & Kitchen",
    subCategory: "Cookware",
    price: 699,
    oldPrice: 999,
    stock: 12,
    unit: "1 Piece",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
    description:
      "Durable non-stick fry pan for everyday cooking.",
    createdAt: "2026-09-24",
  },

  {
    id: "P006",
    name: "Stainless Steel Cookware Set",
    category: "Home & Kitchen",
    subCategory: "Cookware",
    price: 1899,
    oldPrice: 2499,
    stock: 5,
    unit: "5 Pieces",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1584990347449-ae5e2d0f2d9f?w=500",
    description:
      "Premium stainless steel cookware set for modern kitchens.",
    createdAt: "2026-09-23",
  },

  {
    id: "P007",
    name: "Kitchen Storage Container Set",
    category: "Home & Kitchen",
    subCategory: "Storage",
    price: 549,
    oldPrice: 799,
    stock: 3,
    unit: "6 Pieces",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500",
    description:
      "Airtight containers for organized kitchen storage.",
    createdAt: "2026-09-22",
  },

  {
    id: "P008",
    name: "Electric Hand Blender",
    category: "Home & Kitchen",
    subCategory: "Appliances",
    price: 899,
    oldPrice: 1199,
    stock: 0,
    unit: "1 Piece",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
    description:
      "Compact electric hand blender for quick kitchen preparation.",
    createdAt: "2026-09-21",
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

export const adminCategories = [
  {
    id: "CAT001",
    name: "Grocery",
    description: "Daily grocery and food essentials",
    status: "Active",
  },

  {
    id: "CAT002",
    name: "Home & Kitchen",
    description: "Kitchen and household products",
    status: "Active",
  },
];

/* =========================================================
   DEALS
========================================================= */

export const adminDeals = [
  {
    id: "DEAL001",
    title: "Mega Grocery Sale",
    discount: 20,
    type: "Percentage",
    category: "Grocery",
    status: "Active",
    startDate: "2026-10-01",
    endDate: "2026-10-15",
  },

  {
    id: "DEAL002",
    title: "Kitchen Special Offer",
    discount: 15,
    type: "Percentage",
    category: "Home & Kitchen",
    status: "Active",
    startDate: "2026-10-01",
    endDate: "2026-10-20",
  },
];

/* =========================================================
   ORDERS
========================================================= */

export const adminOrders = [
  {
    id: "ORD1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    items: 3,
    total: 1299,
    payment: "UPI",
    status: "Delivered",
    date: "2026-10-03",
  },

  {
    id: "ORD1002",
    customer: "Aman Verma",
    email: "aman@example.com",
    items: 2,
    total: 899,
    payment: "Cash",
    status: "Processing",
    date: "2026-10-03",
  },

  {
    id: "ORD1003",
    customer: "Neha Singh",
    email: "neha@example.com",
    items: 5,
    total: 2199,
    payment: "Card",
    status: "Shipped",
    date: "2026-10-02",
  },

  {
    id: "ORD1004",
    customer: "Vikas Kumar",
    email: "vikas@example.com",
    items: 1,
    total: 549,
    payment: "UPI",
    status: "Pending",
    date: "2026-10-02",
  },

  {
    id: "ORD1005",
    customer: "Pooja Gupta",
    email: "pooja@example.com",
    items: 4,
    total: 1799,
    payment: "UPI",
    status: "Delivered",
    date: "2026-10-01",
  },
];

/* =========================================================
   ADMIN PROFILE
========================================================= */

export const adminProfile = {
  name: "Admin",
  email: "admin@gharsansarmart.com",
  role: "Administrator",
};

/* =========================================================
   DASHBOARD QUICK STATS
========================================================= */

export const adminDashboardStats = {
  totalProducts: adminProducts.length,

  totalOrders: adminOrders.length,

  totalSales: adminOrders
    .filter(
      (order) =>
        order.status.toLowerCase() !== "cancelled"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    ),

  lowStock: adminProducts.filter(
    (product) =>
      Number(product.stock) > 0 &&
      Number(product.stock) <= 5
  ).length,

  outOfStock: adminProducts.filter(
    (product) =>
      Number(product.stock) === 0
  ).length,

  pendingOrders: adminOrders.filter(
    (order) =>
      order.status.toLowerCase() === "pending"
  ).length,

  activeDeals: adminDeals.filter(
    (deal) =>
      deal.status.toLowerCase() === "active"
  ).length,
};

/* =========================================================
   ORDER STATUS OPTIONS
========================================================= */

export const orderStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

/* =========================================================
   PRODUCT STATUS OPTIONS
========================================================= */

export const productStatuses = [
  "Active",
  "Inactive",
];

/* =========================================================
   DEAL STATUS OPTIONS
========================================================= */

export const dealStatuses = [
  "Active",
  "Inactive",
];

/* =========================================================
   PAYMENT METHODS
========================================================= */

export const paymentMethods = [
  "UPI",
  "Cash",
  "Card",
  "Other",
];

/* =========================================================
   CATEGORY OPTIONS
========================================================= */

export const categoryOptions = [
  "Grocery",
  "Home & Kitchen",
];