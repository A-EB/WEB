import { useState } from "react";

const Signin = () => {
  const [credentials, setCredentials] = useState({ login: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      setError("");
      alert("Inscription réussie");
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
