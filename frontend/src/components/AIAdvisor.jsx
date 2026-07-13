import {
  BrainCircuit,
  TriangleAlert,
  ShieldCheck,
  TrendingUp,
  Package,
  IndianRupee,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { useMedicines } from "../context/MedicineContext";
import { generateAdvisor } from "../services/advisorService";

import "./AIAdvisor.css";

function AIAdvisor() {

  const { medicines } = useMedicines();

  const advisor = generateAdvisor(medicines);

  return (

    <section className="advisor-card">

      {/* Header */}

      <div className="advisor-header">

        <div className="advisor-icon">

          <BrainCircuit size={34} />

        </div>

        <div>

          <h2>

            AI Pharmacy Advisor

          </h2>

          <p>

            Smart insights generated from your pharmacy inventory

          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="advisor-grid">

        <div className="advisor-box">

          <ShieldCheck size={28} />

          <h3>

            {advisor.healthScore}%

          </h3>

          <span>

            Inventory Health

          </span>

        </div>

        <div className="advisor-box">

          <TriangleAlert size={28} />

          <h3>

            {advisor.lowStock}

          </h3>

          <span>

            Low Stock Medicines

          </span>

        </div>

        <div className="advisor-box">

          <TrendingUp size={28} />

          <h3>

            {advisor.expiringSoon}

          </h3>

          <span>

            Expiring Soon

          </span>

        </div>

        <div className="advisor-box">

          <Package size={28} />

          <h3>

            {advisor.expired}

          </h3>

          <span>

            Expired Medicines

          </span>

        </div>

        <div className="advisor-box">

          <IndianRupee size={28} />

          <h3>

            ₹{advisor.inventoryValue.toLocaleString()}

          </h3>

          <span>

            Inventory Value

          </span>

        </div>

        <div className="advisor-box danger">

          <IndianRupee size={28} />

          <h3>

            ₹{advisor.riskValue.toLocaleString()}

          </h3>

          <span>

            Inventory At Risk

          </span>

        </div>

      </div>

      {/* Recommendation */}

      <div className="advisor-recommendation">

        <div className="recommend-header">

          <Sparkles size={24} />

          <h3>

            AI Recommendation

          </h3>

        </div>

        <p>

          {advisor.recommendation}

        </p>

      </div>

      {/* Restock List */}

      <div className="advisor-actions">

        <h3>

          Recommended Actions

        </h3>

        {

          advisor.restockList.length === 0 ? (

            <div className="action-item">

              <CheckCircle2 size={18} />

              Inventory is healthy. No medicines require immediate restocking.

            </div>

          ) : (

            advisor.restockList.map((medicine, index) => (

              <div
                key={index}
                className="action-item"
              >

                <CheckCircle2 size={18} />

                Restock

                <strong>

                  {medicine}

                </strong>

              </div>

            ))

          )

        }

      </div>

    </section>

  );

}

export default AIAdvisor;