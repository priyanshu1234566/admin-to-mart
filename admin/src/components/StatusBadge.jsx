
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiXCircle,
  FiPackage,
  FiLoader,
  FiInfo,
} from "react-icons/fi";
import "../styles/components/statusbadge.css";

// =========================================================
// STATUS BADGE
// Reusable status component for Admin Panel
// =========================================================

function StatusBadge({
  status = "Unknown",
}) {
  // -------------------------------------------------------
  // NORMALIZE STATUS
  // -------------------------------------------------------

  const normalizedStatus = String(
    status || "Unknown"
  )
    .trim()
    .toLowerCase();


  // -------------------------------------------------------
  // STATUS CONFIGURATION
  // -------------------------------------------------------

  const statusConfig = {

    active: {
      label: "Active",
      className: "active",
      icon: <FiCheckCircle />,
    },

    inactive: {
      label: "Inactive",
      className: "inactive",
      icon: <FiXCircle />,
    },

    "in stock": {
      label: "In Stock",
      className: "in-stock",
      icon: <FiCheckCircle />,
    },

    "low stock": {
      label: "Low Stock",
      className: "low-stock",
      icon: <FiAlertTriangle />,
    },

    "out of stock": {
      label: "Out of Stock",
      className: "out-of-stock",
      icon: <FiXCircle />,
    },

    pending: {
      label: "Pending",
      className: "pending",
      icon: <FiClock />,
    },

    processing: {
      label: "Processing",
      className: "processing",
      icon: <FiLoader />,
    },

    completed: {
      label: "Completed",
      className: "completed",
      icon: <FiCheckCircle />,
    },

    delivered: {
      label: "Delivered",
      className: "delivered",
      icon: <FiCheckCircle />,
    },

    cancelled: {
      label: "Cancelled",
      className: "cancelled",
      icon: <FiXCircle />,
    },

    canceled: {
      label: "Cancelled",
      className: "cancelled",
      icon: <FiXCircle />,
    },

    shipped: {
      label: "Shipped",
      className: "shipped",
      icon: <FiPackage />,
    },

    confirmed: {
      label: "Confirmed",
      className: "confirmed",
      icon: <FiCheckCircle />,
    },

    new: {
      label: "New",
      className: "new",
      icon: <FiInfo />,
    },

  };


  // -------------------------------------------------------
  // GET CONFIG
  // -------------------------------------------------------

  const config =
    statusConfig[normalizedStatus] || {
      label: status || "Unknown",
      className: "unknown",
      icon: <FiInfo />,
    };


  // -------------------------------------------------------
  // JSX
  // -------------------------------------------------------

  return (
    <span
      className={`status-badge ${config.className}`}
    >

      <span className="status-badge-icon">
        {config.icon}
      </span>

      <span className="status-badge-text">
        {config.label}
      </span>

    </span>
  );
}

export default StatusBadge;
