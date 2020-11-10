import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePakParam.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import {createMaterialTypeAction, getMaterialTypeAction} from "../../store/actions/Material/typeActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";
import {createMaterialParamsAction, getMaterialParamsAction} from "../../store/actions/Material/paramsActions";
import { getMaterialRozhidAction } from "../../store/actions/Material/dilankaRozhoduActions";
import {createMaterialParams} from "../../store/api/api";

const CreatePakParam = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  typeId,
                          fetchMaterialType,
  dilankaId,
  errors,
  fetchMaterialRozhid,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);

  const vendorSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value });
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
      await fetchMaterialType();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити Параметр</span>
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
              value={values.typeId.label}
              name="typeId"
              onChange={vendorSelect}
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
    typeId: {},
    dilankaId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.name ||
      !values.typeId ||
      !values.dilankaId
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createParams, history } }) => {
    const typeToSubmit = {
      name: values.name,
      typeId: values.typeId,
    };
    const isSuccess = await createParams(typeToSubmit);
    if (isSuccess) {
      history.push("/pak_materials") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreatePakParam);

const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
    typeId: state.materialType.materialType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createParams: (materialType) =>
      dispatch(createMaterialParamsAction(materialType)),
    fetchMaterialType: () => dispatch(getMaterialTypeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
