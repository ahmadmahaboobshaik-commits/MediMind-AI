import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import "../styles/Dashboard.css";

function Layout() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;