import "../styles/StatCard.css";

function StatCard({

  icon,

  title,

  value,

  subtitle,

  color,

}) {

  return (

    <div className="stat-card">

      <div
        className="stat-icon"
        style={{
          background: color,
        }}
      >
        {icon}
      </div>

      <div className="stat-info">

        <p>{title}</p>

        <h2>{value}</h2>

        {subtitle && (

          <span>

            {subtitle}

          </span>

        )}

      </div>

    </div>

  );

}

export default StatCard;