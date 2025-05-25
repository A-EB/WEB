import { useState } from "react";

const Signin = () => {
  const [credentials, setCredentials] = useState({ login: "", password: "", confirmPassword: "", isAdmin: false });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: credentials.login,
          password: credentials.password,
          isAdmin: credentials.isAdmin,
          isValidated: false, // <-- ajout : par défaut non validé
        }),
        
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur d'inscription");
      } else {
        setError("");
        alert("Inscription réussie !");
        // Optionally reset form here
        // setCredentials({ login: "", password: "", confirmPassword: "", isAdmin: false });
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>

      <input
        type="text"
        name="login"
        placeholder="Login"
        value={credentials.login}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={credentials.password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        value={credentials.confirmPassword}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Signin;
