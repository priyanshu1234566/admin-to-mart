
import { useMemo, useState } from "react";
import "../styles/page/deals.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiCalendar,
  FiPercent,
  FiX,
  FiSave,
  FiPackage,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";

function Deals() {
  const {
    deals = [],
    products = [],
    addDeal,
    updateDeal,
    deleteDeal,
  } = useAdmin();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discount: "",
    type: "Percentage",
    startDate: "",
    endDate: "",
    productIds: [],
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  /* =========================================================
     FILTER DEALS
  ========================================================= */

  const filteredDeals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesSearch =
        !query ||
        [
          deal.name,
          deal.description,
          deal.type,
          deal.status,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query)
          );

      const matchesStatus =
        statusFilter === "All" ||
        deal.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [deals, search, statusFilter]);

  /* =========================================================
     DEAL STATS
  ========================================================= */

  const totalDeals = deals.length;

  const activeDeals = deals.filter(
    (deal) => deal.status === "Active"
  ).length;

  const inactiveDeals = deals.filter(
    (deal) => deal.status === "Inactive"
  ).length;

  /* =========================================================
     OPEN ADD MODAL
  ========================================================= */

  const openAddModal = () => {
    setEditingDeal(null);

    setFormData({
      name: "",
      description: "",
      discount: "",
      type: "Percentage",
      startDate: "",
      endDate: "",
      productIds: [],
      status: "Active",
    });

    setErrors({});
    setShowModal(true);
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const openEditModal = (deal) => {
    setEditingDeal(deal);

    setFormData({
      name: deal.name || "",
      description: deal.description || "",
      discount: deal.discount ?? "",
      type: deal.type || "Percentage",
      startDate: deal.startDate || "",
      endDate: deal.endDate || "",
      productIds: Array.isArray(deal.productIds)
        ? deal.productIds
        : [],
      status: deal.status || "Active",
    });

    setErrors({});
    setShowModal(true);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingDeal(null);
    setErrors({});
  };

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  /* =========================================================
     PRODUCT SELECT
  ========================================================= */

  const handleProductToggle = (productId) => {
    setFormData((previous) => {
      const exists = previous.productIds.includes(productId);

      return {
        ...previous,
        productIds: exists
          ? previous.productIds.filter(
              (id) => id !== productId
            )
          : [...previous.productIds, productId],
      };
    });

    if (errors.productIds) {
      setErrors((previous) => ({
        ...previous,
        productIds: "",
      }));
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Deal name is required.";
    }

    if (
      formData.discount === "" ||
      Number(formData.discount) <= 0
    ) {
      newErrors.discount =
        "Enter a valid discount value.";
    }

    if (
      formData.type === "Percentage" &&
      Number(formData.discount) > 100
    ) {
      newErrors.discount =
        "Percentage discount cannot exceed 100%.";
    }

    if (!formData.startDate) {
      newErrors.startDate =
        "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate =
        "End date is required.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate =
        "End date cannot be before start date.";
    }

    if (formData.productIds.length === 0) {
      newErrors.productIds =
        "Select at least one product.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     SUBMIT DEAL
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dealData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      discount: Number(formData.discount),
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      productIds: formData.productIds,
      status: formData.status,
    };

    if (editingDeal) {
      updateDeal(editingDeal.id, {
        ...editingDeal,
        ...dealData,
      });
    } else {
      addDeal(dealData);
    }

    closeModal();
  };

  /* =========================================================
     DELETE DEAL
  ========================================================= */

  const handleDelete = (deal) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${deal.name}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteDeal(deal.id);
  };

  /* =========================================================
     GET PRODUCT NAMES
  ========================================================= */

  const getProductNames = (productIds = []) => {
    const selectedProducts = products.filter((product) =>
      productIds.includes(product.id)
    );

    if (selectedProducts.length === 0) {
      return "No products";
    }

    if (selectedProducts.length <= 2) {
      return selectedProducts
        .map((product) => product.name)
        .join(", ");
    }

    return `${selectedProducts[0].name}, ${
      selectedProducts[1].name
    } +${selectedProducts.length - 2} more`;
  };

  /* =========================================================
     DISCOUNT TEXT
  ========================================================= */

  const getDiscountText = (deal) => {
    if (deal.type === "Percentage") {
      return `${deal.discount}% OFF`;
    }

    return `₹${Number(
      deal.discount || 0
    ).toLocaleString("en-IN")} OFF`;
  };

  return (
    <div className="admin-page deals-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div className="page-header-left">

          <div>
            <div className="breadcrumb">
              <span>Admin</span>
              <span>/</span>
              <span>Deals</span>
            </div>

            <h1>Deals & Offers</h1>

            <p>
              Create and manage special offers for your
              customers.
            </p>
          </div>

        </div>

        <div className="page-header-actions">

          <button
            type="button"
            className="btn btn-primary"
            onClick={openAddModal}
          >
            <FiPlus />
            Create Deal
          </button>

        </div>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="stats-grid deals-stats">

        <div className="deal-stat-card">

          <div className="deal-stat-icon">
            <FiTag />
          </div>

          <div>
            <span>Total Deals</span>
            <strong>{totalDeals}</strong>
          </div>

        </div>

        <div className="deal-stat-card">

          <div className="deal-stat-icon">
            <FiTag />
          </div>

          <div>
            <span>Active Deals</span>
            <strong>{activeDeals}</strong>
          </div>

        </div>

        <div className="deal-stat-card">

          <div className="deal-stat-icon">
            <FiCalendar />
          </div>

          <div>
            <span>Inactive Deals</span>
            <strong>{inactiveDeals}</strong>
          </div>

        </div>

        <div className="deal-stat-card">

          <div className="deal-stat-icon">
            <FiPackage />
          </div>

          <div>
            <span>Products Available</span>
            <strong>{products.length}</strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          DEALS CONTENT
      ===================================================== */}

      <div className="content-card">

        {/* Toolbar */}
        <div className="content-card-toolbar">

          <div>
            <h2>All Deals</h2>

            <p>
              {filteredDeals.length} deals found
            </p>
          </div>

          <div className="deals-toolbar-controls">

            <div className="toolbar-search">

              <FiSearch />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search deals..."
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

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {filteredDeals.length === 0 ? (
          <div className="deals-empty">

            <div className="deals-empty-icon">
              <FiTag />
            </div>

            <h3>No Deals Found</h3>

            <p>
              {search || statusFilter !== "All"
                ? "Try changing your search or filters."
                : "Create your first deal to start offering discounts."}
            </p>

            {!search &&
              statusFilter === "All" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openAddModal}
                >
                  <FiPlus />
                  Create Deal
                </button>
              )}

          </div>
        ) : (

          /* =================================================
             DEAL GRID
          ================================================= */

          <div className="deals-grid">

            {filteredDeals.map((deal) => (

              <div
                className="deal-management-card"
                key={deal.id}
              >

                {/* Deal Header */}
                <div className="deal-card-header">

                  <div className="deal-tag-icon">
                    <FiTag />
                  </div>

                  <span
                    className={`deal-status ${
                      deal.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {deal.status}
                  </span>

                </div>

                {/* Discount */}
                <div className="deal-discount">

                  <strong>
                    {getDiscountText(deal)}
                  </strong>

                  <span>
                    Special Offer
                  </span>

                </div>

                {/* Content */}
                <div className="deal-card-content">

                  <h3>{deal.name}</h3>

                  <p>
                    {deal.description ||
                      "Special offer for selected products."}
                  </p>

                  {/* Dates */}
                  <div className="deal-date-row">

                    <div>
                      <span>
                        <FiCalendar />
                        Start
                      </span>

                      <strong>
                        {deal.startDate || "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        <FiCalendar />
                        End
                      </span>

                      <strong>
                        {deal.endDate || "—"}
                      </strong>
                    </div>

                  </div>

                  {/* Products */}
                  <div className="deal-products">

                    <div className="deal-products-title">
                      <FiPackage />

                      <span>
                        Products (
                        {deal.productIds?.length || 0})
                      </span>
                    </div>

                    <p>
                      {getProductNames(
                        deal.productIds || []
                      )}
                    </p>

                  </div>

                </div>

                {/* Actions */}
                <div className="deal-card-footer">

                  <button
                    type="button"
                    className="deal-action edit"
                    onClick={() =>
                      openEditModal(deal)
                    }
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="deal-action delete"
                    onClick={() =>
                      handleDelete(deal)
                    }
                  >
                    <FiTrash2 />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="deal-modal">

            {/* Modal Header */}
            <div className="modal-header">

              <div>
                <h2>
                  {editingDeal
                    ? "Edit Deal"
                    : "Create New Deal"}
                </h2>

                <p>
                  {editingDeal
                    ? "Update your promotional offer."
                    : "Create a new promotional offer."}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FiX />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="modal-body">

                {/* =================================================
                    DEAL NAME
                ================================================= */}

                <div className="form-group">

                  <label htmlFor="deal-name">
                    Deal Name <span>*</span>
                  </label>

                  <input
                    id="deal-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Diwali Special Sale"
                    className={
                      errors.name
                        ? "input-error"
                        : ""
                    }
                  />

                  {errors.name && (
                    <small className="form-error">
                      {errors.name}
                    </small>
                  )}

                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div className="form-group">

                  <label htmlFor="deal-description">
                    Description
                  </label>

                  <textarea
                    id="deal-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe this offer..."
                    rows="3"
                  />

                </div>

                {/* =================================================
                    DISCOUNT
                ================================================= */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="deal-type">
                      Discount Type
                    </label>

                    <select
                      id="deal-type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Percentage">
                        Percentage
                      </option>

                      <option value="Fixed">
                        Fixed Amount
                      </option>
                    </select>

                  </div>

                  <div className="form-group">

                    <label htmlFor="deal-discount">
                      Discount <span>*</span>
                    </label>

                    <div className="input-with-prefix">

                      <span>
                        {formData.type ===
                        "Percentage"
                          ? "%"
                          : "₹"}
                      </span>

                      <input
                        id="deal-discount"
                        type="number"
                        name="discount"
                        min="0"
                        step="0.01"
                        value={formData.discount}
                        onChange={handleChange}
                        placeholder="10"
                        className={
                          errors.discount
                            ? "input-error"
                            : ""
                        }
                      />

                    </div>

                    {errors.discount && (
                      <small className="form-error">
                        {errors.discount}
                      </small>
                    )}

                  </div>

                </div>

                {/* =================================================
                    DATES
                ================================================= */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="deal-start">
                      Start Date <span>*</span>
                    </label>

                    <input
                      id="deal-start"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={
                        errors.startDate
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.startDate && (
                      <small className="form-error">
                        {errors.startDate}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label htmlFor="deal-end">
                      End Date <span>*</span>
                    </label>

                    <input
                      id="deal-end"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={
                        errors.endDate
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.endDate && (
                      <small className="form-error">
                        {errors.endDate}
                      </small>
                    )}

                  </div>

                </div>

                {/* =================================================
                    STATUS
                ================================================= */}

                <div className="form-group">

                  <label htmlFor="deal-status">
                    Status
                  </label>

                  <select
                    id="deal-status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <div className="form-group">

                  <label>
                    Select Products <span>*</span>
                  </label>

                  <div
                    className={`deal-product-selector ${
                      errors.productIds
                        ? "selector-error"
                        : ""
                    }`}
                  >

                    {products.length === 0 ? (
                      <div className="no-products">
                        No products available.
                      </div>
                    ) : (

                      products.map((product) => {

                        const selected =
                          formData.productIds.includes(
                            product.id
                          );

                        return (
                          <label
                            className={`deal-product-option ${
                              selected
                                ? "selected"
                                : ""
                            }`}
                            key={product.id}
                          >

                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() =>
                                handleProductToggle(
                                  product.id
                                )
                              }
                            />

                            <span className="deal-product-check">
                              {selected ? "✓" : ""}
                            </span>

                            <span className="deal-product-info">

                              <strong>
                                {product.name}
                              </strong>

                              <small>
                                ₹
                                {Number(
                                  product.price || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}{" "}
                                · Stock:{" "}
                                {product.stock ?? 0}
                              </small>

                            </span>

                          </label>
                        );
                      })

                    )}

                  </div>

                  {errors.productIds && (
                    <small className="form-error">
                      {errors.productIds}
                    </small>
                  )}

                  <div className="input-helper">
                    {formData.productIds.length}{" "}
                    product(s) selected.
                  </div>

                </div>

                {/* =================================================
                    PREVIEW
                ================================================= */}

                <div className="deal-form-preview">

                  <div className="deal-form-preview-icon">
                    <FiPercent />
                  </div>

                  <div className="deal-form-preview-content">

                    <strong>
                      {formData.name ||
                        "Your Deal Name"}
                    </strong>

                    <span>
                      {formData.type ===
                      "Percentage"
                        ? `${formData.discount || 0}% OFF`
                        : `₹${
                            formData.discount || 0
                          } OFF`}
                    </span>

                  </div>

                  <div className="deal-form-preview-count">
                    {formData.productIds.length}{" "}
                    products
                  </div>

                </div>

              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <FiSave />

                  {editingDeal
                    ? "Update Deal"
                    : "Create Deal"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Deals;