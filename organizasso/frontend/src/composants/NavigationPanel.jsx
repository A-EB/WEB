import Login from "./Login";

const NavigationPanel = ({ login, logout, isConnected }) => {
  return (
    <nav>
      {<Login login={login} />}
    </nav>
  );
};

export default NavigationPanel;