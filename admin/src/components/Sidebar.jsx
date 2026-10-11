import { useEffect, useState } from "react";
import "../styles/components/siderbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiFolder,
  FiTag,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("gsm_admin_sidebar_collapsed") === "true";
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "gsm_admin_sidebar_collapsed",
      collapsed
    );
  }, [collapsed]);

  // Header ke mobile menu button se sidebar open/close
  useEffect(() => {
    const handleToggleSidebar = () => {
      setMobileOpen((prev) => !prev);
    };

    window.addEventListener(
      "admin-toggle-sidebar",
      handleToggleSidebar
    );

    return () => {
      window.removeEventListener(
        "admin-toggle-sidebar",
        handleToggleSidebar
      );
    };
  }, []);

  // Route change ke baad mobile sidebar close
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileOpen(false);
    };

    window.addEventListener(
      "admin-close-sidebar",
      handleRouteChange
    );

    return () => {
      window.removeEventListener(
        "admin-close-sidebar",
        handleRouteChange
      );
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("gsm_admin_profile");

    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: FiGrid,
      end: true,
    },
    {
      label: "Products",
      path: "/products",
      icon: FiPackage,
    },
    {
      label: "Categories",
      path: "/categories",
      icon: FiFolder,
    },
    {
      label: "Deals",
      path: "/deals",
      icon: FiTag,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: FiShoppingBag,
    },
  ];

  const bottomItems = [
    {
      label: "Settings",
      path: "/settings",
      icon: FiSettings,
    },
  ];

  const handleNavigation = () => {
    setMobileOpen(false);

    window.dispatchEvent(
      new CustomEvent("admin-close-sidebar")
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${
          collapsed ? "collapsed" : ""
        } ${mobileOpen ? "mobile-open" : ""}`}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <NavLink
            to="/"
            className="sidebar-brand"
            onClick={handleNavigation}
          >
            <div className="sidebar-logo">
              GS
            </div>

            {!collapsed && (
              <div className="sidebar-brand-text">
                <strong>Ghar Sansar</strong>
                <span>Mart Admin</span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse */}
          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <FiChevronRight />
            ) : (
              <FiChevronLeft />
            )}
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            {!collapsed && (
              <div className="sidebar-section-title">
                MAIN MENU
              </div>
            )}

            <div className="sidebar-menu">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "active" : ""
                      }`
                    }
                    title={collapsed ? item.label : ""}
                  >
                    <span className="sidebar-link-icon">
                      <Icon />
                    </span>

                    {!collapsed && (
                      <span className="sidebar-link-label">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Management */}
          <div className="sidebar-section">
            {!collapsed && (
              <div className="sidebar-section-title">
                MANAGEMENT
              </div>
            )}

            <div className="sidebar-menu">
              {bottomItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `sidebar-link ${
                        isActive ? "active" : ""
                      }`
                    }
                    title={collapsed ? item.label : ""}
                  >
                    <span className="sidebar-link-icon">
                      <Icon />
                    </span>

                    {!collapsed && (
                      <span className="sidebar-link-label">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                );
              })}

              <button
                type="button"
                className="sidebar-link sidebar-logout"
                onClick={handleLogout}
                title={collapsed ? "Logout" : ""}
              >
                <span className="sidebar-link-icon">
                  <FiLogOut />
                </span>

                {!collapsed && (
                  <span className="sidebar-link-label">
                    Logout
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="sidebar-footer">
            <div className="sidebar-footer-card">
              <div className="sidebar-footer-icon">
                🛒
              </div>

              <div>
                <strong>Ghar Sansar Mart</strong>
                <span>Admin Panel</span>
              </div>
            </div>

            <p>
              © {new Date().getFullYear()} Ghar Sansar Mart
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;