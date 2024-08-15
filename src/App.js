// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./components/common/HomePage";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import FooterComponent from "./components/common/Footer";
import UserService from "./components/service/UserService";
import UpdateUser from "./components/userspage/UpdateUser";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import { AuthProvider } from "../src/components/Context/AuthContext"; // اضافه کردن AuthProvider

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* اضافه کردن AuthProvider */}
      <BrowserRouter>
        <div className="App bg-sky-800/80 min-h-screen">
          <Navbar />
          <div className="content p-4">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/register" element={<RegistrationPage />} />
              {UserService.adminOnly() && (
                <>
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route
                    path="/admin/user-management"
                    element={<UserManagementPage />}
                  />
                  <Route path="/update-user/:userId" element={<UpdateUser />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
