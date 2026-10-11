import {
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
} from "react-icons/fi";
import "../styles/components/statcard.css";

function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  subtitle,
  type = "default",
}) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <div className={`stat-card stat-card-${type}`}>
      {/* Top Section */}
      <div className="stat-card-top">
        <div className="stat-card-icon">
          {icon}
        </div>

        <button
          type="button"
          className="stat-card-menu"
          aria-label={`${title} options`}
        >
          <FiMoreVertical />
        </button>
      </div>

      {/* Content */}
      <div className="stat-card-content">
        <p className="stat-card-title">
          {title}
        </p>

        <h2 className="stat-card-value">
          {value}
        </h2>
      </div>

      {/* Bottom Section */}
      <div className="stat-card-bottom">
        {trendValue && (
          <span
            className={`stat-card-trend ${
              isPositive
                ? "positive"
                : isNegative
                ? "negative"
                : ""
            }`}
          >
            {isPositive && <FiArrowUp />}
            {isNegative && <FiArrowDown />}

            {trendValue}
          </span>
        )}

        {subtitle && (
          <span className="stat-card-subtitle">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
