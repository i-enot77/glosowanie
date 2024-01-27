export default function UserItem({
  userName,
  lastName,
  email,
  phoneNumber,
  roles,
}) {
  return (
    <>
      <div>{userName}</div>
      <div>{lastName}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
      <div>{roles}</div>
    </>
  );
}
