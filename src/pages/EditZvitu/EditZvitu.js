import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditZvitu.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getOperationsAction } from "../../store/actions/operationsAction";
import {
  editZvituAction,
  getSingleZvituAction,
} from "../../store/actions/Zvitu/zvituActions";
import { getWorkersAction } from "../../store/actions/workersActions";
import { useParams } from "react-router-dom";

const EditZvitu = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  getOperations,
  setValues,
  operations,
  getWorkers,
  workers,
  getSingleZvitu,
  singleZvitu,
}) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const [workersOptions, setWorkersOptions] = useState([]);
  const { id } = useParams();

  const operationSelect = (operations) => {
    setValues({
      ...values,
      operationId: operations.value,
      operationName: operations.label,
    });
  };
  const workerSelect = (workers) => {
    setValues({
      ...values,
      workerId: workers.value,
      workerName: workers.label,
    });
  };

  useEffect(() => {
    setWorkersOptions(
      workers.length &&
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
      await getSingleZvitu(id);
      await getOperations();
      await getWorkers();
    })();
  }, []);

  useEffect(() => {
    const {
      gatynok1,
      gatynok2,
      gatynok3,
      operationId,
      date_prixodu,
      workerId,
      _id,
    } = singleZvitu;
    if (singleZvitu._id) {
      setValues({
        ...values,
        gatynok1,
        gatynok2,
        gatynok3,
        operationId,
        operationName: operationId?.name,
        date_prixodu,
        workerId,
        workerName: workerId?.fName + " " + workerId.sName,
        _id,
      });
    }
  }, [singleZvitu]);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Змінити звіт прихід</span>
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
              value={{ label: values.operationName, value: values.operationId }}
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
              value={{ label: values.workerName, value: values.workerId }}
              name="workerId"
              onChange={workerSelect}
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
    gatynok1: "",
    gatynok2: "",
    gatynok3: "",
    date_prixodu: "",
    operationId: "",
    workerId: "",
  }),
  handleSubmit: async (
    values,
    { props: { editZvitu, singleZvitu, history } }
  ) => {
    const zvituToSubmit = {
      operationId: values.operationId,
      gatynok1: values.gatynok1,
      gatynok2: values.gatynok2,
      gatynok3: values.gatynok3,
      workerId: values.workerId,
      date_prixodu: values.date_prixodu,
    };
    const isSuccess = await editZvitu(zvituToSubmit, singleZvitu._id);
    if (isSuccess) {
      alert("Змінено") || history.push("/zvitu");
    } else {
      alert("error===");
    }
  },
})(EditZvitu);
const mapStateToProps = (state) => {
  return {
    singleZvitu: state.zvitu.single,
    workers: state.workers.workers,
    operations: state.operations.operations,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleZvitu: (id) => dispatch(getSingleZvituAction(id)),
    editZvitu: (zvitu, id) => dispatch(editZvituAction(zvitu, id)),
    getOperations: () => dispatch(getOperationsAction()),
    getWorkers: () => dispatch(getWorkersAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
