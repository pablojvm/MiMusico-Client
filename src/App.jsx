import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IdentificationPage from "./pages/IdentificationPage";
import InstrumentsPage from "./pages/InstrumentsPages";
import GroupsPage from "./pages/GroupsPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import OwnReviewsPage from "./pages/OwnReviewsPage";
import Error404Page from "./pages/Error404Page";
import Error500Page from "./pages/Error500Page";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import OwnAdsPage from "./pages/OwnAdsPage";
import CreateAdPage from "./pages/CreateAdPage";
import OnlyPrivate from "./components/OnlyPrivate";
import OnlyAnonymous from "./components/OnlyAnonymous";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <main className="mm-main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/identification"
            element={
              <OnlyAnonymous>
                <IdentificationPage />
              </OnlyAnonymous>
            }
          />
          <Route path="/ads/instruments" element={<InstrumentsPage />} />
          <Route path="/ads/groups" element={<GroupsPage />} />
          <Route path="/ad/:adId" element={<AdDetailsPage />} />
          <Route
            path="/user-profile"
            element={
              <OnlyPrivate>
                <ProfilePage />
              </OnlyPrivate>
            }
          />
          <Route
            path="/own-ads"
            element={
              <OnlyPrivate>
                <OwnAdsPage />
              </OnlyPrivate>
            }
          />
          <Route
            path="/own-reviews"
            element={
              <OnlyPrivate>
                <OwnReviewsPage />
              </OnlyPrivate>
            }
          />
          <Route
            path="/new-ad"
            element={
              <OnlyPrivate>
                <CreateAdPage />
              </OnlyPrivate>
            }
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="*" element={<Error404Page />} />
          <Route path="/500" element={<Error500Page />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
