import React, { useEffect, useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./PrajaItems.module.css";
import { connect } from "react-redux";
import {
  createPrajaVendorAction,
  deletePrajaVendorAction,
  filterPrajaVendorAction,
  getPrajaVendorAction,
} from "../../store/actions/Praja/vendorActions";
import { withFormik } from "formik";
import { getToken } from "../../utils/utils";
import { fetchSinglePrajaVendor, patchPrajaVendor } from "../../store/api/api";

const PrajaVendor = ({
  handleChange,
  handleSubmit,
  values,
  fetchPrajaVendor,
  prajaVendor,
  filterPrajaVendor,
  filteredPrajaVendor,
  deletePrajaVendor,
}) => {
  const [dataForFilter, setDataForFilter] = useState({});
  const [singlePrajaVendor, setsinglePrajaVendor] = useState({});
  const [vendor, setVendor] = useState([]);

  const change = (e) => {
    setsinglePrajaVendor({
      ...singlePrajaVendor,
      name: e.target.value,
    });
  };

  const patchSinglePrajaVendor = (id) => {
    alert("Змінено");
    const token = getToken();
    patchPrajaVendor(singlePrajaVendor._id, token, singlePrajaVendor).then(
      (res) => {
        res.status === 200 &&
          setVendor((prevState) =>
            prevState.filter((golku) =>
              golku._id === singlePrajaVendor._id
                ? (golku.name = singlePrajaVendor.name)
                : golku
            )
          );
      }
    );
  };

  const getSinglePrajaVendor = (id) => {
    const token = getToken();
    fetchSinglePrajaVendor(id, token).then((res) => {
      setsinglePrajaVendor(res.data);
    });
  };

  useEffect(() => {
    setVendor(prajaVendor);
  }, [prajaVendor]);

  useEffect(() => {
    (async () => {
      await fetchPrajaVendor();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Постачальники</span>
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
              await filterPrajaVendor(dataForFilter);
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
              value={singlePrajaVendor.name}
              name="name"
              onChange={change}
            />
            <Button title="Змінити" onClick={() => patchSinglePrajaVendor()} />
          </div>
        </div>
      </div>
      <div className={s.table}>
        <table>
          <tr>
            <th className={s.status__table}>Назва</th>
            <th className={s.status__table}></th>
          </tr>
          {!filteredPrajaVendor.length
            ? prajaVendor &&
              prajaVendor.map((prajaVendor) => {
                return (
                  <tr>
                    <td>{prajaVendor.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaVendor(prajaVendor._id)}
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => deletePrajaVendor(prajaVendor._id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : filteredPrajaVendor.length &&
              filteredPrajaVendor.map((filter) => {
                return (
                  <tr>
                    <td>{filter.name || "err"}</td>
                    <td>
                      <div className={s.table__btn}>
                        <button
                          className={s.del}
                          onClick={() => getSinglePrajaVendor(filter._id)}
                        >
                          Редагувати
                        </button>
                        <button onClick={() => deletePrajaVendor(filter._id)}>
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
  handleSubmit: async (values, { props: { createPrajaVendor }, resetForm }) => {
    const isSuccess = await createPrajaVendor(values);
    if (isSuccess) {
      alert("Створено");
    } else {
      alert("error===");
    }
    resetForm({ name: "" });
  },
})(PrajaVendor);

const mapStateToProps = (state) => {
  return {
    prajaVendor: state.prajaVendor.prajaVendor,
    filteredPrajaVendor: state.prajaVendor.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrajaVendor: (search) => dispatch(getPrajaVendorAction(search)),
    filterPrajaVendor: (data) => dispatch(filterPrajaVendorAction(data)),
    createPrajaVendor: (data) => dispatch(createPrajaVendorAction(data)),
    deletePrajaVendor: (data) => dispatch(deletePrajaVendorAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
