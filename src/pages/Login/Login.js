import React from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import s from "./Login.module.css";
import { loginAction } from "../../store/actions/profileActions";

const Login = (
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit
) => {
  return (
    <form className={s.main__container}>
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
            <button className={s.form__submit__button} onSubmit={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  handleSubmit: async (values, { props: { login, history } }) => {
    const isSuccess = await login(values);
    if (isSuccess) {
      history.push("/prices");
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
