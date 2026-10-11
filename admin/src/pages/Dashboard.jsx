
import { useMemo } from "react";
import "../styles/page/dashboard.css";
import {
  FiBox,
  FiLayers,
  FiTag,
  FiShoppingBag,
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";

// =========================================================
// DASHBOARD
// =========================================================

function Dashboard() {
  // -------------------------------------------------------
  // ADMIN CONTEXT
  // -------------------------------------------------------

  const adminContext = useAdmin();

  const products = adminContext?.products || [];
  const categories = adminContext?.categories || [];
  const deals = adminContext?.deals || [];
  const orders = adminContext?.orders || [];

  // -------------------------------------------------------
  // DASHBOARD CALCULATIONS
  // -------------------------------------------------------

  const dashboardData = useMemo(() => {
    const totalProducts = products.length;

    const totalCategories = categories.length;

    const totalDeals = deals.length;

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((total, order) => {
      const amount =
        Number(
          order?.total ??
            order?.totalAmount ??
            order?.amount ??
            order?.grandTotal ??
            0
        ) || 0;

      return total + amount;
    }, 0);

    const pendingOrders = orders.filter((order) => {
      const status = String(order?.status || "").toLowerCase();

      return (
        status === "pending" ||
        status === "processing" ||
        status === "new"
      );
    }).length;

    const completedOrders = orders.filter((order) => {
      const status = String(order?.status || "").toLowerCase();

      return (
        status === "completed" ||
        status === "delivered" ||
        status === "success"
      );
    }).length;

    const lowStockProducts = products.filter((product) => {
      const stock = Number(
        product?.stock ??
          product?.quantity ??
          product?.inventory ??
          0
      );

      return stock > 0 && stock <= 5;
    }).length;

    return {
      totalProducts,
      totalCategories,
      totalDeals,
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
      lowStockProducts,
    };
  }, [products, categories, deals, orders]);

  // -------------------------------------------------------
  // FORMAT CURRENCY
  // -------------------------------------------------------

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // -------------------------------------------------------
  // RECENT ORDERS
  // -------------------------------------------------------

  const recentOrders = [...orders]
    .sort((a, b) => {
      const dateA = new Date(
        a?.createdAt || a?.date || 0
      ).getTime();

      const dateB = new Date(
        b?.createdAt || b?.date || 0
      ).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  // -------------------------------------------------------
  // STAT CARDS
  // -------------------------------------------------------

  const statCards = [
    {
      title: "Total Products",
      value: dashboardData.totalProducts,
      icon: <FiBox />,
      className: "blue",
      description: "Products in store",
    },

    {
      title: "Categories",
      value: dashboardData.totalCategories,
      icon: <FiLayers />,
      className: "purple",
      description: "Active categories",
    },

    {
      title: "Active Deals",
      value: dashboardData.totalDeals,
      icon: <FiTag />,
      className: "orange",
      description: "Current deals",
    },

    {
      title: "Total Orders",
      value: dashboardData.totalOrders,
      icon: <FiShoppingBag />,
      className: "green",
      description: "Orders received",
    },

    {
      title: "Total Revenue",
      value: formatCurrency(
        dashboardData.totalRevenue
      ),
      icon: <FiDollarSign />,
      className: "cyan",
      description: "Total order revenue",
    },

    {
      title: "Pending Orders",
      value: dashboardData.pendingOrders,
      icon: <FiClock />,
      className: "yellow",
      description: "Orders awaiting action",
    },
  ];

  // =======================================================
  // JSX
  // =======================================================

  return (
    <div className="dashboard-page">

      {/* =================================================
          WELCOME BANNER
      ================================================== */}

      <section className="dashboard-welcome">

        <div className="welcome-content">

          <div className="welcome-badge">
            <FiTrendingUp />
            Admin Overview
          </div>

          <h2>
            Welcome back, Admin 👋
          </h2>

          <p>
            Manage your Ghar Sansar Mart store,
            products, orders and deals from one place.
          </p>

        </div>

        <div className="welcome-icon">
          <FiShoppingBag />
        </div>

      </section>


      {/* =================================================
          STATISTICS
      ================================================== */}

      <section className="dashboard-stats">

        {statCards.map((card) => (

          <div
            className="dashboard-stat-card"
            key={card.title}
          >

            <div className="stat-card-top">

              <div
                className={`stat-icon ${card.className}`}
              >
                {card.icon}
              </div>

              <FiArrowUpRight className="stat-arrow" />

            </div>

            <div className="stat-card-content">

              <span className="stat-title">
                {card.title}
              </span>

              <strong className="stat-value">
                {card.value}
              </strong>

              <span className="stat-description">
                {card.description}
              </span>

            </div>

          </div>

        ))}

      </section>


      {/* =================================================
          LOWER DASHBOARD
      ================================================== */}

      <section className="dashboard-grid">


        {/* =================================================
            ORDER OVERVIEW
        ================================================== */}

        <div className="dashboard-card order-overview">

          <div className="dashboard-card-header">

            <div>
              <h3>
                Order Overview
              </h3>

              <p>
                Current order status
              </p>
            </div>

            <div className="card-header-icon">
              <FiShoppingBag />
            </div>

          </div>


          <div className="order-status-grid">

            <div className="order-status-item">

              <div className="status-icon pending">
                <FiClock />
              </div>

              <div>
                <strong>
                  {dashboardData.pendingOrders}
                </strong>

                <span>
                  Pending
                </span>
              </div>

            </div>


            <div className="order-status-item">

              <div className="status-icon completed">
                <FiCheckCircle />
              </div>

              <div>
                <strong>
                  {dashboardData.completedOrders}
                </strong>

                <span>
                  Completed
                </span>
              </div>

            </div>


            <div className="order-status-item">

              <div className="status-icon total">
                <FiShoppingBag />
              </div>

              <div>
                <strong>
                  {dashboardData.totalOrders}
                </strong>

                <span>
                  Total Orders
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            STORE HEALTH
        ================================================== */}

        <div className="dashboard-card store-health">

          <div className="dashboard-card-header">

            <div>
              <h3>
                Store Health
              </h3>

              <p>
                Quick store status
              </p>
            </div>

            <div className="card-header-icon">
              <FiTrendingUp />
            </div>

          </div>


          <div className="health-list">

            <div className="health-item">

              <div className="health-left">

                <span className="health-dot success" />

                <span>
                  Products
                </span>

              </div>

              <strong>
                {dashboardData.totalProducts}
              </strong>

            </div>


            <div className="health-item">

              <div className="health-left">

                <span className="health-dot success" />

                <span>
                  Categories
                </span>

              </div>

              <strong>
                {dashboardData.totalCategories}
              </strong>

            </div>


            <div className="health-item">

              <div className="health-left">

                <span className="health-dot warning" />

                <span>
                  Low Stock
                </span>

              </div>

              <strong>
                {dashboardData.lowStockProducts}
              </strong>

            </div>


            <div className="health-item">

              <div className="health-left">

                <span className="health-dot success" />

                <span>
                  Active Deals
                </span>

              </div>

              <strong>
                {dashboardData.totalDeals}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          RECENT ORDERS
      ================================================== */}

      <section className="dashboard-card recent-orders">

        <div className="dashboard-card-header">

          <div>

            <h3>
              Recent Orders
            </h3>

            <p>
              Latest orders from your store
            </p>

          </div>

          <div className="card-header-icon">
            <FiShoppingBag />
          </div>

        </div>


        {recentOrders.length === 0 ? (

          <div className="empty-dashboard">

            <div className="empty-icon">
              <FiShoppingBag />
            </div>

            <h4>
              No Orders Yet
            </h4>

            <p>
              New customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>

                <tr>

                  <th>
                    Order
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentOrders.map((order, index) => {

                  const status = String(
                    order?.status || "Pending"
                  );

                  const amount =
                    Number(
                      order?.total ??
                        order?.totalAmount ??
                        order?.amount ??
                        order?.grandTotal ??
                        0
                    ) || 0;

                  const customer =
                    order?.customerName ||
                    order?.customer?.name ||
                    order?.name ||
                    "Customer";

                  const orderId =
                    order?.orderNumber ||
                    order?.orderId ||
                    order?.id ||
                    `#ORD-${1000 + index}`;

                  const orderDate =
                    order?.createdAt ||
                    order?.date;

                  return (

                    <tr key={orderId}>

                      <td>
                        <strong className="order-id">
                          #{String(orderId).replace(
                            /^#/,
                            ""
                          )}
                        </strong>
                      </td>

                      <td>
                        {customer}
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(amount)}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={`order-status-badge ${status
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {status}
                        </span>

                      </td>

                      <td>
                        {orderDate
                          ? new Date(
                              orderDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "—"}
                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* =================================================
          QUICK SUMMARY
      ================================================== */}

      <section className="dashboard-bottom-grid">

        <div className="dashboard-mini-card">

          <div className="mini-card-icon blue">
            <FiBox />
          </div>

          <div>
            <span>
              Products
            </span>

            <strong>
              {dashboardData.totalProducts}
            </strong>
          </div>

        </div>


        <div className="dashboard-mini-card">

          <div className="mini-card-icon purple">
            <FiLayers />
          </div>

          <div>
            <span>
              Categories
            </span>

            <strong>
              {dashboardData.totalCategories}
            </strong>
          </div>

        </div>


        <div className="dashboard-mini-card">

          <div className="mini-card-icon orange">
            <FiTag />
          </div>

          <div>
            <span>
              Deals
            </span>

            <strong>
              {dashboardData.totalDeals}
            </strong>
          </div>

        </div>


        <div className="dashboard-mini-card">

          <div className="mini-card-icon green">
            <FiCheckCircle />
          </div>

          <div>
            <span>
              Completed
            </span>

            <strong>
              {dashboardData.completedOrders}
            </strong>
          </div>

        </div>

      </section>


      {/* =================================================
          LOW STOCK ALERT
      ================================================== */}

      {dashboardData.lowStockProducts > 0 && (

        <div className="dashboard-alert">

          <div className="alert-icon">
            <FiAlertCircle />
          </div>

          <div>

            <strong>
              Low Stock Alert
            </strong>

            <p>
              {dashboardData.lowStockProducts} product
              {dashboardData.lowStockProducts > 1
                ? "s"
                : ""}{" "}
              {dashboardData.lowStockProducts > 1
                ? "are"
                : "is"}{" "}
              running low on stock.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;
