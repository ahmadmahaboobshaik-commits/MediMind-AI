import "./QuickActions.css";

const actions = [
  "Generic Alternative",
  "Side Effects",
  "Storage",
  "Drug Interactions",
  "Prescription Status",
  "Restock Advice"
];

function QuickActions({ onSelect }) {
  return (
    <div className="quick-actions">

      <h3>💡 Smart Pharmacy Actions</h3>

      <div className="actions-grid">

        {actions.map((action) => (

          <button
            key={action}
            className="action-btn"
            onClick={() => onSelect(action)}
          >
            {action}
          </button>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;