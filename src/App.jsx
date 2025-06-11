import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { Routes, Route} from "react-router-dom";
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

function App() {

  return (
    <>
    <NavBar />

    <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/identification" element={<IdentificationPage />} />
          <Route path="/ads/instruments" element={<InstrumentsPage />} />
          <Route path="/ads/groups" element={<GroupsPage />} />
          <Route path="/ads/:adId" element={<AdDetailsPage />} />
          <Route path="/user-profile" element={<ProfilePage />} />
          <Route path="/own-rewiews" element={<OwnReviewsPage/>} />
          
          <Route path="*" element={<Error404Page />} />
          <Route path="/500" element={<Error500Page />} />

        </Routes>
        </>
  )
}

export default App
