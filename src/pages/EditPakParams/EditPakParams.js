import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditPakParams.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getMaterialTypeAction } from "../../store/actions/Material/typeActions";
import { useParams } from "react-router-dom";
import {
  editMaterialParamsAction,
  getSingleMaterialParamsAction,
} from "../../store/actions/Material/paramsActions";

const EditPakParams = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  typeId,
  getSingleParams,
  fetchMaterialType,
  singleParams,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const { id } = useParams();

  const typeSelect = (typeId) => {
    setValues({
      ...values,
      typeId: typeId.value,
      typeName: typeId.label,
    });
  };

  useEffect(() => {
    setTypeOptions(
      typeId.length &&
        typeId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [typeId]);
  useEffect(() => {
    (async () => {
      await getSingleParams(id);
      await fetchMaterialType(id);
    })();
  }, []);
  useEffect(() => {
    const { name, typeId, _id } = singleParams;
    if (singleParams._id) {
      setValues({
        ...values,
        name,
        typeId,
        typeName: typeId?.name || "Всі",
        _id,
      });
    }
  }, [singleParams]);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити параметер</span>
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
              <span>Тип</span>
            </div>
            <Select
              options={typeOptions}
              value={{ label: values.typeName, value: values.typeId }}
              name="typeId"
              onChange={typeSelect}
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
    typeId: "",
  }),

  handleSubmit: async (
    values,
    { props: { editType, history, singleParams } }
  ) => {
    const typeToSubmit = {
      name: values.name,
      typeId: values.typeId,
    };
    const isSuccess = await editType(typeToSubmit, singleParams._id);
    if (isSuccess) {
      history.push("/pak_materials") || alert("Змінено");
    } else {
      alert("Помилка");
    }
  },
})(EditPakParams);
const mapStateToProps = (state) => {
  return {
    typeId: state.materialType.materialType,
    singleParams: state.materialParams.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleParams: (id) => dispatch(getSingleMaterialParamsAction(id)),
    editType: (materialParams, id) =>
      dispatch(editMaterialParamsAction(materialParams, id)),
    fetchMaterialType: () => dispatch(getMaterialTypeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
