export function generateAdvisor(medicines) {

  const today = new Date();

  let expired = 0;
  let expiringSoon = 0;
  let lowStock = 0;

  let inventoryValue = 0;
  let riskValue = 0;

  const restockList = [];

  medicines.forEach((medicine) => {

    inventoryValue += medicine.stock * medicine.purchasePrice;

    const expiry = new Date(medicine.expiryDate);

    const daysLeft =
      (expiry - today) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) {

      expired++;

      riskValue +=
        medicine.stock * medicine.purchasePrice;

    }

    else if (daysLeft <= 30) {

      expiringSoon++;

      riskValue +=
        medicine.stock * medicine.purchasePrice;

    }

    if (medicine.stock <= medicine.minStock) {

      lowStock++;

      restockList.push(medicine.name);

    }

  });

  const healthy = medicines.length -
    expired -
    lowStock;

  const healthScore =
    medicines.length === 0
      ? 100
      : Math.round(
          (healthy / medicines.length) * 100
        );

  let recommendation = "";

  if (expired > 0) {

    recommendation =
      "Remove expired medicines immediately and replace stock.";

  }

  else if (lowStock > 0) {

    recommendation =
      "Restock medicines before inventory becomes critical.";

  }

  else {

    recommendation =
      "Inventory looks healthy. Continue monitoring stock regularly.";

  }

  return {

    healthScore,

    expired,

    expiringSoon,

    lowStock,

    inventoryValue,

    riskValue,

    recommendation,

    restockList,

  };

}