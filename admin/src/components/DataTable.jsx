
import {
  FiPackage,
  FiDatabase,
} from "react-icons/fi";

import "../styles/components/datatable.css";

// =========================================================
// DATA TABLE
// Reusable table component for Admin Panel
// =========================================================

function DataTable({
  columns = [],
  data = [],
  renderActions,
  emptyMessage = "No data available.",
  loading = false,
}) {
  // =======================================================
  // LOADING STATE
  // =======================================================

  if (loading) {
    return (
      <div className="data-table-wrapper">

        <div className="data-table-loading">

          <div className="data-table-loader">
            <span />
            <span />
            <span />
          </div>

          <p>
            Loading data...
          </p>

        </div>

      </div>
    );
  }

  // =======================================================
  // EMPTY STATE
  // =======================================================

  if (!data || data.length === 0) {
    return (
      <div className="data-table-wrapper">

        <div className="data-table-empty">

          <div className="data-table-empty-icon">
            <FiPackage />
          </div>

          <h3>
            No Data Found
          </h3>

          <p>
            {emptyMessage}
          </p>

        </div>

      </div>
    );
  }

  // =======================================================
  // TABLE
  // =======================================================

  return (
    <div className="data-table-wrapper">

      <div className="data-table-scroll">

        <table className="data-table">

          {/* =================================================
              TABLE HEADER
          ================================================== */}

          <thead>

            <tr>

              {columns.map((column) => (
                <th
                  key={column.key}
                  className={
                    column.className || ""
                  }
                >
                  {column.label}
                </th>
              ))}

              {typeof renderActions ===
                "function" && (
                <th className="data-table-actions-header">
                  Actions
                </th>
              )}

            </tr>

          </thead>


          {/* =================================================
              TABLE BODY
          ================================================== */}

          <tbody>

            {data.map((row, rowIndex) => {

              const rowKey =
                row?.id ??
                row?._id ??
                rowIndex;

              return (
                <tr
                  key={rowKey}
                  className="data-table-row"
                >

                  {columns.map((column) => {

                    const value =
                      row?.[column.key];

                    return (
                      <td
                        key={`${rowKey}-${column.key}`}
                        className={
                          column.className || ""
                        }
                      >

                        {typeof column.render ===
                        "function"
                          ? column.render(
                              value,
                              row,
                              rowIndex
                            )
                          : value ?? "—"}

                      </td>
                    );

                  })}


                  {/* ACTIONS */}

                  {typeof renderActions ===
                    "function" && (
                    <td className="data-table-actions">

                      {renderActions(
                        row,
                        rowIndex
                      )}

                    </td>
                  )}

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* =================================================
          TABLE FOOTER
      ================================================== */}

      <div className="data-table-footer">

        <div className="data-table-result-info">

          <FiDatabase />

          <span>
            Showing
          </span>

          <strong>
            {data.length}
          </strong>

          <span>
            {data.length === 1
              ? "record"
              : "records"}
          </span>

        </div>

      </div>

    </div>
  );
}

export default DataTable;
