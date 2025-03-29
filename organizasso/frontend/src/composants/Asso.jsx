
import { useState, useEffect } from 'react';
import './Asso.css';

const Asso = ({ logout, user }) => {
  const [messages, setMessages] = useState([]);
  const [messagesFiltres, setMessagesFiltres] = useState([]);
  const [nouveauMessage, setNouveauMessage] = useState("");
  const [indexReponse, setIndexReponse] = useState(null);
  const [indexMenuOuvert, setIndexMenuOuvert] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  useEffect(() => {
    setMessagesFiltres(messages);
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/messages", {
          credentials: "include"
        });
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error("Erreur de chargement des messages", err);
      }
    };
    fetchMessages();
  }, []);

  const deco = async () => {
    await fetch("http://localhost:8000/api/login", {method: "DELETE",credentials: "include",});
    logout();
  };

  const ajouterMessage = async () => {
    if (nouveauMessage.trim() === "") return;

    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: nouveauMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages([data, ...messages]);
        setNouveauMessage("");
        setIndexReponse(null);
      } else {
        alert(data.message || "Erreur d’envoi");
      }
    } catch (err) {
      alert("Erreur serveur");
    }
  };

  const supprimerMessage = (indexASupprimer) => {
    const messagesMisAJour = messages.filter((_, index) => index !== indexASupprimer);
    setMessages(messagesMisAJour);
    setIndexMenuOuvert(null);
  };

  const repondreMessage = (index) => {
    setIndexReponse(index);
    setIndexMenuOuvert(null);
  };

  const basculerMenu = (index) => {
    setIndexMenuOuvert(indexMenuOuvert === index ? null : index);
  };

  const rechercherMessages = () => {
    if (!dateDebut || !dateFin) {
      setMessagesFiltres(messages);
      return;
    }
    const resultat = messages.filter((msg) => msg.date >= dateDebut && msg.date <= dateFin);
    setMessagesFiltres(resultat);
  };

  return (
    <>
      <header>
        <div className='logo'><img className='pic' src='logo.png' alt='Logo' /> Organiz-Asso</div>
        <div className='search'>
          <input type='text' placeholder='Rechercher...' disabled />
          <input type='date' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
          <input type='date' value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
          <button onClick={rechercherMessages}>Rechercher</button>
        </div>
        <div>
          <button className='deconnexion' onClick={deco}>Déconnexion</button>
        </div>
      </header>
      <main>
        <aside className='info-zone'><strong>Zone Informations</strong></aside>
        <section className='messages'>
          <div className='new-message'>
            <input type='text' placeholder='Écrire un nouveau message...' value={nouveauMessage} onChange={(e) => setNouveauMessage(e.target.value)} />
            <button onClick={ajouterMessage}>Ajouter</button>
          </div>
          <div className='message-list'>
            {messagesFiltres.map((msg, index) => (
              <div className='message' key={index} style={{ position: 'relative' }}>
                <p><strong>User:@</strong>{msg.owner} · <strong>Date:</strong> {msg.date}</p>
                <p>{msg.content}</p>
                <button className="menu" onClick={() => basculerMenu(index)} style={{ position: 'absolute', top: '5px', right: '5px' }}>⋮</button>
                {indexMenuOuvert === index && (
                  <div style={{ position: 'absolute', top: '30px', right: '5px', backgroundColor: 'black', border: '1px solid #ccc', borderRadius: '5px', zIndex: 1000, padding: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <button onClick={() => supprimerMessage(index)} style={{ color: 'white', background: 'none' }}>Supprimer</button>
                    <button onClick={() => repondreMessage(index)} style={{ color: 'white', background: 'none' }}>Répondre</button>
                  </div>
                )}
                {indexReponse === index && (
                  <div className='new-message'>
                    <input type='text' placeholder='Répondre au message...' value={nouveauMessage} onChange={(e) => setNouveauMessage(e.target.value)} />
                    <button onClick={ajouterMessage}>Répondre</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Asso;
