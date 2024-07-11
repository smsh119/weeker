import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import LoginPage from "./components/loginPage/LoginPage";
import RegistrationPage from "./components/registrationPage/RegistrationPage";
import Routine from "./components/routinePage/Routine";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/routine" element={<Routine />} />
      </Routes>
    </>
  );
}

export default App;
