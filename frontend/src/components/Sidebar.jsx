import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ScanLine,
  Bot,
  BarChart3,
  Home,
  BrainCircuit,
  CircleDot,
} from "lucide-react";

import "../styles/Sidebar.css";

function Sidebar() {

  return (

    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-circle">

          <BrainCircuit size={34} />

        </div>

        <h2>

          MediMind AI

        </h2>

        <p>

          AI Pharmacy Platform

        </p>

      </div>

      {/* Menu */}

      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >

          <LayoutDashboard size={20} />

          Dashboard

        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >

          <Package size={20} />

          Inventory

        </NavLink>

        <NavLink
          to="/ocr"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >

          <ScanLine size={20} />

          Smart Scanner

        </NavLink>

        <NavLink
          to="/assistant"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >

          <Bot size={20} />

          AI Pharmacist

        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >

          <BarChart3 size={20} />

          Reports

        </NavLink>

      </nav>

      {/* AI Status */}

      <div className="sidebar-status">

        <div className="status-title">

          System Status

        </div>

        <div className="status-item">

          <CircleDot size={12} />

          Gemini AI Online

        </div>

      </div>

      {/* Bottom */}

      <div className="sidebar-bottom">

        <NavLink
          to="/home"
          className="home-btn"
        >

          <Home size={20} />

          Back to Home

        </NavLink>

        <div className="version">

          MediMind AI v1.0

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;