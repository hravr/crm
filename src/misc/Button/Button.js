import React from "react";
import s from "./Button.module.css";

const Button = ({ title, onClick, ...rest }) => {
  return (
    <div className={s.btn}>
      <button className={s.form__submit__button} {...rest} {...{ onClick }}>
        {!!title && <span>{title}</span>}
      </button>
    </div>
  );
};

export default Button;
