import Login from "./Login";
import Logout from "./Logout";

const NavigationPanel = ({ login, logout, isConnected }) => {
  return (
    <nav>
      {isConnected ? <Logout logout={logout} /> : <Login login={login} />}
    </nav>
  );
};

export default NavigationPanel;