import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditMaterialPruhid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import {
  editMaterialsAction,
  getSingleMaterialsAction,
} from "../../store/actions/Materials/materialsActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";
import { getMaterialParamsValueAction } from "../../store/actions/Material/paramsValueActions";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import { getMaterialTypeAction } from "../../store/actions/Material/typeActions";
import { useParams } from "react-router-dom";

const EditMaterialPruhid = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  vendorId,
  fetchMaterialVendor,
  fetchMaterialType,
  typeId,
  fetchMaterialParams,
  paramsId,
  fetchMaterialParamsValue,
  paramsValueId,
  getSingleMaterials,
  singleMaterials,
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [paramsOptions, setParamsOptions] = useState([]);
  const [paramsValueOptions, setParamsValueOptions] = useState([]);

  const vendorSelect = (vendorId) => {
    setValues({
      ...values,
      vendorId: vendorId.value,
      vendorName: vendorId.label,
    });
  };

  const typeSelect = (typeId) => {
    setValues({ ...values, typeId: typeId.value, typeName: typeId.label });
  };
  const paramsSelect = (paramsId) => {
    setValues({
      ...values,
      paramsId: paramsId.value,
      paramsName: paramsId.label,
    });
  };
  const paramsValueSelect = (paramsValueId) => {
    setValues({
      ...values,
      paramsValueId: paramsValueId.value,
      paramsValueName: paramsValueId.label,
    });
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
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await getSingleMaterials(id);
      await fetchMaterialVendor();
      await fetchMaterialType();
      await fetchMaterialParams();
      await fetchMaterialParamsValue();
    })();
  }, []);
  useEffect(() => {
    const {
      name,
      vendorId,
      price,
      quantity,
      typeId,
      paramsId,
      paramsValueId,
      _id,
    } = singleMaterials;
    if (singleMaterials._id) {
      setValues({
        ...values,
        name,
        vendorId,
        vendorName: vendorId?.name,
        price,
        quantity,
        typeId,
        typeName: typeId?.name,
        paramsId,
        paramsName: paramsId?.name,
        paramsValueId,
        paramsValueName: paramsValueId?.name,
        _id,
      });
    }
  }, [singleMaterials]);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити прихід</span>
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
              value={{ label: values.vendorName, value: values.vendorId }}
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
              value={{ label: values.typeName, value: values.typeId }}
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
              value={{ label: values.paramsName, value: values.paramsId }}
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
              value={{
                label: values.paramsValueName,
                value: values.paramsValueId,
              }}
              name="paramsValueId"
              onChange={paramsValueSelect}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button title="Створити" onClick={handleSubmit} />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => ({
    price: "",
    quantity: "",
    date_prixod: "",
    vendorId: "",
    typeId: "",
    paramsId: "",
    paramsValueId: "",
  }),

  handleSubmit: async (
    values,
    { props: { createWorker, history, singleMaterials } }
  ) => {
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
    const isSuccess = await createWorker(workerToSubmit, singleMaterials._id);
    if (isSuccess) {
      history.push("/materials") || alert("Змінено");
    } else {
      alert("Помилка");
    }
  },
})(EditMaterialPruhid);
const mapStateToProps = (state) => {
  return {
    vendorId: state.materialVendor.materialVendor,
    typeId: state.materialType.materialType,
    paramsId: state.materialParams.materialParams,
    paramsValueId: state.materialParamsValue.materialParamsValue,
    singleMaterials: state.materials.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleMaterials: (id) => dispatch(getSingleMaterialsAction(id)),
    createWorker: (materials, id) =>
      dispatch(editMaterialsAction(materials, id)),
    fetchMaterialVendor: () => dispatch(getMaterialVendorAction()),
    fetchMaterialType: () => dispatch(getMaterialTypeAction()),
    fetchMaterialParams: () => dispatch(getMaterialParamsAction()),
    fetchMaterialParamsValue: () => dispatch(getMaterialParamsValueAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
