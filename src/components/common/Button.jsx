function Button({ children, btnClass, handleClick }) {
  return (
    <button className={btnClass} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
