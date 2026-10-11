import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AdminContext = createContext(null);

/* =========================================================
   LOCAL STORAGE KEYS
========================================================= */

const STORAGE_KEYS = {
  products: "gsm_admin_products",
  categories: "gsm_admin_categories",
  deals: "gsm_admin_deals",
  orders: "gsm_admin_orders",
  profile: "gsm_admin_profile",
};

/* =========================================================
   DEMO PRODUCTS
========================================================= */

const defaultProducts = [
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
   DEFAULT CATEGORIES
========================================================= */

const defaultCategories = [
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
   DEFAULT DEALS
========================================================= */

const defaultDeals = [
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
   DEFAULT ORDERS
========================================================= */

const defaultOrders = [
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
   DEFAULT ADMIN PROFILE
========================================================= */

const defaultProfile = {
  name: "Admin",
  email: "admin@gharsansarmart.com",
  role: "Administrator",
};

/* =========================================================
   SAFE LOCAL STORAGE READER
========================================================= */

function getStoredData(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallback;
    }

    const parsedValue = JSON.parse(storedValue);

    return parsedValue ?? fallback;
  } catch (error) {
    console.error(`Failed to read ${key}:`, error);
    return fallback;
  }
}

/* =========================================================
   PROVIDER
========================================================= */

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(() =>
    getStoredData(
      STORAGE_KEYS.products,
      defaultProducts
    )
  );

  const [categories, setCategories] = useState(() =>
    getStoredData(
      STORAGE_KEYS.categories,
      defaultCategories
    )
  );

  const [deals, setDeals] = useState(() =>
    getStoredData(
      STORAGE_KEYS.deals,
      defaultDeals
    )
  );

  const [orders, setOrders] = useState(() =>
    getStoredData(
      STORAGE_KEYS.orders,
      defaultOrders
    )
  );

  const [profile, setProfile] = useState(() =>
    getStoredData(
      STORAGE_KEYS.profile,
      defaultProfile
    )
  );

  /* =======================================================
     SAVE DATA TO LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.products,
      JSON.stringify(products)
    );
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.categories,
      JSON.stringify(categories)
    );
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.deals,
      JSON.stringify(deals)
    );
  }, [deals]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.orders,
      JSON.stringify(orders)
    );
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.profile,
      JSON.stringify(profile)
    );
  }, [profile]);

  /* =======================================================
     PRODUCT FUNCTIONS
  ======================================================= */

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `P${Date.now()}`,
      price: Number(productData.price) || 0,
      oldPrice: Number(productData.oldPrice) || 0,
      stock: Number(productData.stock) || 0,
      status:
        productData.status ||
        (Number(productData.stock) > 0
          ? "Active"
          : "Inactive"),
      createdAt: new Date()
        .toISOString()
        .split("T")[0],
    };

    setProducts((previousProducts) => [
      newProduct,
      ...previousProducts,
    ]);

    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        String(product.id) === String(id)
          ? {
              ...product,
              ...updatedData,
              price:
                updatedData.price !== undefined
                  ? Number(updatedData.price)
                  : product.price,
              oldPrice:
                updatedData.oldPrice !== undefined
                  ? Number(updatedData.oldPrice)
                  : product.oldPrice,
              stock:
                updatedData.stock !== undefined
                  ? Number(updatedData.stock)
                  : product.stock,
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) =>
          String(product.id) !== String(id)
      )
    );
  };

  const getProductById = (id) => {
    return products.find(
      (product) =>
        String(product.id) === String(id)
    );
  };

  const updateStock = (id, stock) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        String(product.id) === String(id)
          ? {
              ...product,
              stock: Math.max(0, Number(stock) || 0),
              status:
                Number(stock) > 0
                  ? "Active"
                  : "Inactive",
            }
          : product
      )
    );
  };

  const updatePrice = (id, price, oldPrice) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        String(product.id) === String(id)
          ? {
              ...product,
              price: Number(price) || 0,
              oldPrice:
                oldPrice !== undefined
                  ? Number(oldPrice) || 0
                  : product.oldPrice,
            }
          : product
      )
    );
  };

  /* =======================================================
     CATEGORY FUNCTIONS
  ======================================================= */

  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: `CAT${Date.now()}`,
      status: categoryData.status || "Active",
    };

    setCategories((previousCategories) => [
      ...previousCategories,
      newCategory,
    ]);

    return newCategory;
  };

  const updateCategory = (id, updatedData) => {
    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        String(category.id) === String(id)
          ? {
              ...category,
              ...updatedData,
            }
          : category
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories((previousCategories) =>
      previousCategories.filter(
        (category) =>
          String(category.id) !== String(id)
      )
    );
  };

  /* =======================================================
     DEAL FUNCTIONS
  ======================================================= */

  const addDeal = (dealData) => {
    const newDeal = {
      ...dealData,
      id: `DEAL${Date.now()}`,
      discount: Number(dealData.discount) || 0,
      status: dealData.status || "Active",
    };

    setDeals((previousDeals) => [
      newDeal,
      ...previousDeals,
    ]);

    return newDeal;
  };

  const updateDeal = (id, updatedData) => {
    setDeals((previousDeals) =>
      previousDeals.map((deal) =>
        String(deal.id) === String(id)
          ? {
              ...deal,
              ...updatedData,
              discount:
                updatedData.discount !== undefined
                  ? Number(updatedData.discount)
                  : deal.discount,
            }
          : deal
      )
    );
  };

  const deleteDeal = (id) => {
    setDeals((previousDeals) =>
      previousDeals.filter(
        (deal) =>
          String(deal.id) !== String(id)
      )
    );
  };

  /* =======================================================
     ORDER FUNCTIONS
  ======================================================= */

  const updateOrderStatus = (id, status) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        String(order.id) === String(id)
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  };

  const getOrderById = (id) => {
    return orders.find(
      (order) =>
        String(order.id) === String(id)
    );
  };

  /* =======================================================
     PROFILE
  ======================================================= */

  const updateProfile = (updatedData) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      ...updatedData,
    }));
  };

  /* =======================================================
     DASHBOARD STATISTICS
  ======================================================= */

  const dashboardStats = useMemo(() => {
    const activeOrders = orders.filter(
      (order) =>
        String(order.status).toLowerCase() !==
        "cancelled"
    );

    const totalSales = activeOrders.reduce(
      (total, order) =>
        total + (Number(order.total) || 0),
      0
    );

    const lowStockProducts = products.filter(
      (product) =>
        Number(product.stock) > 0 &&
        Number(product.stock) <= 5
    );

    const outOfStockProducts = products.filter(
      (product) =>
        Number(product.stock) === 0
    );

    const pendingOrders = orders.filter(
      (order) =>
        String(order.status).toLowerCase() ===
        "pending"
    );

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalSales,
      lowStock: lowStockProducts.length,
      outOfStock: outOfStockProducts.length,
      pendingOrders: pendingOrders.length,
      activeDeals: deals.filter(
        (deal) =>
          String(deal.status).toLowerCase() ===
          "active"
      ).length,
      activeProducts: products.filter(
        (product) =>
          String(product.status).toLowerCase() ===
          "active"
      ).length,
    };
  }, [products, orders, deals]);

  /* =======================================================
     RECENT ORDERS
  ======================================================= */

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (first, second) =>
          new Date(second.date) -
          new Date(first.date)
      )
      .slice(0, 5);
  }, [orders]);

  /* =======================================================
     CATEGORY PRODUCT COUNT
  ======================================================= */

  const getCategoryProductCount = (categoryName) => {
    return products.filter(
      (product) =>
        String(product.category).toLowerCase() ===
        String(categoryName).toLowerCase()
    ).length;
  };

  /* =======================================================
     RESET ADMIN DATA
  ======================================================= */

  const resetAdminData = () => {
    setProducts(defaultProducts);
    setCategories(defaultCategories);
    setDeals(defaultDeals);
    setOrders(defaultOrders);
    setProfile(defaultProfile);
  };

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = {
    products,
    categories,
    deals,
    orders,
    profile,

    dashboardStats,
    recentOrders,

    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    updateStock,
    updatePrice,

    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryProductCount,

    addDeal,
    updateDeal,
    deleteDeal,

    updateOrderStatus,
    getOrderById,

    updateProfile,

    resetAdminData,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

/* =========================================================
   CUSTOM HOOK
========================================================= */

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider"
    );
  }

  return context;
}

export default AdminContext;