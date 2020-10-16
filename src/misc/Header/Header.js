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
              <Link to="/create-pruhid">Створити прихід</Link>
              <Link to="/sklad_1">Склад 1</Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Продукція</button>
            <div className={s.dropdown_content}>
              <Link to="/prod_type">Тип</Link>
              <Link to="/prod_size">Розмір</Link>
              <Link to="/prod_sezon">Сезон</Link>
              <Link to="/prod_image">Малюнок</Link>
              <Link to="/prod_color">Колір</Link>
              <Link to="/prod_class">Клас</Link>
              <Link to="/prod_asortument">Асортимент</Link>
              <Link to="prod_article">Артикул</Link>
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
          <div className={s.logout}>
            <LogoutComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Header);
