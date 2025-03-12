import { useState } from "react";

const Login = ({ login }) => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.login); // Appelle la fonction passée avec le login saisi
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ouvrir une session</h2>
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
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
