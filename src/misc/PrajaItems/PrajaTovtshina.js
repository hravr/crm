import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PrajaItems.module.css";
import { connect } from "react-redux";
import {
  createPrajaTovtshinaAction,
  deletePrajaTovtshinaAction,
  filterPrajaTovtshinaAction,
  getPrajaTovtshinaAction,
} from "../../store/actions/Praja/tovtshinaActions";
import { withFormik } from "formik";

const PrajaTovtshina = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaTovtshina,
  prajaTovtshina,
  filterPrajaTovtshina,
  filteredPrajaTovtshina,
  deletePrajaTovtshina,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});

  useEffect(() => {
    (async () => {
      await fetchPrajaTovtshina();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Товщина пряжі</span>
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
              await filterPrajaTovtshina(dataForFilter);
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
          {!filteredPrajaTovtshina.length
            ? prajaTovtshina &&
              prajaTovtshina.map((prajaTovtshina) => {
                return (
                  <tr>
                    <td>{prajaTovtshina.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() =>
                            deletePrajaTovtshina(prajaTovtshina._id)
                          }
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPrajaTovtshina.length &&
              filteredPrajaTovtshina.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button
                          onClick={() => deletePrajaTovtshina(filter._id)}
                        >
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
  handleSubmit: async (
    values,
    { props: { createPrajaTovtshina }, resetForm }
  ) => {
    const isSuccess = await createPrajaTovtshina(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PrajaTovtshina);

const mapStateToProps = (state) => {
  return {
    prajaTovtshina: state.prajaTovtshina.prajaTovtshina,
    filteredPrajaTovtshina: state.prajaTovtshina.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaTovtshina: (search) => dispatch(getPrajaTovtshinaAction(search)),
    filterPrajaTovtshina: (data) => dispatch(filterPrajaTovtshinaAction(data)),
    createPrajaTovtshina: (data) => dispatch(createPrajaTovtshinaAction(data)),
    deletePrajaTovtshina: (data) => dispatch(deletePrajaTovtshinaAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
