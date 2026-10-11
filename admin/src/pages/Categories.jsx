
import { useMemo, useState } from "react";
import "../styles/page/categories.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiFolder,
  FiPackage,
  FiX,
  FiSave,
} from "react-icons/fi";

import { useAdmin } from "../context/AdminContext";

function Categories() {
  // =======================================================
  // ADMIN CONTEXT
  // =======================================================

  const {
    categories = [],
    products = [],
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryProductCount,
  } = useAdmin();

  // =======================================================
  // STATES
  // =======================================================

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});


  // =======================================================
  // FILTER CATEGORIES
  // =======================================================

  const filteredCategories = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return categories;
    }

    return categories.filter((category) =>
      [
        category?.name,
        category?.description,
        category?.status,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        )
    );
  }, [categories, search]);


  // =======================================================
  // SUMMARY
  // =======================================================

  const totalCategories =
    categories.length;

  const activeCategories =
    categories.filter(
      (category) =>
        category?.status === "Active"
    ).length;

  const inactiveCategories =
    categories.filter(
      (category) =>
        category?.status === "Inactive"
    ).length;

  const totalProducts =
    products.length;


  // =======================================================
  // OPEN ADD MODAL
  // =======================================================

  const openAddModal = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setErrors({});
    setShowModal(true);
  };


  // =======================================================
  // OPEN EDIT MODAL
  // =======================================================

  const openEditModal = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category?.name || "",
      description:
        category?.description || "",
      status:
        category?.status || "Active",
    });

    setErrors({});
    setShowModal(true);
  };


  // =======================================================
  // CLOSE MODAL
  // =======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setErrors({});
  };


  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

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


  // =======================================================
  // VALIDATE FORM
  // =======================================================

  const validateForm = () => {
    const newErrors = {};

    const categoryName =
      formData.name.trim();

    if (!categoryName) {
      newErrors.name =
        "Category name is required.";
    }

    const duplicate =
      categories.some(
        (category) =>
          String(
            category?.name || ""
          )
            .toLowerCase() ===
            categoryName.toLowerCase() &&
          category?.id !==
            editingCategory?.id
      );

    if (duplicate) {
      newErrors.name =
        "This category already exists.";
    }

    if (!formData.status) {
      newErrors.status =
        "Please select a status.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  // =======================================================
  // SUBMIT FORM
  // =======================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      description:
        formData.description.trim(),
      status: formData.status,
    };

    if (editingCategory) {

      if (
        typeof updateCategory ===
        "function"
      ) {
        updateCategory(
          editingCategory.id,
          {
            ...editingCategory,
            ...categoryData,
          }
        );
      }

    } else {

      if (
        typeof addCategory ===
        "function"
      ) {
        addCategory(categoryData);
      }

    }

    closeModal();
  };


  // =======================================================
  // DELETE CATEGORY
  // =======================================================

  const handleDelete = (category) => {
    let productCount = 0;

    if (
      typeof getCategoryProductCount ===
      "function"
    ) {
      productCount =
        getCategoryProductCount(
          category.name
        );
    } else {
      productCount =
        products.filter(
          (product) =>
            product?.category ===
            category.name
        ).length;
    }

    if (productCount > 0) {
      window.alert(
        `Cannot delete "${category.name}" because ${productCount} product(s) are using this category.`
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${category.name}"?`
      );

    if (!confirmed) {
      return;
    }

    if (
      typeof deleteCategory ===
      "function"
    ) {
      deleteCategory(category.id);
    }
  };


  // =======================================================
  // JSX
  // =======================================================

  return (
    <div className="admin-page categories-page">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="page-header">

        <div className="page-header-left">

          <div>

            <div className="breadcrumb">
              <span>
                Admin
              </span>

              <span>
                /
              </span>

              <span>
                Categories
              </span>
            </div>

            <h1>
              Categories
            </h1>

            <p>
              Manage product categories
              for your store.
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
            Add Category
          </button>

        </div>

      </div>


      {/* =================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="stats-grid categories-stats">

        {/* TOTAL */}

        <div className="category-stat-card">

          <div className="category-stat-icon">
            <FiFolder />
          </div>

          <div>

            <span>
              Total Categories
            </span>

            <strong>
              {totalCategories}
            </strong>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="category-stat-card">

          <div className="category-stat-icon">
            <FiFolder />
          </div>

          <div>

            <span>
              Active Categories
            </span>

            <strong>
              {activeCategories}
            </strong>

          </div>

        </div>


        {/* INACTIVE */}

        <div className="category-stat-card">

          <div className="category-stat-icon">
            <FiFolder />
          </div>

          <div>

            <span>
              Inactive Categories
            </span>

            <strong>
              {inactiveCategories}
            </strong>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="category-stat-card">

          <div className="category-stat-icon">
            <FiPackage />
          </div>

          <div>

            <span>
              Total Products
            </span>

            <strong>
              {totalProducts}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN CARD
      ================================================== */}

      <div className="content-card">

        {/* TOOLBAR */}

        <div className="content-card-toolbar">

          <div>

            <h2>
              All Categories
            </h2>

            <p>
              {filteredCategories.length}{" "}
              {filteredCategories.length === 1
                ? "category"
                : "categories"}{" "}
              found
            </p>

          </div>


          {/* SEARCH */}

          <div className="toolbar-search">

            <FiSearch />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search categories..."
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="search-clear"
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}

          </div>

        </div>


        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {filteredCategories.length === 0 ? (

          <div className="categories-empty">

            <div className="categories-empty-icon">
              <FiFolder />
            </div>

            <h3>
              No Categories Found
            </h3>

            <p>
              {search
                ? "Try searching with a different category name."
                : "Start by adding your first product category."}
            </p>

            {!search && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={
                  openAddModal
                }
              >
                <FiPlus />
                Add Category
              </button>
            )}

          </div>

        ) : (

          /* =================================================
             CATEGORY GRID
          ================================================== */

          <div className="categories-grid">

            {filteredCategories.map(
              (category) => {

                let productCount = 0;

                if (
                  typeof getCategoryProductCount ===
                  "function"
                ) {
                  productCount =
                    getCategoryProductCount(
                      category.name
                    );
                } else {
                  productCount =
                    products.filter(
                      (product) =>
                        product?.category ===
                        category.name
                    ).length;
                }

                return (
                  <div
                    className="category-management-card"
                    key={category.id}
                  >

                    {/* CARD TOP */}

                    <div className="category-card-top">

                      <div className="category-folder-icon">
                        <FiFolder />
                      </div>

                      <span
                        className={`category-status ${
                          category.status ===
                          "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {category.status ||
                          "Inactive"}
                      </span>

                    </div>


                    {/* CARD CONTENT */}

                    <div className="category-card-content">

                      <h3>
                        {category.name}
                      </h3>

                      <p>
                        {category.description ||
                          "No description available."}
                      </p>

                      <div className="category-product-count">

                        <FiPackage />

                        <span>
                          {productCount}{" "}
                          {productCount ===
                          1
                            ? "Product"
                            : "Products"}
                        </span>

                      </div>

                    </div>


                    {/* CARD FOOTER */}

                    <div className="category-card-footer">

                      <button
                        type="button"
                        className="category-action edit"
                        onClick={() =>
                          openEditModal(
                            category
                          )
                        }
                        title="Edit Category"
                      >
                        <FiEdit2 />
                        Edit
                      </button>


                      <button
                        type="button"
                        className="category-action delete"
                        onClick={() =>
                          handleDelete(
                            category
                          )
                        }
                        title="Delete Category"
                      >
                        <FiTrash2 />
                        Delete
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }

          }}
        >

          <div className="category-modal">

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add New Category"}
                </h2>

                <p>
                  {editingCategory
                    ? "Update category information."
                    : "Create a new product category."}
                </p>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={
                  closeModal
                }
                aria-label="Close modal"
              >
                <FiX />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="modal-body">

                {/* NAME */}

                <div className="form-group">

                  <label htmlFor="category-name">
                    Category Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    id="category-name"
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Grocery"
                    className={
                      errors.name
                        ? "input-error"
                        : ""
                    }
                    autoFocus
                  />

                  {errors.name && (
                    <small className="form-error">
                      {errors.name}
                    </small>
                  )}

                </div>


                {/* DESCRIPTION */}

                <div className="form-group">

                  <label htmlFor="category-description">
                    Description
                  </label>

                  <textarea
                    id="category-description"
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter category description..."
                    rows="4"
                  />

                </div>


                {/* STATUS */}

                <div className="form-group">

                  <label htmlFor="category-status">
                    Status{" "}
                    <span>*</span>
                  </label>

                  <select
                    id="category-status"
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                    className={
                      errors.status
                        ? "input-error"
                        : ""
                    }
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                  {errors.status && (
                    <small className="form-error">
                      {errors.status}
                    </small>
                  )}

                </div>


                {/* PREVIEW */}

                <div className="category-form-preview">

                  <div className="category-form-preview-icon">
                    <FiFolder />
                  </div>

                  <div>

                    <strong>
                      {formData.name ||
                        "Category Name"}
                    </strong>

                    <span>
                      {formData.description ||
                        "Category description"}
                    </span>

                  </div>

                  <span
                    className={`category-status ${
                      formData.status ===
                      "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {formData.status}
                  </span>

                </div>

              </div>


              {/* MODAL FOOTER */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <FiSave />

                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Categories;
