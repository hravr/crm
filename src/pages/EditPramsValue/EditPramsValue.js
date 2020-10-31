import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreateParamsValue.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import {
  editMaterialParamsValueAction,
  getSingleMaterialParamsValueAction,
} from "../../store/actions/Material/paramsValueActions";
import { useParams } from "react-router-dom";

const CreateParamsValue = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  paramId,
  fetchMaterialParams,
  errors,
  getSingleParamsValue,
  singleParamsValue,
}) => {
  const [paramsOptions, setparamsOptions] = useState([]);
  const { id } = useParams();

  const paramsSelect = (paramId) => {
    setValues({
      ...values,
      paramId: paramId.value,
      paramsName: paramsId.label,
    });
  };

  useEffect(() => {
    setparamsOptions(
      paramId.length &&
        paramId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [paramId]);

  useEffect(() => {
    (async () => {
      await getSingleParamsValue(id);
      await fetchMaterialParams();
    })();
  }, []);
  useEffect(() => {
    const { name, paramId, _id } = singleParamsValue;
    console.log(singleParamsValue);
    if (singleParamsValue._id) {
      setValues({
        ...values,
        name,
        paramId,
        paramsName: paramId?.name || "Всі",
        _id,
      });
    }
  }, [singleParamsValue]);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити значення параметру</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            label="Назва"
            value={values.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Параметер</span>
            </div>
            <Select
              options={paramsOptions}
              value={values.paramId.label}
              name="paramId"
              onChange={paramsSelect}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button
          title="Створити"
          onClick={handleSubmit}
          disabled={!!errors.name}
        />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
    paramId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (!values.name || !values.paramId) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { editParamsValue, history } }) => {
    const paramsValueToSubmit = {
      name: values.name,
      paramId: values.paramId,
    };
    const isSuccess = await editParamsValue(paramsValueToSubmit);
    if (isSuccess) {
      history.push("/pak_materials") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreateParamsValue);
const mapStateToProps = (state) => {
  return {
    singleParamsValue: state.materialParamsValue.single,
    paramId: state.materialParams.materialParams,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleParamsValue: (id) =>
      dispatch(getSingleMaterialParamsValueAction(id)),
    editParamsValue: (materialParamsValue, id) =>
      dispatch(editMaterialParamsValueAction(materialParamsValue, id)),
    fetchMaterialParams: () => dispatch(getMaterialParamsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
