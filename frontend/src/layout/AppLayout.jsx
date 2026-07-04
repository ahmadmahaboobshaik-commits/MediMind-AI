import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Dashboard.css";

function AppLayout() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Header />

        <Outlet />

      </div>

    </div>
  );
}

export default AppLayout;