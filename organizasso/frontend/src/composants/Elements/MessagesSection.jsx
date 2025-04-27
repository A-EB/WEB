import MessageItem from './MessageItem';

const MessagesSection = ({messagesFiltres,nouveauMessage,setNouveauMessage,ajouterMessage,indexMenuOuvert,basculerMenu,supprimerMessage,indexReponse,repondreMessage,user}) => {
  return (
    <section className='messages'>
      <div className='new-message'>
        <input type='text' placeholder='Écrire un nouveau message...' value={nouveauMessage} onChange={(e) => setNouveauMessage(e.target.value)}/>
        <button onClick={ajouterMessage}>Ajouter</button>
      </div>

      <div className='message-list'>
        {messagesFiltres.map((msg, index) => (
          <MessageItem key={index} msg={msg} index={index} indexMenuOuvert={indexMenuOuvert} basculerMenu={basculerMenu} supprimerMessage={supprimerMessage} indexReponse={indexReponse} repondreMessage={repondreMessage} nouveauMessage={nouveauMessage} setNouveauMessage={setNouveauMessage} ajouterMessage={ajouterMessage} user={user}/>
        ))}
      </div>
    </section>
  );
};

export default MessagesSection;
