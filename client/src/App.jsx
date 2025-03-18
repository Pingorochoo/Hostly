import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./utils/ProtectedRoute";
import Index from "./pages/Index";
import Place from "./pages/Place/Place";
import Bookings from "./pages/Bookings/Bookings";
import Places from "./pages/Places/Places";
import Profile from "./pages/Profile/Profile";
import apiUrl from "../config/api";
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route element={<ProtectedRoute redirectIfAuthenticated />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />}>
              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/bookings/:id?" element={<Bookings />} />
              <Route
                path="/account/places/:action?/:id?"
                element={<Places />}
              />
            </Route>
            <Route path="/place/:id" element={<Place />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
