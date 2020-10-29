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
import { fetchSinglePrajaRozhid, patchPrajaRozhid } from "../../store/api/api";
import { getToken } from "../../utils/utils";

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
  const [singlePrajaRozhid, setsinglePrajaRozhid] = useState({});
  const [rozhid, setRozhid] = useState([]);

  const change = (e) => {
    setsinglePrajaRozhid({
      ...singlePrajaRozhid,
      name: e.target.value,
    });
  };

  const patchSinglePrajaRozhid = (id) => {
    alert("Змінено");
    const token = getToken();
    patchPrajaRozhid(singlePrajaRozhid._id, token, singlePrajaRozhid).then(
      (res) => {
        res.status === 200 &&
          setRozhid((prevState) =>
            prevState.filter((golku) =>
              golku._id === singlePrajaRozhid._id
                ? (golku.name = singlePrajaRozhid.name)
                : golku
            )
          );
      }
    );
  };

  const getSinglePrajaRozhid = (id) => {
    const token = getToken();
    fetchSinglePrajaRozhid(id, token).then((res) => {
      setsinglePrajaRozhid(res.data);
    });
  };

  useEffect(() => {
    setRozhid(prajaRozhid);
  }, [prajaRozhid]);

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
        <div className={s.filter__container}>
          <div className={s.search__container}>
            <Input
              label="Редагувати"
              value={singlePrajaRozhid.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSinglePrajaRozhid()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredPrajaRozhid.length
            ? prajaRozhid &&
              prajaRozhid.map((prajaRozhid) => {
                return (
                  <tr>
                    <td>{prajaRozhid.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaRozhid(prajaRozhid._id)}
                        >
                          Редагувати
                        </button>
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
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaRozhid(filter._id)}
                        >
                          Редагувати
                        </button>
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
