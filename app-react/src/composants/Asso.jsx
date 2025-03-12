import { useState, useEffect } from 'react';
import './Asso.css';

const Asso = ({ logout, user }) => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setFilteredMessages(messages);
  }, [messages]);

  const handleAddMessage = () => {
    if (newMessage.trim() === "") return;

    const today = new Date().toISOString().split('T')[0]; 
    const messageToAdd = {
      owner: user,
      date: today,
      content: newMessage,
    };

    const updatedMessages = [messageToAdd, ...messages];
    setMessages(updatedMessages);
    setNewMessage("");
    setReplyIndex(null); 
  };

  const handleDeleteMessage = (indexToDelete) => {
    const updatedMessages = messages.filter((_, index) => index !== indexToDelete);
    setMessages(updatedMessages);
    setOpenMenuIndex(null);
  };

  const handleReplyMessage = (index) => {
    setReplyIndex(index);
    setOpenMenuIndex(null);
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      setFilteredMessages(messages);
      return;
    }

    const result = messages.filter((msg) => msg.date >= startDate && msg.date <= endDate);
    setFilteredMessages(result);
  };

  return (
    <>
      <header>
        <div className='logo'>
          <img className='pic' src='logo.png' alt='Logo' /> Organiz-Asso
        </div>
        <div className='search'>
          <input type='text' placeholder='Rechercher...' disabled /> 
          <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={handleSearch}>Rechercher</button>
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleAddMessage}>Ajouter</button>
          </div>
          <div className='message-list'>
            {filteredMessages.map((msg, index) => (
              <div className='message' key={index} style={{ position: 'relative' }}>
                <p><strong>User:@</strong>{msg.owner} · <strong>Date:</strong> {msg.date}</p>
                <p>{msg.content}</p>

                {/* Menu déroulant */}
                <button className="menu" onClick={() => toggleMenu(index)} style={{ position: 'absolute', top: '5px', right: '5px' }}>
                  ⋮
                </button>

                {openMenuIndex === index && (
                  <div style={{ position: 'absolute', top: '30px', right: '5px', backgroundColor: 'black', border: '1px solid #ccc', borderRadius: '5px', zIndex: 1000, padding: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <button onClick={() => handleDeleteMessage(index)} style={{ color: 'white', background: 'none' }}>
                      Supprimer
                    </button>
                    <button onClick={() => handleReplyMessage(index)} style={{ color: 'white', background: 'none' }}>
                      Reply
                    </button>
                  </div>
                )}

                {/* Zone de réponse */}
                {replyIndex === index && (
                  <div className='new-message'>
                    <input
                      type='text'
                      placeholder='Répondre au message...'
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleAddMessage}>Répondre</button>
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