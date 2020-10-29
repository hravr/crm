import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./CreateZvitu.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { createZvituAction } from "../../store/actions/Zvitu/zvituActions";
import { getWorkersAction } from "../../store/actions/workersActions";

const CreateZvitu = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  getOperations,
  setValues,
  operations,
  getWorkers,
  workers,
}) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const [workersOptions, setWorkersOptions] = useState([]);

  const operationSelect = (operations) => {
    setValues({ ...values, operationId: operations.value });
  };
  const workerSelect = (workers) => {
    setValues({ ...values, workerId: workers.value });
  };

  useEffect(() => {
    setWorkersOptions(
      workers.map((opt) => {
        return { label: opt.fName, value: opt._id };
      })
    );
  }, [workers]);
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
      await getWorkers();
    })();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Створити звіт прихід</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            label="Гатунок 1"
            value={values.gatynok1}
            name="gatynok1"
            onChange={handleChange}
            type="number"
          />
          <div className={s.select__container}>
            <Input
              label="Гатунок 2"
              value={values.gatynok2}
              name="gatynok2"
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className={s.select__container}>
            <Input
              label="Гатунок 3"
              value={values.gatynok3}
              name="gatynok3"
              onChange={handleChange}
              type="number"
            />
          </div>
          <Input
            type="date"
            label="Дата"
            value={values.date_prixodu}
            name="date_prixodu"
            onChange={handleChange}
          />
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Операція</span>
            </div>
            <Select
              options={operationsOptions}
              value={values.operationId.label}
              name="operationId"
              onChange={operationSelect}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Працівник</span>
            </div>
            <Select
              options={workersOptions}
              value={values.workerId.label}
              name="workerId"
              onChange={workerSelect}
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
    gatynok1: "",
    gatynok2: "",
    gatynok3: "",
    date_prixodu: "",
    operationId: {},
    workerId: {},
  }),
  handleSubmit: async (values, { props: { createZvitu }, resetForm }) => {
    const zvituToSubmit = {
      operationId: values.operationId,
      gatynok1: values.gatynok1,
      gatynok2: values.gatynok2,
      gatynok3: values.gatynok3,
      workerId: values.workerId,
      date_prixodu: values.date_prixodu,
    };
    const isSuccess = await createZvitu(zvituToSubmit);
    if (isSuccess) {
      alert("Success");
    } else {
      alert("error===");
    }
    resetForm({
      gatynok1: "",
      gatynok2: "",
      gatynok3: "",
      workerId: "",
      operationId: "",
    });
  },
})(CreateZvitu);
const mapStateToProps = (state) => {
  return {
    workers: state.workers.workers,
    operations: state.operations.operations,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createZvitu: (zvitu) => dispatch(createZvituAction(zvitu)),
    getOperations: () => dispatch(getOperationsAction()),
    getWorkers: () => dispatch(getWorkersAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
