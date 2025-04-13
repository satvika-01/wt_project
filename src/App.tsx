import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Statistics from "./pages/Statistics.tsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/forgot-password"} element={<ForgotPassword />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/statistics"} element={<Statistics />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
