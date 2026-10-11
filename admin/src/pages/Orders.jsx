
import { useMemo, useState } from "react";
import "../styles/page/order.css";
import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiX,
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
  FiShoppingBag,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";
import StatusBadge from "../components/StatusBadge";

function Orders() {
  const {
    orders = [],
    updateOrderStatus,
  } = useAdmin();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  /* =========================================================
     FILTER ORDERS
  ========================================================= */

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        [
          order.id,
          order.customer,
          order.customerName,
          order.name,
          order.email,
          order.phone,
          order.payment,
          order.paymentMethod,
          order.status,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(query)
          );

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.payment === paymentFilter ||
        order.paymentMethod === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    paymentFilter,
  ]);

  /* =========================================================
     ORDER STATS
  ========================================================= */

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  /* =========================================================
     HELPERS
  ========================================================= */

  const getOrderTotal = (order) => {
    const total =
      order.total ??
      order.amount ??
      order.orderTotal ??
      0;

    return Number(total);
  };

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const formatDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCustomerName = (order) => {
    return (
      order.customerName ||
      order.customer ||
      order.name ||
      "Guest Customer"
    );
  };

  const getPaymentMethod = (order) => {
    return (
      order.paymentMethod ||
      order.payment ||
      "—"
    );
  };

  const getItemCount = (order) => {
    if (typeof order.items === "number") {
      return order.items;
    }

    if (Array.isArray(order.items)) {
      return order.items.reduce(
        (total, item) =>
          total +
          Number(
            item.quantity ??
              item.qty ??
              1
          ),
        0
      );
    }

    return order.itemCount ?? 0;
  };

  const getOrderItems = (order) => {
    if (Array.isArray(order.items)) {
      return order.items;
    }

    return [];
  };

  /* =========================================================
     VIEW ORDER
  ========================================================= */

  const openViewModal = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedOrder(null);
  };

  /* =========================================================
     STATUS EDIT
  ========================================================= */

  const startStatusEdit = (order) => {
    setEditingOrderId(order.id);
    setNewStatus(order.status || "Pending");
  };

  const cancelStatusEdit = () => {
    setEditingOrderId(null);
    setNewStatus("");
  };

  const saveStatus = (orderId) => {
    if (!newStatus) {
      return;
    }

    updateOrderStatus(orderId, newStatus);

    setEditingOrderId(null);
    setNewStatus("");

    if (selectedOrder?.id === orderId) {
      setSelectedOrder((previous) =>
        previous
          ? {
              ...previous,
              status: newStatus,
            }
          : previous
      );
    }
  };

  /* =========================================================
     QUICK STATUS UPDATE
  ========================================================= */

  const quickStatusUpdate = (
    orderId,
    status
  ) => {
    updateOrderStatus(orderId, status);

    setSelectedOrder((previous) =>
      previous?.id === orderId
        ? {
            ...previous,
            status,
          }
        : previous
    );
  };

  return (
    <div className="admin-page orders-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div className="page-header-left">

          <div>
            <div className="breadcrumb">
              <span>Admin</span>
              <span>/</span>
              <span>Orders</span>
            </div>

            <h1>Orders</h1>

            <p>
              Manage customer orders and update their
              delivery status.
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          ORDER STATS
      ===================================================== */}

      <div className="stats-grid orders-stats">

        <div className="order-stat-card">

          <div className="order-stat-icon">
            <FiShoppingBag />
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>

        </div>

        <div className="order-stat-card pending">

          <div className="order-stat-icon">
            <FiClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingOrders}</strong>
          </div>

        </div>

        <div className="order-stat-card processing">

          <div className="order-stat-icon">
            <FiPackage />
          </div>

          <div>
            <span>Processing</span>
            <strong>{processingOrders}</strong>
          </div>

        </div>

        <div className="order-stat-card shipped">

          <div className="order-stat-icon">
            <FiTruck />
          </div>

          <div>
            <span>Shipped</span>
            <strong>{shippedOrders}</strong>
          </div>

        </div>

        <div className="order-stat-card delivered">

          <div className="order-stat-icon">
            <FiCheckCircle />
          </div>

          <div>
            <span>Delivered</span>
            <strong>{deliveredOrders}</strong>
          </div>

        </div>

        <div className="order-stat-card cancelled">

          <div className="order-stat-icon">
            <FiXCircle />
          </div>

          <div>
            <span>Cancelled</span>
            <strong>{cancelledOrders}</strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          ORDERS CONTENT
      ===================================================== */}

      <div className="content-card">

        {/* Toolbar */}
        <div className="content-card-toolbar orders-toolbar">

          <div>
            <h2>All Orders</h2>

            <p>
              {filteredOrders.length} orders found
            </p>
          </div>

          <div className="orders-filter-controls">

            {/* Search */}
            <div className="toolbar-search">

              <FiSearch />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search order or customer..."
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearch("")}
                >
                  <FiX />
                </button>
              )}

            </div>

            {/* Status Filter */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            {/* Payment Filter */}
            <select
              className="filter-select"
              value={paymentFilter}
              onChange={(event) =>
                setPaymentFilter(event.target.value)
              }
            >
              <option value="All">
                All Payments
              </option>

              <option value="COD">
                COD
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

              <option value="Cash">
                Cash
              </option>
            </select>

          </div>

        </div>

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {filteredOrders.length === 0 ? (

          <div className="orders-empty">

            <div className="orders-empty-icon">
              <FiShoppingBag />
            </div>

            <h3>No Orders Found</h3>

            <p>
              {search ||
              statusFilter !== "All" ||
              paymentFilter !== "All"
                ? "Try changing your search or filters."
                : "Customer orders will appear here."}
            </p>

          </div>

        ) : (

          /* =================================================
             ORDERS TABLE
          ================================================= */

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>

                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredOrders.map((order) => (

                  <tr key={order.id}>

                    {/* Order */}
                    <td>

                      <div className="order-id-cell">

                        <strong>
                          #{order.id}
                        </strong>

                        <span>
                          Order
                        </span>

                      </div>

                    </td>

                    {/* Customer */}
                    <td>

                      <div className="order-customer-cell">

                        <div className="customer-avatar">
                          <FiUser />
                        </div>

                        <div>

                          <strong>
                            {getCustomerName(order)}
                          </strong>

                          <span>
                            {order.email ||
                              order.phone ||
                              "Customer"}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Date */}
                    <td>

                      <div className="order-date-cell">

                        <FiCalendar />

                        <span>
                          {formatDate(
                            order.date ||
                              order.createdAt
                          )}
                        </span>

                      </div>

                    </td>

                    {/* Items */}
                    <td>

                      <span className="order-items-count">

                        {getItemCount(order)}{" "}

                        {getItemCount(order) === 1
                          ? "item"
                          : "items"}

                      </span>

                    </td>

                    {/* Total */}
                    <td>

                      <strong className="order-total">

                        {formatCurrency(
                          getOrderTotal(order)
                        )}

                      </strong>

                    </td>

                    {/* Payment */}
                    <td>

                      <span className="payment-method">

                        <FiCreditCard />

                        {getPaymentMethod(order)}

                      </span>

                    </td>

                    {/* Status */}
                    <td>

                      {editingOrderId === order.id ? (

                        <div className="status-edit-control">

                          <select
                            value={newStatus}
                            onChange={(event) =>
                              setNewStatus(
                                event.target.value
                              )
                            }
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Shipped">
                              Shipped
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                          <button
                            type="button"
                            className="status-save-btn"
                            onClick={() =>
                              saveStatus(order.id)
                            }
                            title="Save status"
                          >
                            <FiCheckCircle />
                          </button>

                          <button
                            type="button"
                            className="status-cancel-btn"
                            onClick={
                              cancelStatusEdit
                            }
                            title="Cancel"
                          >
                            <FiX />
                          </button>

                        </div>

                      ) : (

                        <StatusBadge
                          status={
                            order.status || "Pending"
                          }
                        />

                      )}

                    </td>

                    {/* Actions */}
                    <td>

                      <div className="order-actions">

                        <button
                          type="button"
                          className="table-action view"
                          title="View Order"
                          onClick={() =>
                            openViewModal(order)
                          }
                        >
                          <FiEye />
                        </button>

                        <button
                          type="button"
                          className="table-action edit"
                          title="Update Status"
                          onClick={() =>
                            startStatusEdit(order)
                          }
                        >
                          <FiEdit2 />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {showViewModal && selectedOrder && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeViewModal();
            }
          }}
        >

          <div className="order-details-modal">

            {/* Modal Header */}
            <div className="modal-header">

              <div>

                <div className="order-modal-title-row">

                  <h2>
                    Order #{selectedOrder.id}
                  </h2>

                  <StatusBadge
                    status={
                      selectedOrder.status ||
                      "Pending"
                    }
                  />

                </div>

                <p>
                  Order details and customer information
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeViewModal}
                aria-label="Close modal"
              >
                <FiX />
              </button>

            </div>

            {/* Modal Body */}
            <div className="modal-body">

              {/* =================================================
                  CUSTOMER INFORMATION
              ================================================= */}

              <div className="order-detail-section">

                <div className="order-detail-section-title">

                  <FiUser />

                  <h3>
                    Customer Information
                  </h3>

                </div>

                <div className="order-info-grid">

                  <div className="order-info-item">

                    <span>Name</span>

                    <strong>
                      {getCustomerName(
                        selectedOrder
                      )}
                    </strong>

                  </div>

                  <div className="order-info-item">

                    <span>Email</span>

                    <strong>
                      {selectedOrder.email ||
                        "—"}
                    </strong>

                  </div>

                  <div className="order-info-item">

                    <span>Phone</span>

                    <strong>
                      {selectedOrder.phone ||
                        "—"}
                    </strong>

                  </div>

                  <div className="order-info-item">

                    <span>Order Date</span>

                    <strong>
                      {formatDate(
                        selectedOrder.date ||
                          selectedOrder.createdAt
                      )}
                    </strong>

                  </div>

                </div>

              </div>

              {/* =================================================
                  DELIVERY ADDRESS
              ================================================= */}

              <div className="order-detail-section">

                <div className="order-detail-section-title">

                  <FiMapPin />

                  <h3>
                    Delivery Address
                  </h3>

                </div>

                <div className="order-address-box">

                  <p>
                    {selectedOrder.address ||
                      selectedOrder.deliveryAddress ||
                      "No delivery address available."}
                  </p>

                  {selectedOrder.city && (

                    <span>
                      {selectedOrder.city}

                      {selectedOrder.state
                        ? `, ${selectedOrder.state}`
                        : ""}

                      {selectedOrder.pincode
                        ? ` - ${selectedOrder.pincode}`
                        : ""}
                    </span>

                  )}

                </div>

              </div>

              {/* =================================================
                  ORDER ITEMS
              ================================================= */}

              <div className="order-detail-section">

                <div className="order-detail-section-title">

                  <FiPackage />

                  <h3>
                    Order Items
                  </h3>

                </div>

                {getOrderItems(
                  selectedOrder
                ).length > 0 ? (

                  <div className="order-items-list">

                    {getOrderItems(
                      selectedOrder
                    ).map((item, index) => (

                      <div
                        className="order-item-row"
                        key={
                          item.id ||
                          item.productId ||
                          index
                        }
                      >

                        <div className="order-item-image">

                          {item.image ? (

                            <img
                              src={item.image}
                              alt={
                                item.name ||
                                "Product"
                              }
                            />

                          ) : (

                            <FiPackage />

                          )}

                        </div>

                        <div className="order-item-info">

                          <strong>
                            {item.name ||
                              item.productName ||
                              "Product"}
                          </strong>

                          <span>
                            Qty:{" "}
                            {item.quantity ??
                              item.qty ??
                              1}
                          </span>

                        </div>

                        <strong>

                          {formatCurrency(
                            Number(
                              item.price || 0
                            ) *
                              Number(
                                item.quantity ??
                                  item.qty ??
                                  1
                              )
                          )}

                        </strong>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="order-no-items">

                    <FiPackage />

                    <span>
                      Product item details are
                      not available for this demo
                      order.
                    </span>

                  </div>

                )}

              </div>

              {/* =================================================
                  PAYMENT & SUMMARY
              ================================================= */}

              <div className="order-summary-grid">

                <div className="order-payment-card">

                  <div className="order-detail-section-title">

                    <FiCreditCard />

                    <h3>
                      Payment
                    </h3>

                  </div>

                  <div className="payment-detail-row">

                    <span>
                      Method
                    </span>

                    <strong>
                      {getPaymentMethod(
                        selectedOrder
                      )}
                    </strong>

                  </div>

                  <div className="payment-detail-row">

                    <span>
                      Status
                    </span>

                    <strong className="payment-paid">

                      {selectedOrder.paymentStatus ||
                        "Paid"}

                    </strong>

                  </div>

                </div>

                <div className="order-total-card">

                  <span>
                    Order Total
                  </span>

                  <strong>

                    {formatCurrency(
                      getOrderTotal(
                        selectedOrder
                      )
                    )}

                  </strong>

                </div>

              </div>

              {/* =================================================
                  QUICK STATUS
              ================================================= */}

              <div className="order-detail-section">

                <div className="order-detail-section-title">

                  <FiTruck />

                  <h3>
                    Update Order Status
                  </h3>

                </div>

                <div className="quick-status-buttons">

                  <button
                    type="button"
                    className="quick-status pending"
                    onClick={() =>
                      quickStatusUpdate(
                        selectedOrder.id,
                        "Pending"
                      )
                    }
                  >
                    <FiClock />
                    Pending
                  </button>

                  <button
                    type="button"
                    className="quick-status processing"
                    onClick={() =>
                      quickStatusUpdate(
                        selectedOrder.id,
                        "Processing"
                      )
                    }
                  >
                    <FiPackage />
                    Processing
                  </button>

                  <button
                    type="button"
                    className="quick-status shipped"
                    onClick={() =>
                      quickStatusUpdate(
                        selectedOrder.id,
                        "Shipped"
                      )
                    }
                  >
                    <FiTruck />
                    Shipped
                  </button>

                  <button
                    type="button"
                    className="quick-status delivered"
                    onClick={() =>
                      quickStatusUpdate(
                        selectedOrder.id,
                        "Delivered"
                      )
                    }
                  >
                    <FiCheckCircle />
                    Delivered
                  </button>

                  <button
                    type="button"
                    className="quick-status cancelled"
                    onClick={() =>
                      quickStatusUpdate(
                        selectedOrder.id,
                        "Cancelled"
                      )
                    }
                  >
                    <FiXCircle />
                    Cancelled
                  </button>

                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeViewModal}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Orders;
