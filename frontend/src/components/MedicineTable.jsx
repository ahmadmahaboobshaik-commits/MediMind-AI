import { useState } from "react";

import Swal from "sweetalert2";

import { toast } from "react-toastify";

import {
  Pill,
  SquarePen,
  Trash2,
  Building2,
  Package,
} from "lucide-react";

import { useMedicines } from "../context/MedicineContext";

import { getMedicineStatus } from "../services/medicineService";

import EditMedicineModal from "./EditMedicineModal";

import "./MedicineTable.css";

function MedicineTable() {

  const {

    medicines,

    deleteMedicine,

    searchTerm,

    selectedCategory,

  } = useMedicines();

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedMedicine, setSelectedMedicine] =
    useState(null);

  function handleEdit(medicine) {

    setSelectedMedicine(medicine);

    setShowEditModal(true);

  }

  async function handleDelete(medicine) {

    const result = await Swal.fire({

      title: "Delete Medicine?",

      html: `
        <b>${medicine.name}</b><br/><br/>
        This action cannot be undone.
      `,

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      cancelButtonColor: "#64748b",

      confirmButtonText: "🗑 Delete",

      cancelButtonText: "Cancel",

      reverseButtons: true,

    });

    if (!result.isConfirmed) return;

    deleteMedicine(medicine.id);

    toast.success("🗑 Medicine deleted successfully!");

  }

  const filteredMedicines = medicines.filter((medicine) => {

    const matchesSearch =

      medicine.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =

      selectedCategory === "All Categories"

        ? true

        : medicine.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  return (

    <>

      <div className="medicine-table-container">

        <table className="medicine-table">

          <thead>

            <tr>

              <th>Medicine</th>

              <th>Category</th>

              <th>Stock</th>

              <th>Expiry</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredMedicines.length === 0 ?

              (

                <tr>

                  <td
                    colSpan="6"
                    className="no-data"
                  >

                    📦 No medicines found.

                  </td>

                </tr>

              )

              :

              filteredMedicines.map((medicine) => {

                const status =
                  getMedicineStatus(medicine);

                return (

                  <tr key={medicine.id}>

                    <td>

                      <div className="medicine-info">

                        <div className="medicine-icon">

                          <Pill size={24} />

                        </div>

                        <div className="medicine-details">

                          <h4>

                            {medicine.name}

                          </h4>

                          <p>

                            <Building2 size={14} />

                            {medicine.manufacturer}

                          </p>

                          <span>

                            Batch: {medicine.batchNumber}

                          </span>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span className="category-pill">

                        {medicine.category}

                      </span>

                    </td>

                    <td>

                      <div className="stock-box">

                        <Package size={16} />

                        {medicine.stock}

                      </div>

                    </td>

                    <td>

                      {medicine.expiryDate}

                    </td>

                    <td>
                      <span
                        className={`status-badge ${status
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      ></span>

                      {
                        status === "Healthy"
                          ? "🟢 Healthy"
                          : status === "Low Stock"
                          ? "🟡 Low Stock"
                          : status === "Expiring Soon"
                          ? "🔵 Expiring Soon"
                          : "🔴 Expired"
                      }

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button

                          className="edit-btn"

                          onClick={() =>
                            handleEdit(medicine)
                          }

                          title="Edit Medicine"

                        >

                          <SquarePen size={18} />

                        </button>

                        <button

                          className="delete-btn"

                          onClick={() =>
                            handleDelete(medicine)
                          }

                          title="Delete Medicine"

                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })

            }

          </tbody>

        </table>

      </div>

      {

        showEditModal &&

        (

          <EditMedicineModal

            medicine={selectedMedicine}

            onClose={() =>
              setShowEditModal(false)
            }

          />

        )

      }

    </>

  );

}

export default MedicineTable;