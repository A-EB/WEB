import { useState } from "react";

const Signin = () => {
  // État pour stocker les informations saisies par l'utilisateur : login, mot de passe et confirmation du mot de passe
  const [credentials, setCredentials] = useState({ login: "", password: "", confirmPassword: "" });

  // État pour stocker un éventuel message d'erreur (ex : mots de passe différents)
  const [error, setError] = useState("");

  // Fonction qui gère les changements dans les champs du formulaire
  // Met à jour l'état "credentials" selon le champ modifié
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie si le mot de passe et sa confirmation sont identiques
    if (credentials.password !== credentials.confirmPassword) {
      setError("Les mots de passe ne correspondent pas"); // Affiche un message d'erreur si les mots de passe ne sont pas identiques
    } else {
      setError(""); // Réinitialise le message d'erreur
      alert("Inscription réussie"); // Affiche une alerte pour confirmer l'inscription
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>

      {/* Champ pour saisir le login */}
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={credentials.login}
        onChange={handleChange}
      />

      {/* Champ pour saisir le mot de passe */}
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={credentials.password}
        onChange={handleChange}
      />

      {/* Champ pour confirmer le mot de passe */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        value={credentials.confirmPassword}
        onChange={handleChange}
      />

      {/* Affichage du message d'erreur si présent */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Signin;
