import { useState } from "react";
import "../styles/page/setting.css";
import {
  FiUser,
  FiSave,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";

function Settings() {
  const {
    profile,
    updateProfile,
    resetAdminData,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    role: profile?.role || "Administrator",
    address: profile?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [saving, setSaving] = useState(false);

  /* =========================================================
     FORM HANDLERS
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  /* =========================================================
     PROFILE UPDATE
  ========================================================= */

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setMessage({
        type: "error",
        text: "Admin name is required.",
      });

      return;
    }

    if (!formData.email.trim()) {
      setMessage({
        type: "error",
        text: "Email address is required.",
      });

      return;
    }

    setSaving(true);

    updateProfile({
      ...profile,
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    });

    setTimeout(() => {
      setSaving(false);

      setMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    }, 400);
  };

  /* =========================================================
     PASSWORD UPDATE
  ========================================================= */

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!passwordData.currentPassword) {
      setMessage({
        type: "error",
        text: "Enter your current password.",
      });

      return;
    }

    if (!passwordData.newPassword) {
      setMessage({
        type: "error",
        text: "Enter a new password.",
      });

      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "New password must contain at least 6 characters.",
      });

      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });

      return;
    }

    setSaving(true);

    /*
      NOTE:
      Current admin demo uses localStorage.
      Actual password backend authentication
      can be connected later with Node.js + MySQL.
    */

    setTimeout(() => {
      setSaving(false);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage({
        type: "success",
        text: "Password updated successfully.",
      });
    }, 500);
  };

  /* =========================================================
     RESET ADMIN DATA
  ========================================================= */

  const handleResetData = () => {
    const confirmed = window.confirm(
      "This will remove your current admin demo data and restore the default products, categories, deals and orders. Continue?"
    );

    if (!confirmed) {
      return;
    }

    resetAdminData();

    setMessage({
      type: "success",
      text: "Admin demo data has been restored.",
    });
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="admin-page settings-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div className="page-header-left">

          <div>

            {/* Router removed */}
            <div className="breadcrumb">
              <span>Admin</span>
              <span>/</span>
              <span>Settings</span>
            </div>

            <h1>Settings</h1>

            <p>
              Manage your administrator profile and account
              settings.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          SETTINGS LAYOUT
      ===================================================== */}

      <div className="settings-layout">

        {/* ===================================================
            SETTINGS SIDEBAR
        =================================================== */}

        <aside className="settings-sidebar">

          <div className="settings-profile-mini">

            <div className="settings-avatar">
              {formData.name
                ? formData.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </div>

            <div>

              <strong>
                {formData.name || "Administrator"}
              </strong>

              <span>
                {formData.role || "Administrator"}
              </span>

            </div>

          </div>

          {/* Settings Navigation */}

          <div className="settings-nav">

            <button
              type="button"
              className={
                activeTab === "profile"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveTab("profile");
                setMessage({
                  type: "",
                  text: "",
                });
              }}
            >
              <FiUser />
              <span>Profile</span>
            </button>

            <button
              type="button"
              className={
                activeTab === "security"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveTab("security");
                setMessage({
                  type: "",
                  text: "",
                });
              }}
            >
              <FiLock />
              <span>Security</span>
            </button>

            <button
              type="button"
              className={
                activeTab === "system"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveTab("system");
                setMessage({
                  type: "",
                  text: "",
                });
              }}
            >
              <FiShield />
              <span>System</span>
            </button>

          </div>

        </aside>

        {/* ===================================================
            SETTINGS CONTENT
        =================================================== */}

        <main className="settings-content">

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          {message.text && (
            <div
              className={`settings-message ${
                message.type
              }`}
            >

              {message.type === "success" ? (
                <FiCheckCircle />
              ) : (
                <FiAlertCircle />
              )}

              <span>
                {message.text}
              </span>

            </div>
          )}

          {/* =================================================
              PROFILE TAB
          ================================================= */}

          {activeTab === "profile" && (
            <div className="settings-section">

              <div className="settings-section-header">

                <div>

                  <h2>Admin Profile</h2>

                  <p>
                    Update your personal administrator
                    information.
                  </p>

                </div>

                <div className="settings-section-icon">
                  <FiUser />
                </div>

              </div>

              <form onSubmit={handleProfileSubmit}>

                <div className="settings-form-grid">

                  {/* Full Name */}

                  <div className="form-group">

                    <label htmlFor="admin-name">
                      Full Name
                    </label>

                    <div className="settings-input">

                      <FiUser />

                      <input
                        id="admin-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />

                    </div>

                  </div>

                  {/* Email */}

                  <div className="form-group">

                    <label htmlFor="admin-email">
                      Email Address
                    </label>

                    <div className="settings-input">

                      <FiMail />

                      <input
                        id="admin-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                      />

                    </div>

                  </div>

                  {/* Phone */}

                  <div className="form-group">

                    <label htmlFor="admin-phone">
                      Phone Number
                    </label>

                    <div className="settings-input">

                      <FiPhone />

                      <input
                        id="admin-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                      />

                    </div>

                  </div>

                  {/* Role */}

                  <div className="form-group">

                    <label htmlFor="admin-role">
                      Role
                    </label>

                    <div className="settings-input">

                      <FiShield />

                      <input
                        id="admin-role"
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Administrator"
                      />

                    </div>

                  </div>

                  {/* Address */}

                  <div className="form-group full-width">

                    <label htmlFor="admin-address">
                      Address
                    </label>

                    <div className="settings-input textarea-input">

                      <FiMapPin />

                      <textarea
                        id="admin-address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter admin/store address"
                      />

                    </div>

                  </div>

                </div>

                <div className="settings-form-footer">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >

                    <FiSave />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}

                  </button>

                </div>

              </form>

            </div>
          )}

          {/* =================================================
              SECURITY TAB
          ================================================= */}

          {activeTab === "security" && (
            <div className="settings-section">

              <div className="settings-section-header">

                <div>

                  <h2>Security</h2>

                  <p>
                    Manage your administrator account
                    security.
                  </p>

                </div>

                <div className="settings-section-icon">
                  <FiLock />
                </div>

              </div>

              <form onSubmit={handlePasswordSubmit}>

                <div className="security-info-box">

                  <FiShield />

                  <div>

                    <strong>
                      Keep your account secure
                    </strong>

                    <p>
                      Use a strong password containing
                      letters, numbers and special
                      characters.
                    </p>

                  </div>

                </div>

                <div className="settings-form-single">

                  {/* Current Password */}

                  <div className="form-group">

                    <label htmlFor="currentPassword">
                      Current Password
                    </label>

                    <div className="settings-input">

                      <FiLock />

                      <input
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        value={
                          passwordData.currentPassword
                        }
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                      />

                    </div>

                  </div>

                  {/* New Password */}

                  <div className="form-group">

                    <label htmlFor="newPassword">
                      New Password
                    </label>

                    <div className="settings-input">

                      <FiLock />

                      <input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        value={
                          passwordData.newPassword
                        }
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />

                    </div>

                    <div className="input-helper">
                      Minimum 6 characters.
                    </div>

                  </div>

                  {/* Confirm Password */}

                  <div className="form-group">

                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>

                    <div className="settings-input">

                      <FiLock />

                      <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={
                          passwordData.confirmPassword
                        }
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />

                    </div>

                  </div>

                </div>

                <div className="settings-form-footer">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >

                    <FiSave />

                    {saving
                      ? "Updating..."
                      : "Update Password"}

                  </button>

                </div>

              </form>

            </div>
          )}

          {/* =================================================
              SYSTEM TAB
          ================================================= */}

          {activeTab === "system" && (
            <div className="settings-section">

              <div className="settings-section-header">

                <div>

                  <h2>System Settings</h2>

                  <p>
                    Manage your local admin panel demo
                    environment.
                  </p>

                </div>

                <div className="settings-section-icon">
                  <FiShield />
                </div>

              </div>

              {/* Reset Demo Data */}

              <div className="system-setting-card">

                <div className="system-setting-icon">
                  <FiRefreshCw />
                </div>

                <div className="system-setting-content">

                  <h3>Reset Demo Data</h3>

                  <p>
                    Restore default products, categories,
                    deals and orders. This will remove
                    the changes currently stored in
                    localStorage.
                  </p>

                </div>

                <button
                  type="button"
                  className="btn btn-outline danger-button"
                  onClick={handleResetData}
                >
                  <FiRefreshCw />
                  Reset Data
                </button>

              </div>

              {/* Data Storage */}

              <div className="system-setting-card">

                <div className="system-setting-icon">
                  <FiShield />
                </div>

                <div className="system-setting-content">

                  <h3>Data Storage</h3>

                  <p>
                    The current admin panel stores demo
                    data in your browser localStorage.
                  </p>

                </div>

                <span className="storage-status">
                  Local Storage
                </span>

              </div>

              {/* Backend Integration */}

              <div className="system-setting-card">

                <div className="system-setting-icon">
                  <FiShield />
                </div>

                <div className="system-setting-content">

                  <h3>Backend Integration</h3>

                  <p>
                    Node.js, Express.js and MySQL can
                    be connected later for permanent
                    database storage.
                  </p>

                </div>

                <span className="coming-soon-badge">
                  Coming Soon
                </span>

              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default Settings;