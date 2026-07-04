import { Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";

import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import OCRScanner from "./pages/OCRScanner";
import Reports from "./pages/Reports";
import AIAssistant from "./pages/AIAssistant";

import MedicineAssistant from "./pages/MedicineAssistant";
import MedicineAnalysis from "./pages/MedicineAnalysis";
import CameraCapture from "./pages/CameraCapture";
import VoiceSearch from "./pages/VoiceSearch";
import TextSearch from "./pages/TextSearch";

import AppLayout from "./layout/AppLayout";

function App() {

  return (

    <Routes>

      {/* Public Pages */}

      <Route
        path="/"
        element={<Splash />}
      />

      

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/medicine-assistant"
        element={<MedicineAssistant />}
      />

      <Route
        path="/medicine-analysis"
        element={<MedicineAnalysis />}
      />

      <Route
        path="/camera"
        element={<CameraCapture />}
      />

      {/* Dashboard Layout */}

      <Route element={<AppLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/ocr"
          element={<OCRScanner />}
        />

        <Route
          path="/assistant"
          element={<AIAssistant />}
        />

        <Route
          path="/voice-search"
          element={<VoiceSearch />}
        />

        <Route
          path="/text-search"
          element={<TextSearch />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Route>

    </Routes>

  );

}

export default App;