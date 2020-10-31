import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditPakType.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import {
  editMaterialTypeAction,
  getSingleMaterialTypeAction,
} from "../../store/actions/Material/typeActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";
import { getMaterialParamsAction } from "../../store/actions/Material/paramsActions";
import { getMaterialRozhidAction } from "../../store/actions/Material/dilankaRozhoduActions";
import { useParams } from "react-router-dom";

const EditPakType = ({
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
  fetchMaterialRozhid,
  getSingleType,
  singleType,
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [paramsOptions, setParamsOptions] = useState([]);
  const [rozhidOptions, setRozhidActions] = useState([]);
  const { id } = useParams();
  const paramsSelect = (paramsId) => {
    setValues({
      ...values,
      paramsId: paramsId.value,
      paramsName: paramsId.label,
    });
  };

  const vendorSelect = (vendorId) => {
    setValues({
      ...values,
      vendorId: vendorId.value,
      vendorName: vendorId.label,
    });
  };
  const rozhidSelect = (dilankaId) => {
    setValues({
      ...values,
      dilankaId: dilankaId.value,
      dilankaName: dilankaId.label,
    });
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
      await getSingleType(id);
      await fetchMaterialVendor();
      await fetchMaterialParams();
      await fetchMaterialRozhid();
    })();
  }, []);
  useEffect(() => {
    const { name, paramId, vendorId, dilankaId, _id } = singleType;
    if (singleType._id) {
      setValues({
        ...values,
        name,
        paramId,
        paramsName: paramId?.name || "Всі",
        vendorId,
        vendorName: vendorId?.name || "Всі",
        dilankaId,
        dilankaName: dilankaId?.name || "Всі",
        _id,
      });
    }
  }, [singleType]);
  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити тип</span>
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
              value={{ label: values.dilankaName, value: values.dilankaId }}
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
              value={{ label: values.vendorName, value: values.vendorId }}
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
              value={{ label: values.paramsName, value: values.paramsId }}
              name="paramsId"
              onChange={paramsSelect}
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
    name: "",
    vendorId: "",
    paramsId: "",
    dilankaId: "",
  }),

  handleSubmit: async (
    values,
    { props: { editType, history, singleType } }
  ) => {
    const typeToSubmit = {
      name: values.name,
      vendorId: values.vendorId,
      paramsId: values.paramsId,
      dilankaId: values.dilankaId,
    };
    const isSuccess = await editType(typeToSubmit, singleType._id);
    if (isSuccess) {
      history.push("/pak_materials") || alert("Змінено");
    } else {
      alert("Помилка");
    }
  },
})(EditPakType);
const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
    vendorId: state.materialVendor.materialVendor,
    paramsId: state.materialParams.materialParams,
    dilankaId: state.materialRozhid.materialRozhid,
    singleType: state.materialType.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleType: (id) => dispatch(getSingleMaterialTypeAction(id)),
    editType: (materialType, id) =>
      dispatch(editMaterialTypeAction(materialType, id)),
    fetchMaterialVendor: () => dispatch(getMaterialVendorAction()),
    fetchMaterialParams: () => dispatch(getMaterialParamsAction()),
    fetchMaterialRozhid: () => dispatch(getMaterialRozhidAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
