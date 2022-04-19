import "../styles/login.css";
import { useState, useEffect} from "react";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'

const Login: React.FC = () => {
  const LOGIN_URL = "/login";
  const { setAuth } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async (event) => {
    event.preventDefault();
    const userLoginData = {
      usrnm: user,
      pwd: pwd,
    };
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(userLoginData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;

      //setAuth Context and set cookies
      setAuth({usrnm: user , pass: pwd});
      Cookies.set('usrnm', user, { expires: 1 });
      setSuccess(true);
      setUser("");
      setPwd("");
    } catch (err) {
      if (!err) {
        setErrMsg("No Server Response");
       } else {
        console.log(JSON.stringify(err));
        setErrMsg("Wrong Username and Password Combination");
      }
    }
  }

  return (
  <>
  {success ? (
        <section className="login-section">
          <div className="login-div">
            <h1>Success!</h1>
            <br />
            <Link to="/randomapp">Go to App</Link>
          </div>
        </section>
      ) : (
    <section className="register-section">
      <div className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </div>
        <button type="submit"> Sign in </button>
      </form>
      <div className="login-div">
        Need Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </div>
    </section> )}
  </>
  );
};

export default Login;
