import { useState, useEffect } from 'react';
import Header from '../Elements/Header';
import InfoZone from '../Elements/InfoZone';
import MessagesSection from '../Elements/MessagesSection';
import './Asso.css';

const Asso = ({ logout, user, setPageActuelle }) => {
  const [messages, setMessages] = useState([]);
  const [messagesAdmin, setMessagesAdmin] = useState([]);
  const [messagesFiltres, setMessagesFiltres] = useState([]);
  const [nouveauMessage, setNouveauMessage] = useState("");
  const [indexReponse, setIndexReponse] = useState(null);
  const [indexMenuOuvert, setIndexMenuOuvert] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentForum, setCurrentForum] = useState("open");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectedAdminsToRemove, setSelectedAdminsToRemove] = useState([]);

  const toggleSelectAdminToRemove = (id) => {
    if (selectedAdminsToRemove.includes(id)) {
      setSelectedAdminsToRemove(selectedAdminsToRemove.filter(adminId => adminId !== id));
    } else {
      setSelectedAdminsToRemove([...selectedAdminsToRemove, id]);
    }
  };
  
  const revokeAdminRights = async () => {
    for (const userId of selectedAdminsToRemove) {
      await fetch(`http://localhost:8000/api/user/revoke/${userId}`, {
        method: "PATCH",
        credentials: "include",
      });
    }
    fetchData();
    setSelectedAdminsToRemove([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSelectAdmin = (id) => {
    if (selectedAdmins.includes(id)) {
      setSelectedAdmins(selectedAdmins.filter(adminId => adminId !== id));
    } else {
      setSelectedAdmins([...selectedAdmins, id]);
    }
  };
  
  const promoteToAdmin = async () => {
    for (const userId of selectedAdmins) {
      await fetch(`http://localhost:8000/api/user/promote/${userId}`, {
        method: "PATCH",
        credentials: "include",
      });
    }
    fetchData();
    setSelectedAdmins([]);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/messages", { credentials: "include" });
      const data = await response.json();
      setMessages(data);
      setMessagesFiltres(data);

      const resUser = await fetch("http://localhost:8000/api/user", { credentials: "include" });
      const userData = await resUser.json();
      const currentUser = userData.find(u => u.login === user);
      if (currentUser?.isAdmin) {
        setIsAdmin(true);

        const resAdmin = await fetch("http://localhost:8000/api/messages/admin", { credentials: "include" });
        const adminMessages = await resAdmin.json();
        setMessagesAdmin(adminMessages);
      }

      setUsers(userData);
    } catch (err) {
      console.error("Erreur chargement :", err);
    }
  };

  const deco = async () => {
    await fetch("http://localhost:8000/api/login", { method: "DELETE", credentials: "include" });
    logout();
  };

  const ajouterMessage = async () => {
    if (nouveauMessage.trim() === "") return;

    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: nouveauMessage, forum: currentForum }),
      });
      const data = await response.json();

      if (response.ok) {
        if (currentForum === "open") {
          setMessages([data, ...messages]);
          setMessagesFiltres([data, ...messages]);
        } else {
          setMessagesAdmin([data, ...messagesAdmin]);
        }
        setNouveauMessage("");
        setIndexReponse(null);
      } else {
        alert(data.message || "Erreur d’envoi");
      }
    } catch (err) {
      alert("Erreur serveur");
    }
  };

  const supprimerMessage = async (indexASupprimer) => {
    const targetList = currentForum === "open" ? messages : messagesAdmin;
    const messageToDelete = targetList[indexASupprimer];
  
    if (!messageToDelete) return;
  
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce message ?");
    if (!confirmation) return;
  
    try {
      const response = await fetch(`http://localhost:8000/api/messages/${messageToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        const updated = targetList.filter((_, index) => index !== indexASupprimer);
        if (currentForum === "open") {
          setMessages(updated);
          setMessagesFiltres(updated);
        } else {
          setMessagesAdmin(updated);
        }
        setIndexMenuOuvert(null);
      } else {
        const data = await response.json();
        alert(data.message || "Erreur suppression du message");
      }
    } catch (err) {
      console.error("Erreur suppression message :", err);
      alert("Erreur serveur lors de la suppression");
    }
  };

  const basculerMenu = (index) => {
    setIndexMenuOuvert(indexMenuOuvert === index ? null : index);
  };

  const repondreMessage = (index) => {
    setIndexReponse(index);
    setIndexMenuOuvert(null);
  };

  const rechercherMessages = () => {
    if (!dateDebut || !dateFin) {
      setMessagesFiltres(currentForum === "open" ? messages : messagesAdmin);
      return;
    }
    const source = currentForum === "open" ? messages : messagesAdmin;
    const resultat = source.filter((msg) => msg.date >= dateDebut && msg.date <= dateFin);
    setMessagesFiltres(resultat);
  };

  const toggleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const validerUtilisateurs = async () => {
    for (const userId of selectedUsers) {
      await fetch(`http://localhost:8000/api/user/validate/${userId}`, {
        method: "PATCH",
        credentials: "include",
      });
    }
    fetchData();
    setSelectedUsers([]);
  };


  return (
    <>
     <Header
        deco={deco}
        dateDebut={dateDebut}
        setDateDebut={setDateDebut}
        dateFin={dateFin}
        setDateFin={setDateFin}
        rechercherMessages={rechercherMessages}
        setPageActuelle={setPageActuelle}
        pageActuelle="page_asso" 
      />
      <main>
      <InfoZone
        users={users}
        isAdmin={isAdmin}
        selectedUsers={selectedUsers}
        toggleSelectUser={toggleSelectUser}
        validerUtilisateurs={validerUtilisateurs}
        promoteToAdmin={promoteToAdmin}
        selectedAdmins={selectedAdmins}        
        toggleSelectAdmin={toggleSelectAdmin}    
        selectedAdminsToRemove={selectedAdminsToRemove}         
        toggleSelectAdminToRemove={toggleSelectAdminToRemove}   
        revokeAdminRights={revokeAdminRights}
        currentUser={user}  
      />
        <MessagesSection
          messagesFiltres={messagesFiltres}
          nouveauMessage={nouveauMessage}
          setNouveauMessage={setNouveauMessage}
          ajouterMessage={ajouterMessage}
          indexMenuOuvert={indexMenuOuvert}
          basculerMenu={basculerMenu}
          supprimerMessage={supprimerMessage}
          indexReponse={indexReponse}
          repondreMessage={repondreMessage}
          user={user} 
        />
      </main>
    </>
  );
};

export default Asso;
