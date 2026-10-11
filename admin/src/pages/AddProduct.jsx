import { useState } from "react";
import "../styles/pages/addproduct.css";
import {
  FiArrowLeft,
  FiImage,
  FiSave,
  FiPackage,
  FiEye,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";

function AddProduct() {
  const {
    addProduct,
    categories = [],
  } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    oldPrice: "",
    stock: "",
    unit: "1 Piece",
    image: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  /* =======================================================
     HANDLE INPUT
  ======================================================= */

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

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Enter a valid product price.";
    }

    if (
      formData.oldPrice !== "" &&
      Number(formData.oldPrice) <
        Number(formData.price)
    ) {
      newErrors.oldPrice =
        "Old price should be greater than current price.";
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock =
        "Enter a valid stock quantity.";
    }

    if (formData.description.length > 500) {
      newErrors.description =
        "Description cannot exceed 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     SUBMIT FORM
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    const newProduct = addProduct({
      ...formData,

      name: formData.name.trim(),

      price: Number(formData.price),

      oldPrice:
        formData.oldPrice === ""
          ? 0
          : Number(formData.oldPrice),

      stock: Number(formData.stock),

      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500",

      description:
        formData.description.trim() ||
        "No product description available.",
    });

    if (newProduct) {
      /*
        Router removed.

        App.jsx uses state-based navigation.
        Dispatch custom event so App can switch
        back to Products page.
      */

      setTimeout(() => {
        setSaving(false);

        window.dispatchEvent(
          new CustomEvent("admin:navigate", {
            detail: {
              page: "Products",
            },
          })
        );
      }, 500);
    } else {
      setSaving(false);

      setErrors({
        submit:
          "Unable to add product. Please try again.",
      });
    }
  };

  /* =======================================================
     RESET FORM
  ======================================================= */

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear this form?"
    );

    if (!confirmed) {
      return;
    }

    setFormData({
      name: "",
      category: "",
      subCategory: "",
      price: "",
      oldPrice: "",
      stock: "",
      unit: "1 Piece",
      image: "",
      description: "",
      status: "Active",
    });

    setErrors({});
  };

  /* =======================================================
     BACK TO PRODUCTS
  ======================================================= */

  const handleBackToProducts = () => {
    window.dispatchEvent(
      new CustomEvent("admin:navigate", {
        detail: {
          page: "Products",
        },
      })
    );
  };

  return (
    <div className="admin-page add-product-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="add-product-header">

        <div className="add-product-heading">

          <button
            type="button"
            className="back-page-btn"
            onClick={handleBackToProducts}
            aria-label="Back to products"
          >
            <FiArrowLeft />
          </button>

          <div>

            <span className="dashboard-eyebrow">
              PRODUCT MANAGEMENT
            </span>

            <h2>
              Add New Product
            </h2>

            <p>
              Add a new product to your Ghar
              Sansar Mart store.
            </p>

          </div>

        </div>

        <div className="add-product-header-icon">
          <FiPackage />
        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        <div className="product-form-layout">

          {/* =============================================
              LEFT COLUMN
          ============================================= */}

          <div className="product-form-main">

            {/* =========================================
                BASIC INFORMATION
            ========================================= */}

            <section className="product-form-card">

              <div className="product-form-card-header">

                <div>

                  <span>
                    STEP 01
                  </span>

                  <h3>
                    Basic Information
                  </h3>

                  <p>
                    Enter the basic details of
                    your product.
                  </p>

                </div>

              </div>

              <div className="product-form-body">

                {/* PRODUCT NAME */}

                <div className="form-group full">

                  <label htmlFor="name">
                    Product Name
                    <span>*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Premium Basmati Rice 5kg"
                    value={formData.name}
                    onChange={handleChange}
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

                {/* CATEGORY */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="category">
                      Category
                      <span>*</span>
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={
                        errors.category
                          ? "input-error"
                          : ""
                      }
                    >

                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category.id}
                            value={category.name}
                          >
                            {category.name}
                          </option>
                        )
                      )}

                    </select>

                    {errors.category && (
                      <small className="form-error">
                        {errors.category}
                      </small>
                    )}

                  </div>

                  {/* SUB CATEGORY */}

                  <div className="form-group">

                    <label htmlFor="subCategory">
                      Sub Category
                    </label>

                    <input
                      id="subCategory"
                      name="subCategory"
                      type="text"
                      placeholder="e.g. Staples"
                      value={
                        formData.subCategory
                      }
                      onChange={handleChange}
                    />

                  </div>

                </div>

                {/* UNIT */}

                <div className="form-group">

                  <label htmlFor="unit">
                    Product Unit
                  </label>

                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >

                    <option value="1 Piece">
                      1 Piece
                    </option>

                    <option value="500 g">
                      500 g
                    </option>

                    <option value="1 kg">
                      1 kg
                    </option>

                    <option value="2 kg">
                      2 kg
                    </option>

                    <option value="5 kg">
                      5 kg
                    </option>

                    <option value="1 L">
                      1 L
                    </option>

                    <option value="5 L">
                      5 L
                    </option>

                    <option value="Pack">
                      Pack
                    </option>

                    <option value="Set">
                      Set
                    </option>

                  </select>

                </div>

                {/* DESCRIPTION */}

                <div className="form-group full">

                  <label htmlFor="description">
                    Product Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    maxLength="500"
                    placeholder="Write a short description about this product..."
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                  />

                  <div className="textarea-counter">

                    {formData.description.length}
                    / 500 characters

                  </div>

                  {errors.description && (
                    <small className="form-error">
                      {errors.description}
                    </small>
                  )}

                </div>

              </div>

            </section>

            {/* =========================================
                PRICING & INVENTORY
            ========================================= */}

            <section className="product-form-card">

              <div className="product-form-card-header">

                <div>

                  <span>
                    STEP 02
                  </span>

                  <h3>
                    Pricing & Inventory
                  </h3>

                  <p>
                    Set product price and available
                    stock.
                  </p>

                </div>

              </div>

              <div className="product-form-body">

                {/* PRICE */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="price">
                      Selling Price
                      <span>*</span>
                    </label>

                    <div className="input-with-prefix">

                      <span>₹</span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        className={
                          errors.price
                            ? "input-error"
                            : ""
                        }
                      />

                    </div>

                    {errors.price && (
                      <small className="form-error">
                        {errors.price}
                      </small>
                    )}

                  </div>

                  {/* OLD PRICE */}

                  <div className="form-group">

                    <label htmlFor="oldPrice">
                      MRP / Old Price
                    </label>

                    <div className="input-with-prefix">

                      <span>₹</span>

                      <input
                        id="oldPrice"
                        name="oldPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={
                          formData.oldPrice
                        }
                        onChange={handleChange}
                        className={
                          errors.oldPrice
                            ? "input-error"
                            : ""
                        }
                      />

                    </div>

                    {errors.oldPrice && (
                      <small className="form-error">
                        {errors.oldPrice}
                      </small>
                    )}

                  </div>

                </div>

                {/* STOCK */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="stock">
                      Stock Quantity
                      <span>*</span>
                    </label>

                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      placeholder="e.g. 50"
                      value={formData.stock}
                      onChange={handleChange}
                      className={
                        errors.stock
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.stock && (
                      <small className="form-error">
                        {errors.stock}
                      </small>
                    )}

                  </div>

                  <div className="form-group">

                    <label htmlFor="status">
                      Product Status
                    </label>

                    <select
                      id="status"
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

                </div>

              </div>

            </section>

            {/* =========================================
                PRODUCT IMAGE
            ========================================= */}

            <section className="product-form-card">

              <div className="product-form-card-header">

                <div>

                  <span>
                    STEP 03
                  </span>

                  <h3>
                    Product Image
                  </h3>

                  <p>
                    Add a product image URL.
                  </p>

                </div>

              </div>

              <div className="product-form-body">

                <div className="form-group full">

                  <label htmlFor="image">
                    Image URL
                  </label>

                  <div className="input-with-icon">

                    <FiImage />

                    <input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="https://example.com/product-image.jpg"
                      value={formData.image}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                {/* IMAGE PREVIEW */}

                {formData.image && (
                  <div className="product-image-preview">

                    <span>
                      Preview
                    </span>

                    <img
                      src={formData.image}
                      alt="Product preview"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>
                )}

              </div>

            </section>

          </div>

          {/* =============================================
              RIGHT COLUMN
          ============================================= */}

          <aside className="product-form-sidebar">

            {/* LIVE PREVIEW */}

            <section className="product-preview-card">

              <div className="product-preview-header">

                <span>
                  LIVE PREVIEW
                </span>

                <FiEye />

              </div>

              <div className="product-preview-image">

                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={
                      formData.name ||
                      "Product preview"
                    }
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500";
                    }}
                  />
                ) : (
                  <div className="preview-placeholder">

                    <FiImage />

                    <span>
                      Product image
                    </span>

                  </div>
                )}

              </div>

              <div className="product-preview-content">

                <span className="preview-category">
                  {formData.category ||
                    "Category"}
                </span>

                <h3>
                  {formData.name ||
                    "Product Name"}
                </h3>

                <p>
                  {formData.description ||
                    "Product description will appear here."}
                </p>

                <div className="preview-price">

                  <strong>
                    ₹
                    {formData.price
                      ? Number(
                          formData.price
                        ).toLocaleString(
                          "en-IN"
                        )
                      : "0"}
                  </strong>

                  {formData.oldPrice && (
                    <span>
                      ₹
                      {Number(
                        formData.oldPrice
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  )}

                </div>

                <div className="preview-stock">

                  <span>
                    Stock
                  </span>

                  <strong>
                    {formData.stock || 0}{" "}
                    {formData.unit}
                  </strong>

                </div>

              </div>

            </section>

            {/* HELP CARD */}

            <div className="product-form-help">

              <div className="help-icon">
                💡
              </div>

              <div>

                <strong>
                  Product Tip
                </strong>

                <p>
                  Use a clear, high-quality
                  product image and keep the
                  product name short and
                  descriptive.
                </p>

              </div>

            </div>

          </aside>

        </div>

        {/* =================================================
            FORM ACTIONS
        ================================================= */}

        <div className="product-form-actions">

          <button
            type="button"
            className="form-cancel-btn"
            onClick={handleBackToProducts}
          >
            Cancel
          </button>

          <button
            type="button"
            className="form-reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            type="submit"
            className="form-save-btn"
            disabled={saving}
          >

            {saving ? (
              <>
                <span className="button-spinner" />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                Save Product
              </>
            )}

          </button>

        </div>

        {/* SUBMIT ERROR */}

        {errors.submit && (
          <div className="form-submit-error">
            {errors.submit}
          </div>
        )}

      </form>

    </div>
  );
}

export default AddProduct;