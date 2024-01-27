import React from "react";

function InputItem({
  inputId,
  type,
  inputName,
  value,
  handleChange,
  checked,
  placeholder,
  pattern,
  inputClassName,
}) {
  return (
    <input
      id={inputId}
      type={type}
      name={inputName}
      value={value}
      onChange={handleChange}
      checked={checked}
      placeholder={placeholder}
      required
      pattern={pattern}
      className={inputClassName}
    />
  );
}

export default InputItem;
