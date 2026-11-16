import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import CityDetail from "./pages/CityDetail";
import TripPlanner from "./pages/TripPlanner";
import MapPage from "./pages/MapPage";
import Activities from "./pages/Activities";
import SupabaseCheck from "./pages/SupabaseCheck";
import MyTrips from "./pages/MyTrips";
import Account from "./pages/Account";
import BudgetPlanner from "./pages/BudgetPlanner";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { TripProvider } from "./context/TripContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
    <TripProvider>
      <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/villes" element={<Cities />} />
              <Route path="/villes/:id" element={<CityDetail />} />
              <Route path="/activites" element={<Activities />} />
              <Route path="/carte" element={<MapPage />} />
              <Route path="/planner" element={<TripPlanner />} />
              <Route path="/budget" element={<BudgetPlanner />} />
              <Route path="/mes-voyages" element={<MyTrips />} />
              <Route path="/compte" element={<Account />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/test-supabase" element={<SupabaseCheck />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      </AuthProvider>
    </TripProvider>
    </LanguageProvider>
  );
}
