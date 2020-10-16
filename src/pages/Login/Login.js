import React from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import s from "./Login.module.css";
import { loginAction } from "../../store/actions/profileActions";
import Button from "../../misc/Button/Button";

const Login = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <div className={s.main__container}>
      <div className={s.header__title}>Логін</div>
      <div className={s.login}>
        <div className={s.login__container}>
          <label className={s.label}>логін</label>
          <input
            className={s.input}
            placeholder="caster"
            onChange={handleChange}
            value={values.email}
            name="email"
            onBlur={handleBlur}
            у
          />
          <label className={s.label}>пароь</label>
          <input
            placeholder="123123123"
            type="password"
            className={s.input}
            onChange={handleChange}
            value={values.password}
            name="password"
            onBlur={handleBlur}
          />
          <div className={s.btn}>
            <Button title="Увійти" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  handleSubmit: async (values, { props: { login, history } }) => {
    console.log("pezda");
    const isSuccess = await login(values);
    if (isSuccess) {
      history.push("/sklad_1");
    } else {
      alert("error===");
    }
  },
})(Login);

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return { login: (data) => dispatch(loginAction(data)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
// export default Login;
