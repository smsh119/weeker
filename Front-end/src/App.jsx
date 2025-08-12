import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import LoginPage from "./components/loginPage/LoginPage";
import Logout from "./components/logout/logout";
import RegistrationPage from "./components/registrationPage/RegistrationPage";
import Routine from "./components/routinePage/Routine";
import SettingsPage from "./components/settingsPage/settingsPage";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/routine" element={<Routine />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
