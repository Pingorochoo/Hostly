import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { useUser } from "./store";
import Account from "./pages/Account";
import ProtectedRoute from "./utils/ProtectedRoute";

axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute redirectIfAuthenticated/>}>
          <Route path="/login" element={!user?<Login />:<Navigate to="/"/>} />
          <Route path="/register" element={!user?<Register />:<Navigate to="/"/>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={user?<Account />:<Navigate to="/login"/>} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
