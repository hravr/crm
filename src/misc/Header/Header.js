import React, { useState } from "react";
import s from "./Header.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link, useHistory } from "react-router-dom";

// const h =
const Header = (props) => {
  const h = useHistory();

  return (
    <div className={s.sidenav}>
      <div className={s.dropdown}>
        <button className={s.dropbtn}>Довідник</button>
        <div className={s.dropdown_content}>
          <Link to="/workers">Працівники</Link>
          <Link to="/products">Продукція</Link>
          <Link to="/prices">Розцінки</Link>
          <Link to="/equipment">Обладннення</Link>
          <Link to="/praja">Пряжа</Link>
          <Link to="/pak_materials">Пакувальні матеріали</Link>
        </div>
      </div>
      <div className={s.dropdown}>
        <button className={s.dropbtn}>Склади</button>
        <div className={s.dropdown_content}>
          <Link to="/create-pruhid">Створити проихід</Link>
          <Link to="/sklad_1">Склад 1</Link>
        </div>
      </div>
      <div className={s.dropdown}>
        <button className={s.dropbtn}>Звіти</button>
        <div className={s.dropdown_content}>
          <a onClick={() => h.push("/create-pruhid")}>Прихід</a>
          <a onClick={() => h.push("/create-pruhid")}>Розхід</a>
          <a onClick={() => h.push("/create-pruhid")}>Облік</a>
        </div>
      </div>
      <div className={s.dropdown}>
        <button className={s.dropbtn}>Зарплата</button>
        <div className={s.dropdown_content}>
          <a onClick={() => h.push("/create-pruhid")}>Склад 1/2/3/4 облік</a>
          <a onClick={() => h.push("/create-pruhid")}>Склад 1</a>
          <a onClick={() => h.push("/create-pruhid")}>Склад 2</a>
          <a onClick={() => h.push("/create-pruhid")}>Склад 3</a>
          <a onClick={() => h.push("/create-pruhid")}>Склад 4</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
