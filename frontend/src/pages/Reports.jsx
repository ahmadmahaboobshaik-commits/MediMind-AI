import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FileText,
  FileSpreadsheet,
  Brain,
  Package,
  AlertTriangle,
  Wallet,
  Activity,
  TrendingUp,
} from "lucide-react";

import { useMedicines } from "../context/MedicineContext";

import "../styles/Reports.css";

function Reports() {

  const { medicines } = useMedicines();

  const lowStock = medicines.filter(
    medicine => medicine.stock <= medicine.minStock
  );

  const expiringSoon = medicines.filter(medicine => {

    const today = new Date();

    const expiry = new Date(medicine.expiryDate);

    const diff =
      (expiry - today) /
      (1000 * 60 * 60 * 24);

    return diff <= 30 && diff >= 0;

  });

  const totalValue = medicines.reduce(

    (total, medicine) =>

      total +
      medicine.stock *
      medicine.purchasePrice,

    0

  );

  let healthScore = 100;

  healthScore -= lowStock.length * 5;

  healthScore -= expiringSoon.length * 4;

  if (healthScore < 0) {

    healthScore = 0;

  }

  function exportExcel() {

    const worksheet =
      XLSX.utils.json_to_sheet(medicines);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      "Inventory"

    );

    const excelBuffer =
      XLSX.write(workbook, {

        bookType: "xlsx",

        type: "array",

      });

    saveAs(

      new Blob([excelBuffer]),

      "Inventory_Report.xlsx"

    );

  }

  function exportPDF() {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(

      "MediMind AI Inventory Report",

      15,

      20

    );

    autoTable(doc, {

      startY: 30,

      head: [[

        "Medicine",

        "Category",

        "Stock",

        "Expiry",

        "Location"

      ]],

      body: medicines.map(medicine => [

        medicine.name,

        medicine.category,

        medicine.stock,

        medicine.expiryDate,

        medicine.location

      ])

    });

    doc.save("Inventory_Report.pdf");

  }

  return (

    <div className="reports-page">

      <section className="reports-hero">

        <span className="hero-tag">

          📊 AI Analytics Dashboard

        </span>

        <h1>

          Pharmacy Reports

        </h1>

        <p>

          View inventory analytics,
          export professional reports,
          and monitor pharmacy performance
          using AI-powered insights.

        </p>

      </section>

      <div className="summary-grid">

        <div className="summary-card">

          <Package size={34}/>

          <h2>

            {medicines.length}

          </h2>

          <p>

            Total Medicines

          </p>

        </div>

        <div className="summary-card">

          <AlertTriangle size={34}/>

          <h2>

            {lowStock.length}

          </h2>

          <p>

            Low Stock

          </p>

        </div>

        <div className="summary-card">

          <TrendingUp size={34}/>

          <h2>

            {expiringSoon.length}

          </h2>

          <p>

            Expiring Soon

          </p>

        </div>

        <div className="summary-card">

          <Wallet size={34}/>

          <h2>

            ₹{totalValue.toLocaleString()}

          </h2>

          <p>

            Inventory Value

          </p>

        </div>

      </div>

      <section className="health-section">

        <div className="health-left">

          <h2>

            🏥 Pharmacy Health

          </h2>

          <p>

            Overall inventory health
            based on stock and expiry.

          </p>

        </div>

        <div className="health-right">

          <h1>

            {healthScore}%

          </h1>

          <div className="progress">

            <div
              className="progress-fill"
              style={{
                width: `${healthScore}%`
              }}
            />

          </div>

        </div>

      </section>
            <section className="ai-insights">

        <h2>

          <Brain size={24} />

          AI Insights

        </h2>

        <div className="insight-grid">

          <div className="insight-card">

            <Activity size={22} />

            <h3>

              Inventory Status

            </h3>

            <p>

              {

                lowStock.length === 0

                  ? "Inventory levels are healthy. No medicines require immediate restocking."

                  : `${lowStock.length} medicines require immediate restocking.`

              }

            </p>

          </div>

          <div className="insight-card">

            <AlertTriangle size={22} />

            <h3>

              Expiry Prediction

            </h3>

            <p>

              {

                expiringSoon.length === 0

                  ? "No medicines are expiring within the next 30 days."

                  : `${expiringSoon.length} medicines will expire within the next 30 days.`

              }

            </p>

          </div>

          <div className="insight-card">

            <Wallet size={22} />

            <h3>

              Inventory Value

            </h3>

            <p>

              Total inventory value is

              <strong>

                {" "}₹{totalValue.toLocaleString()}

              </strong>

              .

            </p>

          </div>

        </div>

      </section>

      <section className="export-section">

        <h2>

          Export Reports

        </h2>

        <div className="report-buttons">

          <button
            className="pdf-btn"
            onClick={exportPDF}
          >

            <FileText size={20} />

            Export PDF

          </button>

          <button
            className="excel-btn"
            onClick={exportExcel}
          >

            <FileSpreadsheet size={20} />

            Export Excel

          </button>

        </div>

      </section>

      <section className="low-stock-section">

        <h2>

          ⚠ Low Stock Medicines

        </h2>

        <table className="report-table">

          <thead>

            <tr>

              <th>Medicine</th>

              <th>Current Stock</th>

              <th>Minimum Stock</th>

            </tr>

          </thead>

          <tbody>

            {

              lowStock.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="no-data"
                  >

                    🎉 All medicines have healthy stock levels.

                  </td>

                </tr>

              ) : (

                lowStock.map((medicine) => (

                  <tr key={medicine.id}>

                    <td>

                      {medicine.name}

                    </td>

                    <td>

                      {medicine.stock}

                    </td>

                    <td>

                      {medicine.minStock}

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </section>

    </div>

  );

}

export default Reports;