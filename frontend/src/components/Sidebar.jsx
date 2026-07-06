import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

import "../styles/Sidebar.css";

function Sidebar() {

  const [open, setOpen] = useState(false);

  function closeSidebar() {

    setOpen(false);

  }

  return (

    <>

      {/* ===============================
              MOBILE MENU BUTTON
      =============================== */}

      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(true)}
      >

        <Menu size={28} />

      </button>

      {/* ===============================
                BACKDROP
      =============================== */}

      {

        open &&

        <div

          className="sidebar-overlay"

          onClick={closeSidebar}

        />

      }

      {/* ===============================
                SIDEBAR
      =============================== */}

      <aside

        className={`sidebar ${open ? "show" : ""}`}

      >

        {/* Close Button */}

        <button

          className="close-sidebar"

          onClick={closeSidebar}

        >

          <X size={24} />

        </button>

        {/* ===============================
                  LOGO
        =============================== */}

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

        {/* ===============================
                  MENU
        =============================== */}

        <nav className="sidebar-menu">

          <NavLink

            to="/dashboard"

            onClick={closeSidebar}

            className={({ isActive }) =>

              isActive

                ? "menu-item active"

                : "menu-item"

            }

          >

            <LayoutDashboard size={20} />

            Dashboard

          </NavLink>

          <NavLink

            to="/inventory"

            onClick={closeSidebar}

            className={({ isActive }) =>

              isActive

                ? "menu-item active"

                : "menu-item"

            }

          >

            <Package size={20} />

            Inventory

          </NavLink>

          <NavLink

            to="/ocr"

            onClick={closeSidebar}

            className={({ isActive }) =>

              isActive

                ? "menu-item active"

                : "menu-item"

            }

          >

            <ScanLine size={20} />

            Smart Scanner

          </NavLink>

          <NavLink

            to="/assistant"

            onClick={closeSidebar}

            className={({ isActive }) =>

              isActive

                ? "menu-item active"

                : "menu-item"

            }

          >

            <Bot size={20} />

            AI Pharmacist

          </NavLink>

          <NavLink

            to="/reports"

            onClick={closeSidebar}

            className={({ isActive }) =>

              isActive

                ? "menu-item active"

                : "menu-item"

            }

          >

            <BarChart3 size={20} />

            Reports

          </NavLink>
                    <NavLink

            to="/reports"

            onClick={closeSidebar}

            className={({ isActive }) =>

              isActive

                ? "menu-item active"

                : "menu-item"

            }

          >

            <BarChart3 size={20} />

            Reports

          </NavLink>

        </nav>

        {/* ===============================
                  SYSTEM STATUS
        =============================== */}

        <div className="sidebar-status">

          <div className="status-title">

            System Status

          </div>

          <div className="status-item">

            <CircleDot size={12} />

            Gemini AI Online

          </div>

        </div>

        {/* ===============================
                  BOTTOM
        =============================== */}

        <div className="sidebar-bottom">

          <NavLink

            to="/home"

            className="home-btn"

            onClick={closeSidebar}

          >

            <Home size={20} />

            Back to Home

          </NavLink>

          <div className="version">

            MediMind AI v1.0

          </div>

        </div>

      </aside>

    </>

  );

}

export default Sidebar;