import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./utils/ProtectedRoute";
import Index from "./pages/Index";

axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Index/>} />
        <Route element={<ProtectedRoute redirectIfAuthenticated/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
