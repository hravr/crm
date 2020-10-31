import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../store/actions/profileActions";
import s from "./Header.module.css";

const LogoutComponent = ({ logout }) => {
  const h = useHistory();
  const Logout = () => {
    logout();
    h.push("/login");
  };
  return (
    <div>
      <button className={s.logoutbtn} onClick={Logout}>
        Вийти
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);
