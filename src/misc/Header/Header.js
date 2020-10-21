import React, { useState } from "react";
import s from "./Header.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";

const Header = ({ history: h }) => {
  const { pathname } = h.location;

  return (
    <>
      {pathname.startsWith("/login") ? null : (
        <div className={s.navbar}>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Довідник</button>
            <div className={s.dropdown_content}>
              <Link to="/workers">Працівники</Link>
              <Link to="/productcia">Продукція</Link>

              <Link to="/equipment">Обладннення</Link>
              <Link to="/praja">Пряжа</Link>
              <Link to="/pak_materials">Пакувальні матеріали</Link>
              <Link to="/operations">Операції</Link>
            </div>
          </div>

          <div className={s.dropdown}>
            <button className={s.dropbtn}>Склади</button>
            <div className={s.dropdown_content}>
              <Link to="/create-pruhid">Створити прихід</Link>
              <Link to="/sklad_1">Склад 1</Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Зарплата</button>
            <div className={s.dropdown_content}>
              <Link to="/zp-sklad1">Склад 1</Link>
              <Link to="/zp-sklad2">Склад 2</Link>
              <Link to="/zp-sklad3">Склад 3</Link>
              <Link to="/zp-sklad4">Склад 4</Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <Link to="/prices">Розцінки</Link>
          </div>
          <div className={s.dropdown}>
            <Link to="/zvitu">Звіти</Link>
          </div>
          <div className={s.logout}>
            <LogoutComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Header);
