import { useEffect, useState } from 'react';
import Header from '../Elements/Header';     
import './Asso.css';
import './Profil.css';     

const Profil = ({ user, setPageActuelle }) => {
  const [userData, setUserData] = useState(null);
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const supprimerProfil = async () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte et tous vos messages ? Cette action est irréversible !");
    if (!confirmation) return;
  
    try {
      await fetch(`http://localhost:8000/api/messages/user/${user}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      await fetch(`http://localhost:8000/api/user/${user}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      alert("Votre compte et vos messages ont été supprimés.");
      setPageActuelle("page_connexion");
  
    } catch (err) {
      console.error("Erreur suppression profil :", err);
      alert("Erreur lors de la suppression du profil.");
    }
  };
  
  const fetchUserDetails = async () => {
    try {
      const resUser = await fetch("http://localhost:8000/api/user", { credentials: "include" });
      const users = await resUser.json();
      const currentUser = users.find(u => u.login === user);
      setUserData(currentUser);

      const resMessages = await fetch("http://localhost:8000/api/messages", { credentials: "include" });
      const allMessages = await resMessages.json();
      const myMessages = allMessages.filter(msg => msg.owner === user);
      setUserMessages(myMessages);
    } catch (err) {
      console.error("Erreur récupération profil :", err);
    }
  };

  if (!userData) return <div>Chargement...</div>;

  return (
    <>
      <Header
        deco={() => setPageActuelle("page_connexion")}
        dateDebut=""
        setDateDebut={() => {}}
        dateFin=""
        setDateFin={() => {}}
        rechercherMessages={() => {}}
        setPageActuelle={setPageActuelle}
        pageActuelle="page_profil" 
      />
      <main>
        <aside className="info-zone">
          <strong>Mon Profil</strong>
          <ul>
            <li><strong>Login :</strong> {userData.login}</li>
            <li><strong>Admin :</strong> {userData.isAdmin ? "Oui" : "Non"}</li>
            <li><strong>Validé :</strong> {userData.isValidated ? "Oui" : "Non"}</li>
          </ul>
          <button className="btn-retour" onClick={() => setPageActuelle("page_asso")}>⬅ Retour au Forum</button>
        </aside>

        <section className="messages">
          <h2>Mes Messages</h2>
          <div className="message-list">
            {userMessages.length === 0 ? (<p>Aucun message.</p>) : (
              userMessages.map((msg) => (
                <div className="message" key={msg._id}>
                  <p>{msg.date}</p>
                  <p>{msg.content}</p>
                </div>
              )))}
          </div>
          <button className="btn-supprimer" onClick={supprimerProfil}>Supprimer mon compte</button>
        </section>
      </main>
    </>
  );
};

export default Profil;