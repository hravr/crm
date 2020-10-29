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
import { getToken } from "../../utils/utils";
import {
  fetchSinglePrajaTovtshina,
  patchPrajaTovtshina,
} from "../../store/api/api";

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
  const [singlePrajaTovtshina, setsinglePrajaTovtshina] = useState({});
  const [tovtshina, setTovtshina] = useState([]);

  const change = (e) => {
    setsinglePrajaTovtshina({
      ...singlePrajaTovtshina,
      name: e.target.value,
    });
  };

  const patchSinglePrajaTovtshina = (id) => {
    alert("Змінено");
    const token = getToken();
    patchPrajaTovtshina(
      singlePrajaTovtshina._id,
      token,
      singlePrajaTovtshina
    ).then((res) => {
      res.status === 200 &&
        setTovtshina((prevState) =>
          prevState.filter((golku) =>
            golku._id === singlePrajaTovtshina._id
              ? (golku.name = singlePrajaTovtshina.name)
              : golku
          )
        );
    });
  };

  const getSinglePrajaTovtshina = (id) => {
    const token = getToken();
    fetchSinglePrajaTovtshina(id, token).then((res) => {
      setsinglePrajaTovtshina(res.data);
    });
  };

  useEffect(() => {
    setTovtshina(prajaTovtshina);
  }, [prajaTovtshina]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singlePrajaTovtshina.name}
              name="name"
              onChange={change}
            />
            <Button
              title="Змінити"
              onClick={() => patchSinglePrajaTovtshina()}
            />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredPrajaTovtshina.length
            ? prajaTovtshina &&
              prajaTovtshina.map((prajaTovtshina) => {
                return (
                  <tr>
                    <td>{prajaTovtshina.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() =>
                            getSinglePrajaTovtshina(prajaTovtshina._id)
                          }
                        >
                          Редагувати
                        </button>
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
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaTovtshina(filter._id)}
                        >
                          Редагувати
                        </button>
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
