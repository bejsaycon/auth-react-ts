import { useState } from "react";
import { InputForm } from "./InputForm";
import "../styles/randomapp.css";
import { Welcome } from "./Welcome";
import { useFetch } from "../hooks/useFetch";
import { OutputCard } from "./OutputCard";
import { UserData, Results } from "./IfcFetchedData";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";
import { useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const RandomApp = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [seed, setSeed] = useState("");
  const url: string = `https://randomuser.me/api/?seed=${seed}`; 
  const data: UserData = useFetch(url); 
  const defVal: Results = useProfile();

  const handleLogout = async () => {
    await Cookies.remove('usrnm');
    await Cookies.remove('pwd');
    setAuth(null);
    navigate('/');
}
  return (
    <div className="container">
      <InputForm setSeed={setSeed} />
      {seed === "" ? <Welcome /> : <OutputCard usersData={data.results? data.results[0] : defVal} />}
      <button className="randomapp-logout" onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default RandomApp;
