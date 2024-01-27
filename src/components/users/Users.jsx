function Users() {
  const usersHeader = ["Imię", "Nazwisko", "email", "Numer", "Uprawnienia"];
  return (
    <div>
      <div>
        {usersHeader.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Users;
