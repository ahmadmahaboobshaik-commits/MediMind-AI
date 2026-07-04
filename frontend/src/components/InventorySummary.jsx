import "../styles/InventorySummary.css";

import { useMedicines } from "../context/MedicineContext";

import {
  getLowStockMedicines,
  getExpiredMedicines,
  getExpiringMedicines,
} from "../services/medicineService";

function InventorySummary() {

  const { medicines } = useMedicines();

  const total = medicines.length;

  const lowStock = getLowStockMedicines(medicines).length;

  const expiring = getExpiringMedicines(medicines).length;

  const expired = getExpiredMedicines(medicines).length;

  return (

    <div className="summary-container">

      <div className="summary-card">

        <h3>Total Medicines</h3>

        <h1>{total}</h1>

      </div>

      <div className="summary-card">

        <h3>Low Stock</h3>

        <h1>{lowStock}</h1>

      </div>

      <div className="summary-card">

        <h3>Expiring Soon</h3>

        <h1>{expiring}</h1>

      </div>

      <div className="summary-card">

        <h3>Expired</h3>

        <h1>{expired}</h1>

      </div>

    </div>

  );

}

export default InventorySummary;