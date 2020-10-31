import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePakType.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { createMaterialTypeAction } from "../../store/actions/Material/typeActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import { getMaterialRozhidAction } from "../../store/actions/Material/dilankaRozhoduActions";

const CreatePakType = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  paramsId,
  vendorId,
  fetchMaterialVendor,
  fetchMaterialParams,
  dilankaId,
  errors,
  fetchMaterialRozhid,
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [paramsOptions, setParamsOptions] = useState([]);
  const [rozhidOptions, setRozhidActions] = useState([]);

  const paramsSelect = (paramsId) => {
    setValues({ ...values, paramsId: paramsId.value });
  };

  const vendorSelect = (vendorId) => {
    setValues({ ...values, vendorId: vendorId.value });
  };
  const rozhidSelect = (dilankaId) => {
    setValues({ ...values, dilankaId: dilankaId.value });
  };

  useEffect(() => {
    setRozhidActions(
      dilankaId.length &&
        dilankaId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [dilankaId]);
  useEffect(() => {
    setParamsOptions(
      paramsId.length &&
        paramsId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [paramsId]);
  useEffect(() => {
    setVendorOptions(
      vendorId.length &&
        vendorId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [vendorId]);
  useEffect(() => {
    (async () => {
      await fetchMaterialVendor();
      await fetchMaterialParams();
      await fetchMaterialRozhid();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити тип</span>
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
              <span>Ділянка розходу</span>
            </div>
            <Select
              options={rozhidOptions}
              value={values.dilankaId.label}
              name="dilankaId"
              onChange={rozhidSelect}
              onBlur={handleBlur}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Постачальник</span>
            </div>
            <Select
              options={vendorOptions}
              value={values.vendorId.label}
              name="vendorId"
              onChange={vendorSelect}
              onBlur={handleBlur}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Параметер</span>
            </div>
            <Select
              options={paramsOptions}
              value={values.paramsId.label}
              name="paramsId"
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
    vendorId: {},
    paramsId: {},
    dilankaId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.name ||
      !values.vendorId ||
      !values.dilankaId ||
      !values.paramsId
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createPakType, history } }) => {
    const typeToSubmit = {
      name: values.name,
      vendorId: values.vendorId,
      paramsId: values.paramsId,
      dilankaId: values.dilankaId,
    };
    const isSuccess = await createPakType(typeToSubmit);
    if (isSuccess) {
      history.push("/pak_materials") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreatePakType);
const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
    vendorId: state.materialVendor.materialVendor,
    paramsId: state.materialParams.materialParams,
    dilankaId: state.materialRozhid.materialRozhid,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createPakType: (materialType) =>
      dispatch(createMaterialTypeAction(materialType)),
    fetchMaterialVendor: () => dispatch(getMaterialVendorAction()),
    fetchMaterialParams: () => dispatch(getMaterialParamsAction()),
    fetchMaterialRozhid: () => dispatch(getMaterialRozhidAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
