import React, {useEffect, useState} from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreateWorker.module.css";
import {connect} from "react-redux";
import {withFormik} from "formik";
import {createWorkerAction} from "../../store/actions/workersActions";
import {getOperationsAction} from "../../store/actions/operationsAction";

const CreateWorker = ({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        getOperations,
                        setValues,
                        operations,
                        errors,
                      }) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const options = [
    {value: "worked", label: "Працює"},
    {value: "not-worked", label: "Не працює"},
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ?
        '#ddd' : !errors.name ?
          '#ddd' : 'red',
    })
  }

  const statusSelect = (options) => {
    setValues({...values, status: options.value});
  };

  const operationSelect = (operations) => {
    if (operations) {
      operations.map(oper => {
        setValues({...values, operationId: [...values.operationId, oper.value]});
      })
    }
  };

  useEffect(() => {
    setOperationsOptions(
      operations.map((opt) => {
        return {label: opt.name, value: opt._id};
      })
    );
  }, [operations]);
  useEffect(() => {
    (async () => {
      await getOperations();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити працівника</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            label="Прізвище"
            value={values.fName}
            name="fName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className={s.select__container}>
            <Input
              label="І'мя"
              value={values.sName}
              name="sName"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className={s.select__container}>
            <Input
              label="По-батькові"
              value={values.fatherName}
              name="fatherName"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Статус</span>
            </div>
            <Select
              options={options}
              value={values.status.label}
              styles={customStyles}
              name="status"
              onChange={statusSelect}
              onBlur={handleBlur}
            />
            <div className={s.select__container}>
              <div className={s.span}>
                <span>Операція</span>
              </div>
              <Select
                options={operationsOptions}
                value={values.operationId.label}
                name="operationId"
                isMulti
                styles={customStyles}
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
    fName: "",
    sName: "",
    fatherName: "",
    operationId: "",
    status: {},
  }),
  validate: (values) => {
    const errors = {};
    if (
      !values.fName ||
      !values.sName ||
      !values.fatherName ||
      !values.operationId ||
      !values.status
    ) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: async (values, {props: {createWorker, history}}) => {
    const workerToSubmit = {
      status: values.status,
      operationId: values.operationId,
      fName: values.fName,
      fatherName: values.fatherName,
      sName: values.sName,
    };
    const isSuccess = await createWorker(workerToSubmit);
    if (isSuccess) {
      history.push("/workers") || alert("Створено");
    } else {
      alert("Помилка");
    }
  },
})(CreateWorker);
const mapStateToProps = (state) => {
  return {
    operations: state.operations.operations,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createWorker: (workers) => dispatch(createWorkerAction(workers)),
    getOperations: () => dispatch(getOperationsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
