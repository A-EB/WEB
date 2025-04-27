import { useState } from "react";

const Login = ({ login }) => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        if (data.isValidated) {
          login(data.login);
        } else {
          alert("Votre compte n'est pas encore validé par un administrateur.");
        }
      }
      else {
        alert(data.message || "Erreur d'identifiants");
      }
    } catch (err) {
      alert("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ouvrir une session</h2>
      <input type="text" name="login" placeholder="Login" value={credentials.login} onChange={handleChange} />
      <input type="password" name="password" placeholder="Mot de passe" value={credentials.password} onChange={handleChange} />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
