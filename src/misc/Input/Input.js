import React from "react";

import s from "./Input.module.css";

const Input = ({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  isTextarea,
  ...rest
}) => {
  return (
    <div className={s.input__container}>
      {!!label && <span className={s.label}>{label}</span>}
      <input
        className={s.input}
        {...{ type }}
        {...{ value }}
        {...{ onChange }}
        {...{ placeholder }}
        {...rest}
      />
    </div>
  );
};

export default Input;
