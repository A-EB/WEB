
const Logout = ({ logout }) => {
  const handleClick = async () => {
    await fetch("http://localhost:8000/api/login", {
      method: "DELETE",
      credentials: "include",
    });
    logout();
  };

  return (
    <form>
      <button onClick={handleClick} type="button">Se déconnecter</button>
    </form>
  );
};

export default Logout;
