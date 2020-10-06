import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../store/actions/profileActions";
import Button from "../Button/Button";
// import s from './Logout.module.css';

const LogoutComponent = ({ logout }) => {
  const h = useHistory();
  const Logout = () => {
    logout();
    h.push("/login");
  };
  return (
    <div>
      <Button title="Logout" onClick={Logout} />
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
