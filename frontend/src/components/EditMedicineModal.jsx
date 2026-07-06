import { useState } from "react";
import { toast } from "react-toastify";

import { useMedicines } from "../context/MedicineContext";

import "./AddMedicineModal.css";

function EditMedicineModal({ medicine, onClose }) {

  const { updateMedicine } = useMedicines();

  const [formData, setFormData] = useState({

    ...medicine,

  });

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  }

  function handleUpdate() {

    if (

      !formData.name ||

      !formData.manufacturer ||

      !formData.batchNumber ||

      !formData.stock ||

      !formData.minStock ||

      !formData.expiryDate ||

      !formData.purchasePrice ||

      !formData.sellingPrice ||

      !formData.location

    ) {

      toast.error("⚠ Please fill all fields.");

      return;

    }

    updateMedicine({

      ...formData,

      stock: Number(formData.stock),

      minStock: Number(formData.minStock),

      purchasePrice: Number(formData.purchasePrice),

      sellingPrice: Number(formData.sellingPrice),

    });

    toast.success("✏ Medicine updated successfully!");

    setTimeout(() => {

      onClose();

    }, 600);

  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>

          Edit Medicine

        </h2>

        <div className="form-grid">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medicine Name"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Tablet</option>
            <option>Capsule</option>
            <option>Syrup</option>
            <option>Injection</option>
            <option>Eye Drops</option>
          </select>

          <input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
          />

          <input
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            placeholder="Batch Number"
          />

          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stock"
          />

          <input
            name="minStock"
            value={formData.minStock}
            onChange={handleChange}
            type="number"
            placeholder="Minimum Stock"
          />

          <input
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            type="date"
          />

          <input
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            type="number"
            placeholder="Purchase Price"
          />

          <input
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            type="number"
            placeholder="Selling Price"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Shelf Location"
          />

        </div>

        <div className="modal-buttons">

          <button

            className="cancel-btn"

            onClick={onClose}

          >

            Cancel

          </button>

          <button

            className="save-btn"

            onClick={handleUpdate}

          >

            Update Medicine

          </button>

        </div>

      </div>

    </div>

  );

}

export default EditMedicineModal;