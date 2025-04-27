const Header = ({ deco, setPageActuelle, pageActuelle, dateDebut, setDateDebut, dateFin, setDateFin, rechercherMessages }) => {
    return (
      <header>
        <div className='logo'>
          <img className='pic' src='logo.png' alt='Logo' /> Organiz-Asso
        </div>
        <div className='search'>
          <input type='date' value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
          <input type='date' value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
          <button onClick={rechercherMessages}>Rechercher</button>
        </div>
        <div className='actions'>
          {pageActuelle !== "page_profil" && (<button onClick={() => setPageActuelle("page_profil")}>Profil</button>)}
          <button className='deconnexion' onClick={deco}>Déconnexion</button>
        </div>
      </header>
    );
  };
  
  export default Header;
  