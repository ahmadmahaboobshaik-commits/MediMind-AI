import { useNavigate } from "react-router-dom";
import {
  Pill,
  Bot,
  ScanSearch,
  Package,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BrainCircuit,
  Mic,
} from "lucide-react";

import "../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home">

      <div className="bg-gradient"></div>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-left">

          <div className="hero-tag">

            <Sparkles size={18} />

            <span>AI Powered Healthcare Platform</span>

          </div>

          <h1>

            MediMind AI

          </h1>

          <h2>

            The Future of Intelligent
            Pharmacy Management

          </h2>

          <p>

            Manage inventory, identify medicines,
            analyze prescriptions, scan labels using OCR,
            interact with an AI Pharmacist and monitor
            pharmacy operations from one intelligent platform.

          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
            >

              Open Dashboard

              <ArrowRight size={18} />

            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/medicine-assistant")}
            >

              Try AI Pharmacist

            </button>

          </div>

          <div className="stats">

            <div>

              <h3>6+</h3>

              <span>AI Features</span>

            </div>

            <div>

              <h3>100%</h3>

              <span>Smart Automation</span>

            </div>

            <div>

              <h3>24×7</h3>

              <span>AI Assistance</span>

            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-glass">

            <div className="hero-icon">

              <Pill size={90} />

            </div>

            <h2>

              Smart Medicine Recognition

            </h2>

            <p>

              Identify medicines using
              Camera, OCR, Voice,
              Upload or Text Search
              within seconds.

            </p>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="feature-section">

        <h2>

          Everything You Need
          In One Platform

        </h2>

        <p>

          Built specially for modern pharmacies
          and healthcare professionals.

        </p>

        <div className="feature-grid">

          <div className="feature-card">

            <Bot size={38} />

            <h3>

              AI Pharmacist

            </h3>

            <p>

              Get intelligent medicine
              recommendations instantly.

            </p>

          </div>

          <div className="feature-card">

            <ScanSearch size={38} />

            <h3>

              Smart Scanner

            </h3>

            <p>

              Scan medicines using
              OCR and AI Vision.

            </p>

          </div>

          <div className="feature-card">

            <Mic size={38} />

            <h3>

              Voice Search

            </h3>

            <p>

              Search medicines using
              natural voice commands.

            </p>

          </div>

          <div className="feature-card">

            <Package size={38} />

            <h3>

              Inventory

            </h3>

            <p>

              Smart stock management
              with expiry monitoring.

            </p>

          </div>
                    <div className="feature-card">

            <BarChart3 size={38} />

            <h3>

              Reports & Analytics

            </h3>

            <p>

              Generate inventory reports,
              export PDF & Excel,
              and monitor business performance.

            </p>

          </div>

          <div className="feature-card">

            <BrainCircuit size={38} />

            <h3>

              Medicine Intelligence

            </h3>

            <p>

              AI understands medicine images,
              labels and user questions
              in seconds.

            </p>

          </div>

          <div className="feature-card">

            <ShieldCheck size={38} />

            <h3>

              Safe & Secure

            </h3>

            <p>

              Designed to help pharmacies
              improve safety, efficiency
              and medicine management.

            </p>

          </div>

        </div>

      </section>

      {/* ================= MODULES ================= */}

      <section className="modules">

        <div className="module-card">

          <Pill size={55} />

          <h2>

            Pharmacy Management

          </h2>

          <p>

            Complete inventory management,
            smart dashboard, reports,
            expiry alerts and stock monitoring.

          </p>

          <button
            onClick={() => navigate("/dashboard")}
          >

            Open Dashboard

          </button>

        </div>

        <div className="module-card">

          <Bot size={55} />

          <h2>

            Medicine Intelligence

          </h2>

          <p>

            Camera Scanner,
            OCR,
            Voice Search,
            Text Search,
            AI Pharmacist
            and Medicine Analysis.

          </p>

          <button
            onClick={() => navigate("/medicine-assistant")}
          >

            Launch Assistant

          </button>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="cta">

        <h2>

          Ready to Experience
          AI-Powered Pharmacy?

        </h2>

        <p>

          Discover how MediMind AI
          simplifies pharmacy management,
          improves medicine identification
          and empowers healthcare professionals.

        </p>

        <button
          onClick={() => navigate("/dashboard")}
        >

          Get Started

          <ArrowRight size={18} />

        </button>

      </section>

      {/* ================= FOOTER ================= */}

      <footer>

        <h2>

          MediMind AI

        </h2>

        <p>

          Intelligent Pharmacy Management &
          Medicine Assistant powered by Artificial Intelligence.

        </p>

        <span>

          © 2026 MediMind AI • Built for Smarter Pharmacies

        </span>

      </footer>

    </div>

  );

}

export default Home;