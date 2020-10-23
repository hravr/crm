import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PrajaItems.module.css";
import { connect } from "react-redux";
import {
  createPrajaRozhidAction,
  deletePrajaRozhidAction,
  filterPrajaRozhidAction,
  getPrajaRozhidAction,
} from "../../store/actions/Praja/rozhidActions";
import { withFormik } from "formik";

const PrajaRozhid = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaRozhid,
  prajaRozhid,
  filterPrajaRozhid,
  filteredPrajaRozhid,
  deletePrajaRozhid,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchPrajaRozhid();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Ділянки розходу</span>
        <hr></hr>
      </div>
      <div className={s.filter__container}>
        <div className={s.search__container}>
          <Input
            label="Пошук"
            onChange={({ target }) =>
              setDataForFilter({ ...dataForFilter, search: target.value })
            }
          />
          <Button
            title="Пошук"
            onClick={async () => {
              await filterPrajaRozhid(dataForFilter);
            }}
          />
        </div>
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Створити"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
            <Button title="Створити" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.name__table}>Назва</th>
            <th className={s.name__table}></th>
          </tr>
          {!filteredPrajaRozhid.length
            ? prajaRozhid &&
              prajaRozhid.map((prajaRozhid) => {
                return (
                  <tr>
                    <td>{prajaRozhid.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deletePrajaRozhid(prajaRozhid._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPrajaRozhid.length &&
              filteredPrajaRozhid.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deletePrajaRozhid(filter._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
  }),
  handleSubmit: async (values, { props: { createPrajaRozhid }, resetForm }) => {
    const isSuccess = await createPrajaRozhid(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PrajaRozhid);

const mapStateToProps = (state) => {
  return {
    prajaRozhid: state.prajaRozhid.prajaRozhid,
    filteredPrajaRozhid: state.prajaRozhid.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaRozhid: (search) => dispatch(getPrajaRozhidAction(search)),
    filterPrajaRozhid: (data) => dispatch(filterPrajaRozhidAction(data)),
    createPrajaRozhid: (data) => dispatch(createPrajaRozhidAction(data)),
    deletePrajaRozhid: (data) => dispatch(deletePrajaRozhidAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
