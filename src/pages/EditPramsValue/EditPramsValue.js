import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditPramsValue.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import {
  editMaterialParamsValueAction,
  getSingleMaterialParamsValueAction,
} from "../../store/actions/Material/paramsValueActions";
import { useParams } from "react-router-dom";
import { getMaterialTypeAction } from "../../store/actions/Material/typeActions";

const EditParamsValue = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  paramId,
  fetchMaterialParams,
  getSingleParamsValue,
  singleParamsValue,
}) => {
  const [paramsOptions, setparamsOptions] = useState([]);
  const { id } = useParams();

  const paramsSelect = (paramId) => {
    setValues({
      ...values,
      paramId: paramId.value,
      paramsName: paramId.label,
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
        <span className={s.title}>Змінити значення параметру</span>
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
              value={{ label: values.paramsName, value: values.paramId }}
              name="paramId"
              onChange={paramsSelect}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button title="Змінити" onClick={handleSubmit} />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    name: "",
    paramId: "",
  }),

  handleSubmit: async (
    values,
    { props: { editParamsValue, history, singleParamsValue } }
  ) => {
    const paramsValueToSubmit = {
      name: values.name,
      paramId: values.paramId,
    };
    const isSuccess = await editParamsValue(
      paramsValueToSubmit,
      singleParamsValue._id
    );
    if (isSuccess) {
      history.push("/pak_materials") || alert("Змінено");
    } else {
      alert("Помилка");
    }
  },
})(EditParamsValue);
const mapStateToProps = (state) => {
  return {
    singleParamsValue: state.materialParamsValue.single,
    paramId: state.materialParams.materialParams,
    typeId: state.materialType.materialType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleParamsValue: (id) =>
      dispatch(getSingleMaterialParamsValueAction(id)),
    editParamsValue: (materialParamsValue, id) =>
      dispatch(editMaterialParamsValueAction(materialParamsValue, id)),
    fetchMaterialParams: () => dispatch(getMaterialParamsAction()),
    fetchMaterialType: () => dispatch(getMaterialTypeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
