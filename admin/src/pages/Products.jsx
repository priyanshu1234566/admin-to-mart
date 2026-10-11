
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPackage,
  FiRefreshCw,
} from "react-icons/fi";
import "../styles/page/product.css";  

import { useMemo, useState } from "react";

import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { useAdmin } from "../context/AdminContext";

function Products() {
  // =======================================================
  // ADMIN CONTEXT
  // =======================================================

  const {
    products = [],
    categories = [],
    deleteProduct,
  } = useAdmin();

  // =======================================================
  // STATES
  // =======================================================

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [stockFilter, setStockFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // =======================================================
  // DELETE PRODUCT
  // =======================================================

  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    if (typeof deleteProduct === "function") {
      deleteProduct(product.id);
    }
  };

  // =======================================================
  // ADD PRODUCT
  // =======================================================

  const handleAddProduct = () => {
    window.alert(
      "Add Product page will be connected next."
    );
  };

  // =======================================================
  // VIEW PRODUCT
  // =======================================================

  const handleViewProduct = (product) => {
    window.alert(
      `Product: ${product.name}\n\nProduct ID: ${product.id}`
    );
  };

  // =======================================================
  // EDIT PRODUCT
  // =======================================================

  const handleEditProduct = (product) => {
    window.alert(
      `Edit Product page will be connected next.\n\nProduct: ${product.name}`
    );
  };

  // =======================================================
  // FILTER PRODUCTS
  // =======================================================

  const filteredProducts = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const productName = String(
        product?.name || ""
      ).toLowerCase();

      const productId = String(
        product?.id || ""
      ).toLowerCase();

      const productCategory = String(
        product?.category || ""
      ).toLowerCase();

      const productSubCategory = String(
        product?.subCategory || ""
      ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        productName.includes(searchValue) ||
        productId.includes(searchValue) ||
        productCategory.includes(searchValue) ||
        productSubCategory.includes(searchValue);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const stock = Number(
        product?.stock || 0
      );

      let matchesStock = true;

      if (stockFilter === "In Stock") {
        matchesStock = stock > 5;
      }

      if (stockFilter === "Low Stock") {
        matchesStock =
          stock > 0 && stock <= 5;
      }

      if (stockFilter === "Out of Stock") {
        matchesStock = stock === 0;
      }

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    stockFilter,
    statusFilter,
  ]);

  // =======================================================
  // TABLE COLUMNS
  // =======================================================

  const columns = [
    {
      key: "name",
      label: "Product",
      className: "product-column",

      render: (value, row) => (
        <div className="products-table-product">

          <div className="products-table-image">
            {row.image ? (
              <img
                src={row.image}
                alt={value}
              />
            ) : (
              <FiPackage />
            )}
          </div>

          <div className="products-table-info">

            <strong>
              {value}
            </strong>

            <span>
              {row.subCategory ||
                row.category ||
                "General"}
            </span>

            <small>
              ID: {row.id}
            </small>

          </div>

        </div>
      ),
    },

    {
      key: "category",
      label: "Category",

      render: (value, row) => (
        <div className="product-category-cell">

          <strong>
            {value || "General"}
          </strong>

          <span>
            {row.subCategory ||
              "General"}
          </span>

        </div>
      ),
    },

    {
      key: "price",
      label: "Price",

      render: (value, row) => (
        <div className="product-price-cell">

          <strong>
            ₹
            {Number(
              value || 0
            ).toLocaleString("en-IN")}
          </strong>

          {Number(row.oldPrice) >
            Number(value) && (
            <span>
              ₹
              {Number(
                row.oldPrice
              ).toLocaleString("en-IN")}
            </span>
          )}

        </div>
      ),
    },

    {
      key: "stock",
      label: "Stock",

      render: (value) => {
        const stock = Number(
          value || 0
        );

        return (
          <div className="product-stock-cell">

            <strong
              className={
                stock === 0
                  ? "stock-out"
                  : stock <= 5
                  ? "stock-low"
                  : "stock-good"
              }
            >
              {stock}
            </strong>

            <span>
              units
            </span>

          </div>
        );
      },
    },

    {
      key: "status",
      label: "Status",

      render: (value, row) => {
        const stock = Number(
          row?.stock || 0
        );

        if (stock === 0) {
          return (
            <StatusBadge
              status="Out of Stock"
            />
          );
        }

        if (stock <= 5) {
          return (
            <StatusBadge
              status="Low Stock"
            />
          );
        }

        return (
          <StatusBadge
            status={value || "Active"}
          />
        );
      },
    },
  ];

  // =======================================================
  // ACTION BUTTONS
  // =======================================================

  const renderActions = (product) => (
    <div className="product-row-actions">

      {/* VIEW */}

      <button
        type="button"
        className="table-action-btn view"
        title="View Product"
        onClick={() =>
          handleViewProduct(product)
        }
      >
        <FiEye />
      </button>

      {/* EDIT */}

      <button
        type="button"
        className="table-action-btn edit"
        title="Edit Product"
        onClick={() =>
          handleEditProduct(product)
        }
      >
        <FiEdit2 />
      </button>

      {/* DELETE */}

      <button
        type="button"
        className="table-action-btn delete"
        title="Delete Product"
        onClick={() =>
          handleDelete(product)
        }
      >
        <FiTrash2 />
      </button>

    </div>
  );

  // =======================================================
  // CLEAR FILTERS
  // =======================================================

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setStockFilter("All");
    setStatusFilter("All");
  };

  const filtersActive =
    search ||
    categoryFilter !== "All" ||
    stockFilter !== "All" ||
    statusFilter !== "All";

  // =======================================================
  // SUMMARY COUNTS
  // =======================================================

  const totalProducts =
    products.length;

  const activeProducts =
    products.filter(
      (product) =>
        product.status === "Active"
    ).length;

  const lowStockProducts =
    products.filter((product) => {
      const stock = Number(
        product?.stock || 0
      );

      return (
        stock > 0 &&
        stock <= 5
      );
    }).length;

  const outOfStockProducts =
    products.filter(
      (product) =>
        Number(
          product?.stock || 0
        ) === 0
    ).length;

  // =======================================================
  // JSX
  // =======================================================

  return (
    <div className="admin-page products-page">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="products-page-header">

        <div>

          <span className="dashboard-eyebrow">
            INVENTORY MANAGEMENT
          </span>

          <h2>
            Products
          </h2>

          <p>
            Manage your store products,
            pricing and inventory.
          </p>

        </div>

        <button
          type="button"
          className="products-add-btn"
          onClick={handleAddProduct}
        >
          <FiPlus />
          Add Product
        </button>

      </div>


      {/* =================================================
          PRODUCT SUMMARY
      ================================================== */}

      <div className="products-summary-grid">

        {/* TOTAL */}

        <div className="products-summary-card">

          <div className="products-summary-icon total">
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


        {/* ACTIVE */}

        <div className="products-summary-card">

          <div className="products-summary-icon active">
            ✓
          </div>

          <div>

            <span>
              Active Products
            </span>

            <strong>
              {activeProducts}
            </strong>

          </div>

        </div>


        {/* LOW STOCK */}

        <div className="products-summary-card">

          <div className="products-summary-icon low">
            ⚠
          </div>

          <div>

            <span>
              Low Stock
            </span>

            <strong>
              {lowStockProducts}
            </strong>

          </div>

        </div>


        {/* OUT OF STOCK */}

        <div className="products-summary-card">

          <div className="products-summary-icon out">
            !
          </div>

          <div>

            <span>
              Out of Stock
            </span>

            <strong>
              {outOfStockProducts}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          PRODUCT TABLE
      ================================================== */}

      <section className="dashboard-card products-table-card">

        {/* TOOLBAR */}

        <div className="products-toolbar">

          {/* SEARCH */}

          <div className="products-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

            {search && (
              <button
                type="button"
                className="products-search-clear"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

          </div>


          {/* FILTERS */}

          <div className="products-filters">

            {/* CATEGORY */}

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
              className="products-filter-select"
            >

              <option value="All">
                All Categories
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


            {/* STOCK */}

            <select
              value={stockFilter}
              onChange={(event) =>
                setStockFilter(
                  event.target.value
                )
              }
              className="products-filter-select"
            >

              <option value="All">
                All Stock
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>

            </select>


            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="products-filter-select"
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


            {/* CLEAR */}

            {filtersActive && (
              <button
                type="button"
                className="products-clear-filters"
                onClick={clearFilters}
              >
                <FiRefreshCw />
                Clear
              </button>
            )}

          </div>

        </div>


        {/* TABLE HEADING */}

        <div className="products-table-heading">

          <div>

            <span>
              All Products
            </span>

            <strong>
              {filteredProducts.length}
            </strong>

          </div>

          {filtersActive && (
            <p>
              Showing filtered results
            </p>
          )}

        </div>


        {/* DATA TABLE */}

        <DataTable
          columns={columns}
          data={filteredProducts}
          renderActions={renderActions}
          emptyMessage={
            filtersActive
              ? "No products match your current filters."
              : "No products have been added yet."
          }
        />

      </section>

    </div>
  );
}

export default Products;
