
import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiGrid,
  FiBox,
  FiLayers,
  FiTag,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiUser,
} from "react-icons/fi";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Deals from "./pages/Deals";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";



function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
      component: <Dashboard />,
    },
    {
      name: "Products",
      icon: <FiBox />,
      component: <Products />,
    },
    {
      name: "Categories",
      icon: <FiLayers />,
      component: <Categories />,
    },
    {
      name: "Deals",
      icon: <FiTag />,
      component: <Deals />,
    },
    {
      name: "Orders",
      icon: <FiShoppingBag />,
      component: <Orders />,
    },
  ];

  const handleMenuClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    const selectedMenu = menuItems.find(
      (item) => item.name === activePage
    );

    if (activePage === "Settings") {
      return <Settings />;
    }

    return selectedMenu?.component || <Dashboard />;
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("gsm_admin_logged_in");
    localStorage.removeItem("gsm_admin_user");

    window.location.reload();
  };

  return (
    <div className="admin-app">

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* Logo */}

        <div className="sidebar-logo">

          <div className="logo-icon">
            GS
          </div>

          <div className="logo-content">
            <h2>Ghar Sansar</h2>
            <span>Mart Admin</span>
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>

        </div>


        {/* Navigation */}

        <nav className="sidebar-navigation">

          <p className="navigation-title">
            MAIN MENU
          </p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`sidebar-menu-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleMenuClick(item.name)
              }
            >

              <span className="menu-icon">
                {item.icon}
              </span>

              <span className="menu-name">
                {item.name}
              </span>

              {activePage === item.name && (
                <FiChevronRight className="menu-arrow" />
              )}

            </button>
          ))}


          <p className="navigation-title settings-title">
            SYSTEM
          </p>

          <button
            className={`sidebar-menu-item ${
              activePage === "Settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleMenuClick("Settings")
            }
          >

            <span className="menu-icon">
              <FiSettings />
            </span>

            <span className="menu-name">
              Settings
            </span>

            {activePage === "Settings" && (
              <FiChevronRight className="menu-arrow" />
            )}

          </button>

        </nav>


        {/* Sidebar Bottom */}

        <div className="sidebar-bottom">

          <div className="admin-profile">

            <div className="profile-avatar">
              <FiUser />
            </div>

            <div className="profile-info">
              <strong>Administrator</strong>
              <span>Super Admin</span>
            </div>

          </div>


          <button
            className="logout-button"
            onClick={handleLogout}
          >

            <FiLogOut />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="admin-main">


        {/* =================================================
            HEADER
        ================================================== */}

        <header className="admin-header">

          <div className="header-left">

            <button
              className="mobile-menu-btn"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FiMenu />
            </button>


            <div className="breadcrumb">

              <span>
                Admin
              </span>

              <FiChevronRight />

              <strong>
                {activePage}
              </strong>

            </div>

          </div>


          <div className="header-right">

            <div className="header-admin">

              <div className="header-avatar">
                <FiUser />
              </div>

              <div className="header-user-info">
                <strong>
                  Admin
                </strong>

                <span>
                  Online
                </span>
              </div>

            </div>

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main className="admin-content">

          <div className="page-heading">

            <div>
              <h1>
                {activePage}
              </h1>

              <p>
                Manage your Ghar Sansar Mart
                {activePage === "Dashboard"
                  ? " dashboard"
                  : ` ${activePage.toLowerCase()}`}
                .
              </p>
            </div>

          </div>


          {/* Dynamic Page */}

          <div className="page-container">
            {renderPage()}
          </div>

        </main>


        {/* =================================================
            FOOTER
        ================================================== */}

        <footer className="admin-footer">

          <span>
            © {new Date().getFullYear()} Ghar Sansar Mart
          </span>

          <span>
            Admin Panel
          </span>

        </footer>

      </div>

    </div>
  );
}

export default App;
