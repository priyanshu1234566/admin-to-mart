import { useEffect, useState } from "react";
import ".../styles/pages/editproduct.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiPackage,
  FiImage,
  FiEye,
  FiRefreshCw,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById, updateProduct } = useAdmin();

  const [product, setProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    oldPrice: "",
    stock: "",
    unit: "",
    image: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existingProduct = getProductById(id);

    if (!existingProduct) {
      navigate("/products", { replace: true });
      return;
    }

    setProduct(existingProduct);

    setFormData({
      name: existingProduct.name || "",
      category: existingProduct.category || "",
      subCategory: existingProduct.subCategory || "",
      price: existingProduct.price ?? "",
      oldPrice: existingProduct.oldPrice ?? "",
      stock: existingProduct.stock ?? "",
      unit: existingProduct.unit || "",
      image: existingProduct.image || "",
      description: existingProduct.description || "",
      status: existingProduct.status || "Active",
    });
  }, [id, getProductById, navigate]);

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
      Number(formData.oldPrice) < Number(formData.price)
    ) {
      newErrors.oldPrice =
        "Old price should be greater than or equal to current price.";
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Enter a valid stock quantity.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    const updatedProduct = {
      ...product,

      name: formData.name.trim(),
      category: formData.category,
      subCategory: formData.subCategory.trim(),

      price: Number(formData.price),

      oldPrice:
        formData.oldPrice === ""
          ? Number(formData.price)
          : Number(formData.oldPrice),

      stock: Number(formData.stock),

      unit: formData.unit.trim(),

      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",

      description:
        formData.description.trim() ||
        "Quality product from Ghar Sansar Mart.",

      status: formData.status,
    };

    updateProduct(id, updatedProduct);

    setTimeout(() => {
      setSaving(false);
      navigate("/products");
    }, 400);
  };

  const handleReset = () => {
    if (!product) return;

    const confirmed = window.confirm(
      "Are you sure you want to reset all changes?"
    );

    if (!confirmed) return;

    setFormData({
      name: product.name || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      stock: product.stock ?? "",
      unit: product.unit || "",
      image: product.image || "",
      description: product.description || "",
      status: product.status || "Active",
    });

    setErrors({});
  };

  if (!product) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="admin-page edit-product-page">

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <Link
            to="/products"
            className="back-button"
            title="Back to Products"
          >
            <FiArrowLeft />
          </Link>

          <div>
            <div className="breadcrumb">
              <Link to="/">Dashboard</Link>
              <span>/</span>
              <Link to="/products">Products</Link>
              <span>/</span>
              <span>Edit Product</span>
            </div>

            <h1>Edit Product</h1>

            <p>
              Update product information, pricing and inventory.
            </p>
          </div>
        </div>

        <div className="page-header-actions">
          <span className="product-id-badge">
            ID: {product.id}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-layout">

          {/* Main Form */}
          <div className="form-main">

            {/* Basic Information */}
            <section className="form-card">

              <div className="form-card-header">
                <div>
                  <h2>Basic Information</h2>
                  <p>
                    Update the basic details of your product.
                  </p>
                </div>

                <div className="form-card-icon">
                  <FiPackage />
                </div>
              </div>

              <div className="form-card-body">

                {/* Product Name */}
                <div className="form-group full-width">
                  <label htmlFor="name">
                    Product Name <span>*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className={errors.name ? "input-error" : ""}
                  />

                  {errors.name && (
                    <small className="form-error">
                      {errors.name}
                    </small>
                  )}
                </div>

                {/* Category */}
                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="category">
                      Category <span>*</span>
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={
                        errors.category ? "input-error" : ""
                      }
                    >
                      <option value="">
                        Select Category
                      </option>

                      <option value="Grocery">
                        Grocery
                      </option>

                      <option value="Home & Kitchen">
                        Home & Kitchen
                      </option>
                    </select>

                    {errors.category && (
                      <small className="form-error">
                        {errors.category}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subCategory">
                      Sub Category
                    </label>

                    <input
                      id="subCategory"
                      type="text"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      placeholder="e.g. Kitchen, Snacks"
                    />
                  </div>

                </div>

                {/* Unit */}
                <div className="form-group">
                  <label htmlFor="unit">
                    Unit / Size
                  </label>

                  <input
                    id="unit"
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="e.g. 1 kg, 500 ml, Pack of 6"
                  />
                </div>

                {/* Description */}
                <div className="form-group full-width">
                  <label htmlFor="description">
                    Product Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter product description..."
                  />

                  <div className="input-helper">
                    Give customers useful information about
                    this product.
                  </div>
                </div>

              </div>
            </section>

            {/* Pricing & Inventory */}
            <section className="form-card">

              <div className="form-card-header">
                <div>
                  <h2>Pricing & Inventory</h2>
                  <p>
                    Manage price, discount and available stock.
                  </p>
                </div>

                <div className="form-card-icon">
                  <FiPackage />
                </div>
              </div>

              <div className="form-card-body">

                <div className="form-row">

                  {/* Current Price */}
                  <div className="form-group">
                    <label htmlFor="price">
                      Current Price <span>*</span>
                    </label>

                    <div className="input-with-prefix">
                      <span>₹</span>

                      <input
                        id="price"
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={
                          errors.price ? "input-error" : ""
                        }
                      />
                    </div>

                    {errors.price && (
                      <small className="form-error">
                        {errors.price}
                      </small>
                    )}
                  </div>

                  {/* Old Price */}
                  <div className="form-group">
                    <label htmlFor="oldPrice">
                      Original / MRP Price
                    </label>

                    <div className="input-with-prefix">
                      <span>₹</span>

                      <input
                        id="oldPrice"
                        type="number"
                        name="oldPrice"
                        min="0"
                        step="0.01"
                        value={formData.oldPrice}
                        onChange={handleChange}
                        placeholder="0.00"
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

                <div className="form-row">

                  {/* Stock */}
                  <div className="form-group">
                    <label htmlFor="stock">
                      Stock Quantity <span>*</span>
                    </label>

                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Enter stock quantity"
                      className={
                        errors.stock ? "input-error" : ""
                      }
                    />

                    {errors.stock && (
                      <small className="form-error">
                        {errors.stock}
                      </small>
                    )}
                  </div>

                  {/* Status */}
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

                {/* Stock Information */}
                <div className="stock-info-box">

                  <div>
                    <strong>Current Stock</strong>
                    <span>
                      {product.stock} units
                    </span>
                  </div>

                  <div>
                    <strong>New Stock</strong>
                    <span>
                      {formData.stock || 0} units
                    </span>
                  </div>

                  <div>
                    <strong>Stock Status</strong>

                    <span
                      className={
                        Number(formData.stock) === 0
                          ? "stock-out"
                          : Number(formData.stock) <= 5
                          ? "stock-low"
                          : "stock-good"
                      }
                    >
                      {Number(formData.stock) === 0
                        ? "Out of Stock"
                        : Number(formData.stock) <= 5
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </div>

                </div>

              </div>
            </section>

            {/* Product Image */}
            <section className="form-card">

              <div className="form-card-header">
                <div>
                  <h2>Product Image</h2>
                  <p>
                    Update the image URL used for this product.
                  </p>
                </div>

                <div className="form-card-icon">
                  <FiImage />
                </div>
              </div>

              <div className="form-card-body">

                <div className="form-group full-width">

                  <label htmlFor="image">
                    Image URL
                  </label>

                  <input
                    id="image"
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/product-image.jpg"
                  />

                  <div className="input-helper">
                    Use a direct image URL ending with .jpg,
                    .png, .webp etc.
                  </div>

                </div>

                {formData.image && (
                  <div className="image-preview-large">

                    <img
                      src={formData.image}
                      alt={formData.name}
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

          {/* Sidebar */}
          <aside className="form-sidebar">

            {/* Live Preview */}
            <div className="preview-card">

              <div className="preview-card-header">
                <div>
                  <h3>Live Preview</h3>
                  <p>Customer view</p>
                </div>

                <FiEye />
              </div>

              <div className="preview-product">

                <div className="preview-image">

                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.name}
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <FiImage />
                  )}

                </div>

                <div className="preview-content">

                  <span className="preview-category">
                    {formData.category ||
                      "Product Category"}
                  </span>

                  <h4>
                    {formData.name ||
                      "Product Name"}
                  </h4>

                  {formData.unit && (
                    <small>
                      {formData.unit}
                    </small>
                  )}

                  <div className="preview-price">

                    <strong>
                      ₹
                      {Number(formData.price || 0).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    {Number(formData.oldPrice) >
                      Number(formData.price) && (
                      <del>
                        ₹
                        {Number(
                          formData.oldPrice
                        ).toLocaleString("en-IN")}
                      </del>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* Product Information */}
            <div className="info-card">

              <h3>Product Information</h3>

              <div className="info-row">
                <span>Product ID</span>
                <strong>{product.id}</strong>
              </div>

              <div className="info-row">
                <span>Created</span>
                <strong>
                  {product.createdAt || "—"}
                </strong>
              </div>

              <div className="info-row">
                <span>Last Updated</span>
                <strong>
                  {new Date().toLocaleDateString("en-IN")}
                </strong>
              </div>

            </div>

            {/* Tips */}
            <div className="tip-card">

              <div className="tip-icon">
                💡
              </div>

              <div>
                <h3>Quick Tip</h3>

                <p>
                  Keep your product name, price and stock
                  information accurate to provide a better
                  shopping experience.
                </p>
              </div>

            </div>

          </aside>

        </div>

        {/* Bottom Actions */}
        <div className="form-actions">

          <Link
            to="/products"
            className="btn btn-secondary"
          >
            Cancel
          </Link>

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleReset}
          >
            <FiRefreshCw />
            Reset Changes
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            <FiSave />

            {saving
              ? "Saving..."
              : "Update Product"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditProduct;