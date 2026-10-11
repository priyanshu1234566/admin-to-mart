import {
  FiBell,
  FiSearch,
  FiUser,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";


import { useState } from "react";

import "../styles/components/header.css";

function Header() {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    console.log("Admin search:", value);
  };

  return (
    <header className="admin-header">
      {/* Left Section */}
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-mobile-menu"
          aria-label="Open menu"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("admin-toggle-sidebar")
            );
          }}
        >
          <FiMenu />
        </button>

        <div className="admin-page-heading">
          <span className="admin-page-label">
            Ghar Sansar Mart
          </span>

          <h1>Admin Dashboard</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="admin-header-right">
        {/* Search */}
        <form
          className="admin-header-search"
          onSubmit={handleSearch}
        >
          <FiSearch />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="admin-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>

        {/* Notification */}
        <button
          type="button"
          className="admin-header-icon-btn"
          title="Notifications"
          aria-label="Notifications"
        >
          <FiBell />

          <span className="notification-dot" />
        </button>

        {/* Profile */}
        <div className="admin-profile-wrapper">
          <button
            type="button"
            className="admin-profile-btn"
            onClick={() =>
              setProfileOpen((previous) => !previous)
            }
          >
            <div className="admin-avatar">
              A
            </div>

            <div className="admin-profile-info">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

            <FiChevronDown
              className={
                profileOpen
                  ? "profile-chevron rotate"
                  : "profile-chevron"
              }
            />
          </button>

          {profileOpen && (
            <div className="admin-profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="admin-avatar large">
                  A
                </div>

                <div>
                  <strong>Admin</strong>
                  <span>admin@gharsansarmart.com</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  window.location.href = "/settings";
                }}
              >
                <FiUser />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  window.location.href = "/settings";
                }}
              >
                ⚙️
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
