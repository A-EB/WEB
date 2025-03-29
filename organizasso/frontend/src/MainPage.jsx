import { useState } from "react";
import "./MainPage.css";
import Asso from "./composants/Asso";
import NavigationPanel from "./composants/NavigationPanel";
import Signin from "./composants/Signin";

const MainPage = () => {
  // Page actuellement affichée (par défaut la page de login)
  const [pageActuelle, setPageActuelle] = useState("login"); 

  // État de connexion de l'utilisateur (connecté ou non)
  const [estConnecte, setEstConnecte] = useState(false); 

  // Nom d'utilisateur de la personne connectée
  const [utilisateur, setUtilisateur] = useState(""); 

  // Fonction appelée après connexion pour définir l'utilisateur et passer à la page Asso
  const connecterUtilisateur = (login) => {
    setUtilisateur(login); // Enregistre le nom d'utilisateur
    setEstConnecte(true);             // Met l'état "connecté" à vrai
    setPageActuelle("page_asso");     // Redirige vers la page d'association
  };

  // Fonction pour déconnecter l'utilisateur
  const deconnecterUtilisateur = () => {
    setUtilisateur("");             // Efface le nom d'utilisateur
    setEstConnecte(false);          // Met l'état "connecté" à faux
    setPageActuelle("page_connexion"); // Redirige vers la page de connexion
  };

  return (
    <div>
      {/* Affiche la page Asso uniquement si connecté */}
      {pageActuelle === "page_asso" && estConnecte ? (
        <Asso logout={deconnecterUtilisateur} user={utilisateur} />
      ) : (
        // Sinon affiche la page de connexion
        <div>
          <h1>Organiz-Asso</h1>
          <div className="container">
            {/* Panneau de navigation avec gestion connexion/déconnexion */}
            <NavigationPanel
              login={connecterUtilisateur}
              logout={deconnecterUtilisateur}
              isConnected={estConnecte}
            />
            {/* Formulaire de connexion */}
            <Signin />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
