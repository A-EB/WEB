import { useState } from "react";
import "./MainPage.css";
import Asso from "./composants/Asso";
import NavigationPanel from "./composants/NavigationPanel";
import Signin from "./composants/Signin";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState("login"); 
  const [isConnected, setIsConnected] = useState(false); 
  const [user, setUser] = useState(""); 

  const getConnected = (userLogin) => {
    setUser(userLogin); 
    setIsConnected(true); 
    setCurrentPage("asso_page"); 
  };

  const setLogout = () => {
    setUser("");
    setIsConnected(false);
    setCurrentPage("signin_page"); 
  };

  return (
    <div>
      {currentPage === "asso_page" && isConnected ? (<Asso logout={setLogout} user={user} /> ) : (
        <div>
          <h1>Organiz-Asso</h1>
          <div className="container">
            <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} />
            <Signin />
          </div>
        </div>)
      }
    </div>
  );
};

export default MainPage;
