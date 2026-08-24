import { Navigate, Route, Routes, useLocation } from "react-router";
import { Toaster } from "sonner";
import Footer from "./components/common/Footer";
import ForgotPasswordPage from "./components/loginPage/ForgotPasswordPage";
import Header from "./components/common/Header";
import LoginPage from "./components/loginPage/LoginPage";
import Logout from "./components/logout/logout";
import RegistrationPage from "./components/registrationPage/RegistrationPage";
import ResetPasswordPage from "./components/loginPage/ResetPasswordPage";
import Routine from "./components/routinePage/Routine";
import SettingsPage from "./components/settingsPage/settingsPage";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import VerifyEmailPage from "./components/verifyPage/VerifyEmailPage";

function App() {
  const { pathname } = useLocation();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/routine" element={<Routine />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      {!isAuthPage && <Footer />}
      <Toaster theme="dark" position="top-center" />
    </>
  );
}

export default App;
