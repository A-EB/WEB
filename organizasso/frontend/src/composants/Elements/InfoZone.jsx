const InfoZone = ({users,isAdmin,selectedUsers,toggleSelectUser,toggleSelectAdmin,toggleSelectAdminToRemove,validerUtilisateurs,promoteToAdmin,selectedAdmins,selectedAdminsToRemove,revokeAdminRights,currentUser}) => {
  
  const admins = users.filter(user => user.isAdmin);
  const utilisateursValidés = users.filter(user => !user.isAdmin && user.isValidated);
  const utilisateursNonValidés = users.filter(user => !user.isValidated);

  return (
    <aside className="info-zone">
      <strong>Zone Informations</strong>
      <h3>Administrateurs</h3>
      <ul>
        {admins.map((user) => (
          <li key={user._id}>
            <span>{user.login}</span>
            {isAdmin && user.login !== currentUser && (<input type="checkbox" checked={selectedAdminsToRemove.includes(user._id)} onChange={() => toggleSelectAdminToRemove(user._id)}/>)}
          </li>
        ))}
      </ul>
      {isAdmin && (<button onClick={revokeAdminRights} disabled={selectedAdminsToRemove.length === 0}>Retirer Admin</button>)}

      <h3>Utilisateurs Validés</h3>
      <ul>
        {utilisateursValidés.map((user) => (
          <li key={user._id} >
          <span>{user.login}</span>
          {isAdmin && (<input type="checkbox" checked={selectedAdmins.includes(user._id)} onChange={() => toggleSelectAdmin(user._id)}/>)}
        </li>
        ))}
      </ul>
      {isAdmin && (<button onClick={promoteToAdmin} disabled={selectedAdmins.length === 0}>Promouvoir en admin</button>)}

      <h3>Utilisateurs Non Validés</h3>
      <ul>
        {utilisateursNonValidés.map((user) => (
          <li key={user._id}>
            {user.login}
            {isAdmin && (<input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={() => toggleSelectUser(user._id)}/>)}
          </li>
        ))}
      </ul>
      {isAdmin && (<button onClick={validerUtilisateurs} disabled={selectedUsers.length === 0}>Valider sélection</button>)}
    </aside>
  );
};

export default InfoZone;
