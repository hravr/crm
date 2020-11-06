import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreateMaterialPruhid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { createMaterialsAction } from "../../store/actions/Materials/materialsActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";
import { getMaterialParamsValueAction } from "../../store/actions/Material/paramsValueActions";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import { getMaterialTypeAction } from "../../store/actions/Material/typeActions";

const CreateMaterialPruhid = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  errors,
  vendorId,
  fetchMaterialVendor,
  fetchMaterialType,
  typeId,
  fetchMaterialParams,
  paramsId,
  fetchMaterialParamsValue,
  paramsValueId,
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [paramsOptions, setParamsOptions] = useState([]);
  const [paramsValueOptions, setParamsValueOptions] = useState([]);

  const vendorSelect = (vendorId) => {
    setValues({ ...values, vendorId: vendorId.value });
  };

  const typeSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value });
  };
  const paramsSelect = (paramsId) => {
    setValues({ ...values, paramsId: paramsId.value });
  };
  const paramsValueSelect = (paramsValueId) => {
    setValues({ ...values, paramsValueId: paramsValueId.value });
  };

  useEffect(() => {
    setParamsValueOptions(
      paramsValueId.length &&
        paramsValueId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [paramsValueId]);
  useEffect(() => {
    setParamsOptions(
      paramsId.length &&
        paramsId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [paramsId]);
  useEffect(() => {
    setTypeOptions(
      typeId.length &&
        typeId.map((opt) => {
          return { label: opt.name, value: opt._id };
        })
    );
  }, [typeId]);

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
      await fetchMaterialType();
      await fetchMaterialParams();
      await fetchMaterialParamsValue();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити прихід</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <div className={s.select__container}>
            <Input
              label="Ціна"
              value={values.price}
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
          </div>

          <div className={s.select__container}>
            <Input
              label="Кількість"
              value={values.quantity}
              name="quantity"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Дата"
              value={values.date_prixod}
              name="date_prixod"
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
            />
          </div>
        </div>
        <div className={s.left}>
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
              <span>Тип</span>
            </div>
            <Select
              options={typeOptions}
              value={values.typeId.label}
              name="typeId"
              onChange={typeSelect}
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
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Значення параметру</span>
            </div>
            <Select
              options={paramsValueOptions}
              value={values.paramsValueId.label}
              name="paramsValueId"
              onChange={paramsValueSelect}
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
    price: "",
    quantity: "",
    date_prixod: "",
    vendorId: {},
    typeId: {},
    paramsId: {},
    paramsValueId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.price ||
      !values.quantity ||
      !values.date_prixod ||
      !values.vendorId ||
      !values.paramsId ||
      !values.paramsValueId ||
      !values.typeId
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createWorker, history } }) => {
    const workerToSubmit = {
      quantity: values.quantity,
      price: values.price,
      date_prixod: values.date_prixod,
      vendorId: values.vendorId,
      paramsId: values.paramsId,
      paramsValueId: values.paramsValueId,
      paramsValueId: values.paramsValueId,
      typeId: values.typeId,
    };
    const isSuccess = await createWorker(workerToSubmit);
    if (isSuccess) {
      history.push("/materials") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreateMaterialPruhid);
const mapStateToProps = (state) => {
  return {
    vendorId: state.materialVendor.materialVendor,
    typeId: state.materialType.materialType,
    paramsId: state.materialParams.materialParams,
    paramsValueId: state.materialParamsValue.materialParamsValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createWorker: (materials) => dispatch(createMaterialsAction(materials)),
    fetchMaterialVendor: () => dispatch(getMaterialVendorAction()),
    fetchMaterialType: () => dispatch(getMaterialTypeAction()),
    fetchMaterialParams: () => dispatch(getMaterialParamsAction()),
    fetchMaterialParamsValue: () => dispatch(getMaterialParamsValueAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
