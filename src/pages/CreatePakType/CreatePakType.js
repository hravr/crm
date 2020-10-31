import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreatePakType.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { createMaterialTypeAction } from "../../store/actions/Material/typeActions";
import { getMaterialVendorAction } from "../../store/actions/Material/vendorActions";

const CreatePakType = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  getOperations,
  setValues,
  operations,
  vendorId,
  fetchMaterialVendor,
  errors,
}) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const options = [
    { value: "worked", label: "Працює" },
    { value: "not-worked", label: "Не працює" },
  ];

  const vendorSelect = (vendorId) => {
    setValues({ ...values, vendorId: vendorId.value });
  };
  const statusSelect = (options) => {
    setValues({ ...values, status: options.value });
  };

  const operationSelect = (operations) => {
    setValues({ ...values, operationId: operations.value });
  };

  useEffect(() => {
    setVendorOptions(
      vendorId.map((opt) => {
        return { label: opt.name, value: opt._id };
      })
    );
  }, [vendorId]);
  useEffect(() => {
    setOperationsOptions(
      operations.map((opt) => {
        return { label: opt.name, value: opt._id };
      })
    );
  }, [operations]);
  useEffect(() => {
    (async () => {
      await getOperations();
      await fetchMaterialVendor();
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
            <Input
              label="Ділянка розходу на склад"
              value={values.dilankaId}
              name="dilankaId"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Статус</span>
            </div>
            <Select
              options={options}
              value={values.status.label}
              name="status"
              onChange={statusSelect}
              onBlur={handleBlur}
            />
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
                <span>Операція</span>
              </div>
              <Select
                options={operationsOptions}
                value={values.operationId.label}
                name="operationId"
                onChange={operationSelect}
                onBlur={handleBlur}
              />
            </div>
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
    dilankaId: "",
    operationId: {},
    status: {},
    vendorId: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.name ||
      !values.dilankaId ||
      !values.operationId ||
      !values.vendorId ||
      !values.status
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, { props: { createPakType, history } }) => {
    const typeToSubmit = {
      status: values.status,
      operationId: values.operationId,
      name: values.name,
      dilankaId: values.dilankaId,
      vendorId: values.vendorId,
    };
    const isSuccess = await createPakType(typeToSubmit);
    if (isSuccess) {
      history.push("/workers") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreatePakType);
const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
    vendorId: state.materialVendor.materialVendor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createPakType: (materialType) =>
      dispatch(createMaterialTypeAction(materialType)),
    fetchMaterialVendor: () => dispatch(getMaterialVendorAction()),
    getOperations: () => dispatch(getOperationsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
