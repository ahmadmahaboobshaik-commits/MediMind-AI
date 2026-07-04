/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import starterMedicines from "../data/starterMedicines";

const MedicineContext = createContext();

export function MedicineProvider({ children }) {

  const [medicines, setMedicines] = useState(() => {

    const savedMedicines = localStorage.getItem("medicines");

    if (savedMedicines) {
      return JSON.parse(savedMedicines);
    }

    localStorage.setItem(
      "medicines",
      JSON.stringify(starterMedicines)
    );

    return starterMedicines;

  });

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // ⭐ Current medicine used by AI Assistant
  const [currentMedicine, setCurrentMedicine] = useState(null);

  useEffect(() => {

    localStorage.setItem(
      "medicines",
      JSON.stringify(medicines)
    );

  }, [medicines]);

  // Add Medicine
  const addMedicine = (newMedicine) => {

    const medicine = {
      ...newMedicine,
      id: Date.now(),
    };

    setMedicines((prev) => [...prev, medicine]);

  };

  // Update Medicine
  const updateMedicine = (updatedMedicine) => {

    setMedicines((prev) =>
      prev.map((medicine) =>
        medicine.id === updatedMedicine.id
          ? updatedMedicine
          : medicine
      )
    );

  };

  // Delete Medicine
  const deleteMedicine = (id) => {

    setMedicines((prev) =>
      prev.filter((medicine) => medicine.id !== id)
    );

  };

  return (

    <MedicineContext.Provider
      value={{

        medicines,
        addMedicine,
        updateMedicine,
        deleteMedicine,

        searchTerm,
        setSearchTerm,

        selectedCategory,
        setSelectedCategory,

        // ⭐ AI Medicine
        currentMedicine,
        setCurrentMedicine,

      }}
    >

      {children}

    </MedicineContext.Provider>

  );

}

export function useMedicines() {

  return useContext(MedicineContext);

}