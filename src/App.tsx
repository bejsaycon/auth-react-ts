import Login from "./components/Login";
import RandomApp from "./components/RandomApp";
import { Register } from "./components/Register";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./RequireAuth";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import RequireLogout from "./RequireLogout";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import Home from "./components/Home";

function App() {
  const { setAuth } = useAuth();

  const readCookie = () => {
    const username = Cookies.get("usrnm");
    if (username) {
      setAuth({ usrnm: username, pass: "vibe-check-xd" });
    }
  };

  //When the component loads, read cookie
  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* we want to protect these routes by logging out */}
          <Route element={<RequireLogout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* we want to protect these routes by logging in  */}
          <Route element={<RequireAuth />}>
            <Route path="randomapp" element={<RandomApp />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>

      {/* <Register />
      <Login /> */}
    </div>
  );
}

export default App;
