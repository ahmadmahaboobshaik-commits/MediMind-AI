import "./Button.css";

function Button({ onClick }) {
  return (
    <button
      className="add-medicine-btn"
      onClick={onClick}
    >
      + Add Medicine
    </button>
  );
}

export default Button;