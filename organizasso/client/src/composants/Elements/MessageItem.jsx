import './MessageItem.css';

const MessageItem = ({msg,index,indexMenuOuvert,basculerMenu,supprimerMessage,indexReponse,repondreMessage,nouveauMessage,setNouveauMessage,ajouterMessage,user}) => {
  const estProprietaire = msg.owner === user;

  return (
    <div className='message'>
      <p>{msg.owner} · {msg.date}</p>
      <p>{msg.content}</p>

      <button className='menu' onClick={() => basculerMenu(index)}>...</button>

      {indexMenuOuvert === index && (
        <div className="menu-deroulant">
          {estProprietaire && (<button className="menu-bouton" onClick={() => supprimerMessage(index)}>Supprimer</button>)}
          <button className="menu-bouton" onClick={() => repondreMessage(index)}>Répondre</button>
        </div>
      )}

      {indexReponse === index && (
        <div className='new-message'>
          <input type='text' placeholder='Répondre au message...' value={nouveauMessage} onChange={(e) => setNouveauMessage(e.target.value)}/>
          <button onClick={ajouterMessage}>Répondre</button>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
