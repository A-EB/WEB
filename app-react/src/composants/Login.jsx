import { useState } from "react";

const Login = ({ login }) => {
  // État pour stocker les informations d'identification (login et mot de passe)
  const [credentials, setCredentials] = useState({ login: "", password: "" });

  // Fonction appelée à chaque changement dans les champs de saisie
  // Met à jour l'état "credentials" en fonction du champ modifié
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Fonction appelée lors de la soumission du formulaire
  // Empêche le comportement par défaut et transmet le login à la fonction "login" passée en prop
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    login(credentials.login); // Appelle la fonction de connexion avec le login saisi
  };

  return (
    // Formulaire de connexion
    <form onSubmit={handleSubmit}>
      <h2>Ouvrir une session</h2>

      {/* Champ de saisie pour le login */}
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={credentials.login}
        onChange={handleChange}
      />

      {/* Champ de saisie pour le mot de passe */}
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={credentials.password}
        onChange={handleChange}
      />

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
