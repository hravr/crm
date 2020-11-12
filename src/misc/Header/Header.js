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
            <button className={s.dropbtn}>Склади</button>
            <div className={s.dropdown_content}>
              <Link to="/sklad_1">Склад 1</Link>
              <Link to="/sklad_2">Склад 2</Link>
              <Link to="/sklad_3">Склад 3</Link>
              <Link to="/sklad_4">Склад 4</Link>
              <Link to="/create-pruhid">Створити прихід</Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Зарплата</button>
            <div className={s.dropdown_content}>
              <Link to="/zp-sklad1">Склад 1</Link>
              <Link to="/zp-sklad2">Склад 2</Link>
              <Link to="/zp-sklad3">Склад 3</Link>
              <Link to="/zp-sklad4">Склад 4</Link>
              <Link to="/zp-rest">Решта</Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Звіти</button>
            <div className={s.dropdown_content}>
              <Link to="/zvitu">Звіти</Link>
              <Link to="create-zvitu" className={s.create__worker}>
                Створити прихід
              </Link>
              <Link to="create-zvitu-rozxid" className={s.create__worker}>
                Створити розхід
              </Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Пак матеріали</button>
            <div className={s.dropdown_content}>
              <Link to="/materials">Пак матеріали</Link>
              <Link to="/сreate-materials-pruhid" className={s.create__worker}>
                Створити прихід
              </Link>
              <Link to="/create-materials-rozhid" className={s.create__worker}>
                Створити розхід
              </Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Пряжа</button>
            <div className={s.dropdown_content}>
              <Link to="/priaga">Пряжа</Link>
              <Link to="/сreate-praja-pruhid" className={s.create__worker}>
                Створити прихід
              </Link>
              <Link to="/сreate-praja-rozxid" className={s.create__worker}>
                Створити розхід
              </Link>
            </div>
          </div>
          <div className={s.dropdown}>
            <button className={s.dropbtn}>Довідник</button>
            <div className={s.dropdown_content}>
              <Link to="/workers">Працівники</Link>
              <Link to="/productcia">Продукція</Link>
              <Link to="/prices">Розцінки</Link>
              <Link to="/equipment">Обладннення</Link>
              <Link to="/praja">Пряжа</Link>
              <Link to="/pak_materials">Пакувальні матеріали</Link>
              <Link to="/operations">Операції</Link>
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
