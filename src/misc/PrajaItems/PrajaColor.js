import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PrajaItems.module.css";
import { connect } from "react-redux";
import {
  createPrajaColorAction,
  deletePrajaColorAction,
  filterPrajaColorAction,
  getPrajaColorAction,
} from "../../store/actions/Praja/colorActions";
import { withFormik } from "formik";
import { fetchSinglePrajaColor, patchPrajaColor } from "../../store/api/api";
import { getToken } from "../../utils/utils";

const PrajaColor = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaColor,
  prajaColor,
  filterPrajaColor,
  filteredPrajaColor,
  deletePrajaColor,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singlePrajaColor, setsinglePrajaColor] = useState({});
  const [color, setColor] = useState([]);

  const change = (e) => {
    setsinglePrajaColor({
      ...singlePrajaColor,
      name: e.target.value,
    });
  };

  const patchSinglePrajaColor = (id) => {
    alert("Змінено");
    const token = getToken();
    patchPrajaColor(singlePrajaColor._id, token, singlePrajaColor).then(
      (res) => {
        res.status === 200 &&
          setColor((prevState) =>
            prevState.filter((golku) =>
              golku._id === singlePrajaColor._id
                ? (golku.name = singlePrajaColor.name)
                : golku
            )
          );
      }
    );
  };

  const getSinglePrajaColor = (id) => {
    const token = getToken();
    fetchSinglePrajaColor(id, token).then((res) => {
      setsinglePrajaColor(res.data);
    });
  };

  useEffect(() => {
    setColor(prajaColor);
  }, [prajaColor]);

  useEffect(() => {
    (async () => {
      await fetchPrajaColor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Католожні кольори</span>
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
              await filterPrajaColor(dataForFilter);
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
              value={singlePrajaColor.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSinglePrajaColor()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredPrajaColor.length
            ? prajaColor &&
              prajaColor.map((prajaColor) => {
                return (
                  <tr>
                    <td>{prajaColor.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaColor(prajaColor._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => deletePrajaColor(prajaColor._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPrajaColor.length &&
              filteredPrajaColor.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaColor(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deletePrajaColor(filter._id)}>
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
  handleSubmit: async (values, { props: { createPrajaColor }, resetForm }) => {
    const isSuccess = await createPrajaColor(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PrajaColor);

const mapStateToProps = (state) => {
  return {
    prajaColor: state.prajaColor.prajaColor,
    filteredPrajaColor: state.prajaColor.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaColor: (search) => dispatch(getPrajaColorAction(search)),
    filterPrajaColor: (data) => dispatch(filterPrajaColorAction(data)),
    createPrajaColor: (data) => dispatch(createPrajaColorAction(data)),
    deletePrajaColor: (data) => dispatch(deletePrajaColorAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
