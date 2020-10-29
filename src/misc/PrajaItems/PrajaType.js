import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PrajaItems.module.css";
import { connect } from "react-redux";
import {
  createPrajaTypeAction,
  deletePrajaTypeAction,
  filterPrajaTypeAction,
  getPrajaTypeAction,
} from "../../store/actions/Praja/typeActions";
import { withFormik } from "formik";
import { getToken } from "../../utils/utils";
import { fetchSinglePrajaType, patchPrajaType } from "../../store/api/api";

const PrajaType = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaType,
  prajaType,
  filterPrajaType,
  filteredPrajaType,
  deletePrajaType,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singlePrajaType, setsinglePrajaType] = useState({});
  const [type, setType] = useState([]);

  const change = (e) => {
    setsinglePrajaType({
      ...singlePrajaType,
      name: e.target.value,
    });
  };

  const patchSinglePrajaType = (id) => {
    alert("Змінено");
    const token = getToken();
    patchPrajaType(singlePrajaType._id, token, singlePrajaType).then((res) => {
      res.status === 200 &&
        setType((prevState) =>
          prevState.filter((golku) =>
            golku._id === singlePrajaType._id
              ? (golku.name = singlePrajaType.name)
              : golku
          )
        );
    });
  };

  const getSinglePrajaType = (id) => {
    const token = getToken();
    fetchSinglePrajaType(id, token).then((res) => {
      setsinglePrajaType(res.data);
    });
  };

  useEffect(() => {
    setType(prajaType);
  }, [prajaType]);

  useEffect(() => {
    (async () => {
      await fetchPrajaType();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Тип пряжі</span>
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
              await filterPrajaType(dataForFilter);
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
              value={singlePrajaType.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSinglePrajaType()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredPrajaType.length
            ? prajaType &&
              prajaType.map((prajaType) => {
                return (
                  <tr>
                    <td>{prajaType.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaType(prajaType._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deletePrajaType(prajaType._id)}>
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPrajaType.length &&
              filteredPrajaType.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaType(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deletePrajaType(filter._id)}>
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
  handleSubmit: async (values, { props: { createPrajaType }, resetForm }) => {
    const isSuccess = await createPrajaType(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PrajaType);

const mapStateToProps = (state) => {
  return {
    prajaType: state.prajaType.prajaType,
    filteredPrajaType: state.prajaType.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaType: (search) => dispatch(getPrajaTypeAction(search)),
    filterPrajaType: (data) => dispatch(filterPrajaTypeAction(data)),
    createPrajaType: (data) => dispatch(createPrajaTypeAction(data)),
    deletePrajaType: (data) => dispatch(deletePrajaTypeAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
