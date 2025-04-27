import { useState } from "react";
import Asso from "./composants/Pages/Asso";
import NavigationPanel from "./composants/NavigationPanel";
import Signin from "./composants/Signin";
import Profil from "./composants/Pages/Profil";
import "./MainPage.css";

const MainPage = () => {
  const [pageActuelle, setPageActuelle] = useState("page_connexion"); // <-- corrigé ici
  const [estConnecte, setEstConnecte] = useState(false);
  const [utilisateur, setUtilisateur] = useState("");

  const connecterUtilisateur = (login) => {
    setUtilisateur(login);
    setEstConnecte(true);
    setPageActuelle("page_asso"); // --> envoie vers "page_asso" juste après connexion
  };

  const deconnecterUtilisateur = () => {
    setUtilisateur("");
    setEstConnecte(false);
    setPageActuelle("page_connexion");
  };

  return (
    <div>
      {pageActuelle === "page_asso" && estConnecte && (
        <Asso logout={deconnecterUtilisateur} user={utilisateur} setPageActuelle={setPageActuelle} />
      )}
      {pageActuelle === "page_profil" && estConnecte && (
        <Profil user={utilisateur} setPageActuelle={setPageActuelle} />
      )}
      {(pageActuelle === "page_connexion" || !estConnecte) && (
        <div>
          <h1>Organiz-Asso</h1>
          <div className="container">
            <NavigationPanel
              login={connecterUtilisateur}
              logout={deconnecterUtilisateur}
              isConnected={estConnecte}
            />
            <Signin />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
