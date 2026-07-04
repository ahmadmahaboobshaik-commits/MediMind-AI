import { useState } from "react";
import { Package2 } from "lucide-react";

import InventorySummary from "../components/InventorySummary";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Button from "../components/Button";
import MedicineTable from "../components/MedicineTable";
import AddMedicineModal from "../components/AddMedicineModal";

import "../styles/Inventory.css";

function Inventory() {

  const [showModal, setShowModal] = useState(false);

  return (

    <div className="page-content">

      <section className="inventory-hero">

        <span className="hero-tag">

          💊 Smart Inventory Management

        </span>

        <h1>

          Pharmacy Inventory

        </h1>

        <p>

          Monitor medicine stock, expiry dates,
          inventory value and pharmacy operations
          from one intelligent dashboard.

        </p>

      </section>

      <div className="inventory-content">

        <InventorySummary />

        <div className="inventory-toolbar">

          <SearchBar />

          <CategoryFilter />

          <Button
            onClick={() => setShowModal(true)}
          />

        </div>

        <div className="table-container">

          <MedicineTable />

        </div>

        {

          showModal && (

            <AddMedicineModal
              onClose={() => setShowModal(false)}
            />

          )

        }

      </div>

    </div>

  );

}

export default Inventory;