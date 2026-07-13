import { useNavigate } from "react-router-dom";

import {
  Pill,
  Package,
  AlertTriangle,
  Wallet,
  ScanSearch,
  Bot,
  FileBarChart,
  Brain,
  ShieldCheck,
  Activity,
} from "lucide-react";

import { useMedicines } from "../context/MedicineContext";
import AIAdvisor from "../components/AIAdvisor";
import StatCard from "../components/StatCard";

import {
  getTotalMedicines,
  getLowStockMedicines,
  getExpiringMedicines,
  getExpiredMedicines,
  getInventoryValue,
} from "../services/medicineService";

import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const { medicines } = useMedicines();

  const totalMedicines = getTotalMedicines(medicines);

  const lowStock = getLowStockMedicines(medicines).length;

  const expiringSoon = getExpiringMedicines(medicines).length;

  const expired = getExpiredMedicines(medicines).length;

  const inventoryValue = getInventoryValue(medicines);

  let healthScore = 100;

  healthScore -= lowStock * 5;
  healthScore -= expiringSoon * 4;
  healthScore -= expired * 10;

  if (healthScore < 0) healthScore = 0;

  return (

    <div className="page-content">

      {/* HERO */}

      <section className="dashboard-hero">

        <div>

          <span className="hero-tag">

            🧠 AI Pharmacy Command Center

          </span>

          <h1>

            Welcome to MediMind AI 👋

          </h1>

          <p>

            Real-time inventory intelligence, AI medicine recognition,
            pharmacy analytics and smart inventory monitoring.

          </p>

        </div>

      </section>
      <AIAdvisor/>

      {/* CARDS */}

      <div className="cards">

        <StatCard
          icon={<Pill size={32} />}
          title="Total Medicines"
          value={totalMedicines}
          subtitle="Registered medicines"
          color="#DBEAFE"
        />

        <StatCard
          icon={<AlertTriangle size={32} />}
          title="Expiring Soon"
          value={expiringSoon}
          subtitle="Within next 30 days"
          color="#FEF3C7"
        />

        <StatCard
          icon={<Package size={32} />}
          title="Low Stock"
          value={lowStock}
          subtitle="Needs restocking"
          color="#DCFCE7"
        />

        <StatCard
          icon={<Wallet size={32} />}
          title="Inventory Value"
          value={`₹${inventoryValue.toLocaleString()}`}
          subtitle="Current stock value"
          color="#EDE9FE"
        />

      </div>

      {/* HEALTH */}

      <section className="health-card">

        <div className="health-left">

          <h2>

            🏥 Pharmacy Health Score

          </h2>

          <p>

            Based on stock availability, expiry risk and inventory status.

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
                width: `${healthScore}%`,
              }}
            />

          </div>

        </div>

      </section>

      {/* AI INSIGHTS */}

      <section className="insights">

        <h2>

          <Brain size={26} />

          AI Insights

        </h2>

        <div className="insight-grid">

          <div className="insight-card">

            <AlertTriangle size={24} />

            <h3>

              Expiry Alert

            </h3>

            <p>

              {expiringSoon === 0
                ? "Excellent! No medicines are expiring soon."
                : `${expiringSoon} medicines require attention before expiry.`}

            </p>

          </div>

          <div className="insight-card">

            <Package size={24} />

            <h3>

              Inventory

            </h3>

            <p>

              {lowStock === 0
                ? "Inventory levels are healthy."
                : `${lowStock} medicines should be restocked soon.`}

            </p>

          </div>

          <div className="insight-card">

            <Wallet size={24} />

            <h3>

              Inventory Value

            </h3>

            <p>

              Current inventory worth

              <strong>

                {" "}₹{inventoryValue.toLocaleString()}

              </strong>

            </p>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}

      <section className="quick-section">

        <h2>

          ⚡ Quick Actions

        </h2>

        <div className="quick-grid">

          <button onClick={() => navigate("/inventory")}>

            <Package size={30} />

            <span>Inventory</span>

            <small>

              Manage medicines

            </small>

          </button>

          <button onClick={() => navigate("/ocr")}>

            <ScanSearch size={30} />

            <span>Smart Scanner</span>

            <small>

              OCR & AI Scan

            </small>

          </button>

          <button onClick={() => navigate("/assistant")}>

            <Bot size={30} />

            <span>AI Pharmacist</span>

            <small>

              Ask Gemini

            </small>

          </button>

          <button onClick={() => navigate("/reports")}>

            <FileBarChart size={30} />

            <span>Reports</span>

            <small>

              Export analytics

            </small>

          </button>

        </div>

      </section>

      {/* SYSTEM STATUS */}

      <section className="system-status">

        <h2>

          <Activity size={22} />

          System Status

        </h2>

        <div className="status-grid">

          <div className="status-item">

            <ShieldCheck size={22} />

            Gemini AI Online

          </div>

          <div className="status-item">

            <ShieldCheck size={22} />

            OCR Ready

          </div>

          <div className="status-item">

            <ShieldCheck size={22} />

            Inventory Synced

          </div>

        </div>

      </section>

    </div>

  );

}

export default Dashboard;