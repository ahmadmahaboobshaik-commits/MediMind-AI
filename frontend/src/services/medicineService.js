// ===============================
// TOTAL MEDICINES
// ===============================

export function getTotalMedicines(medicines) {
  return medicines.length;
}

// ===============================
// LOW STOCK
// ===============================

export function getLowStockMedicines(medicines) {
  return medicines.filter(
    (medicine) => medicine.stock <= medicine.minStock
  );
}

// ===============================
// EXPIRED MEDICINES
// ===============================

export function getExpiredMedicines(medicines) {
  const today = new Date();

  return medicines.filter(
    (medicine) => new Date(medicine.expiryDate) < today
  );
}

// ===============================
// EXPIRING WITHIN 30 DAYS
// ===============================

export function getExpiringMedicines(medicines) {
  const today = new Date();

  const next30Days = new Date();

  next30Days.setDate(today.getDate() + 30);

  return medicines.filter((medicine) => {
    const expiry = new Date(medicine.expiryDate);

    return expiry >= today && expiry <= next30Days;
  });
}

// ===============================
// TOTAL INVENTORY VALUE
// ===============================

export function getInventoryValue(medicines) {
  return medicines.reduce((total, medicine) => {
    return total + medicine.stock * medicine.purchasePrice;
  }, 0);
}

// ===============================
// SEARCH MEDICINES
// ===============================

export function searchMedicines(medicines, searchText) {
  return medicines.filter((medicine) =>
    medicine.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
}

// ===============================
// FILTER CATEGORY
// ===============================

export function filterByCategory(medicines, category) {
  if (category === "All") {
    return medicines;
  }

  return medicines.filter(
    (medicine) => medicine.category === category
  );
}

// ===============================
// STATUS
// ===============================

export function getMedicineStatus(medicine) {
  const today = new Date();

  const expiry = new Date(medicine.expiryDate);

  if (expiry < today) {
    return "Expired";
  }

  if (medicine.stock <= medicine.minStock) {
    return "Low Stock";
  }

  const next30Days = new Date();

  next30Days.setDate(today.getDate() + 30);

  if (expiry <= next30Days) {
    return "Expiring Soon";
  }

  return "Healthy";
}