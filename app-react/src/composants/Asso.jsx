import { useState, useEffect } from 'react';
import './Asso.css';

const Asso = ({ logout, user }) => {
  // Liste complète des messages
  const [messages, setMessages] = useState([]);

  // Liste filtrée des messages selon une recherche par date
  const [messagesFiltres, setMessagesFiltres] = useState([]);

  // Nouveau message en cours d'écriture
  const [nouveauMessage, setNouveauMessage] = useState("");

  // Index du message auquel on souhaite répondre
  const [indexReponse, setIndexReponse] = useState(null);

  // Index du menu contextuel actuellement ouvert
  const [indexMenuOuvert, setIndexMenuOuvert] = useState(null);

  // Date de début pour la recherche
  const [dateDebut, setDateDebut] = useState("");

  // Date de fin pour la recherche
  const [dateFin, setDateFin] = useState("");

  // Met à jour les messages filtrés lorsqu'il y a un changement dans la liste principale
  useEffect(() => {
    setMessagesFiltres(messages);
  }, [messages]);

  // Ajouter un nouveau message (ou réponse)
  const ajouterMessage = () => {
    if (nouveauMessage.trim() === "") return; // Ne rien faire si le message est vide

    const aujourdHui = new Date().toISOString().split('T')[0]; // Date actuelle au format AAAA-MM-JJ

    const messageAAjouter = {
      owner: user, // Auteur du message
      date: aujourdHui, // Date d'envoi
      content: nouveauMessage, // Contenu du message
    };

    const messagesMisAJour = [messageAAjouter, ...messages]; // Ajouter le message en haut de la liste
    setMessages(messagesMisAJour);
    setNouveauMessage(""); // Réinitialiser le champ de saisie
    setIndexReponse(null); // Réinitialiser la réponse en cours
  };

  // Supprimer un message par son index
  const supprimerMessage = (indexASupprimer) => {
    const messagesMisAJour = messages.filter((_, index) => index !== indexASupprimer);
    setMessages(messagesMisAJour);
    setIndexMenuOuvert(null); // Fermer le menu après suppression
  };

  // Activer le mode réponse pour un message donné
  const repondreMessage = (index) => {
    setIndexReponse(index);
    setIndexMenuOuvert(null); // Fermer le menu
  };

  // Ouvrir/fermer le menu contextuel d'un message
  const basculerMenu = (index) => {
    setIndexMenuOuvert(indexMenuOuvert === index ? null : index);
  };

  // Filtrer les messages entre deux dates
  const rechercherMessages = () => {
    if (!dateDebut || !dateFin) {
      setMessagesFiltres(messages); // Si pas de dates, afficher tous les messages
      return;
    }

    const resultat = messages.filter((msg) => msg.date >= dateDebut && msg.date <= dateFin);
    setMessagesFiltres(resultat);
  };

  return (
    <>
      <header>
        <div className='logo'>
          <img className='pic' src='logo.png' alt='Logo' /> Organiz-Asso
        </div>
        <div className='search'>
          <input type='text' placeholder='Rechercher...' disabled /> 
          <input type='date' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
          <input type='date' value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
          <button onClick={rechercherMessages}>Rechercher</button>
        </div>
        <div>
          <button className='deconnexion' onClick={logout}>Déconnexion</button>
        </div>
      </header>
      <main>
        <aside className='info-zone'><strong>Zone Informations</strong></aside>
        <section className='messages'>
          <div className='new-message'>
            <input
              type='text'
              placeholder='Écrire un nouveau message...'
              value={nouveauMessage}
              onChange={(e) => setNouveauMessage(e.target.value)}
            />
            <button onClick={ajouterMessage}>Ajouter</button>
          </div>
          <div className='message-list'>
            {messagesFiltres.map((msg, index) => (
              <div className='message' key={index} style={{ position: 'relative' }}>
                <p><strong>User:@</strong>{msg.owner} · <strong>Date:</strong> {msg.date}</p>
                <p>{msg.content}</p>

                {/* Menu déroulant contextuel */}
                <button className="menu" onClick={() => basculerMenu(index)} style={{ position: 'absolute', top: '5px', right: '5px' }}>
                  ⋮
                </button>

                {indexMenuOuvert === index && (
                  <div style={{ position: 'absolute', top: '30px', right: '5px', backgroundColor: 'black', border: '1px solid #ccc', borderRadius: '5px', zIndex: 1000, padding: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <button onClick={() => supprimerMessage(index)} style={{ color: 'white', background: 'none' }}>
                      Supprimer
                    </button>
                    <button onClick={() => repondreMessage(index)} style={{ color: 'white', background: 'none' }}>
                      Répondre
                    </button>
                  </div>
                )}
                {/* Zone pour répondre à un message */}
                {indexReponse === index && (
                  <div className='new-message'>
                    <input
                      type='text'
                      placeholder='Répondre au message...'
                      value={nouveauMessage}
                      onChange={(e) => setNouveauMessage(e.target.value)}
                    />
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
