import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditZvituRozxid.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { getOperationsAction } from "../../store/actions/operationsAction";
import {
  editZvituAction,
  getSingleZvituAction,
} from "../../store/actions/Zvitu/zvituActions";
import { getWorkersAction } from "../../store/actions/workersActions";
import { useParams } from "react-router-dom";
import {
  editZvituRozxidAction,
  getSingleZvituRozxidAction,
} from "../../store/actions/Zvitu/zvituRozhidActions";

const EditZvituRozxid = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  getOperations,
  setValues,
  operations,
  getWorkers,
  workers,
  getSingleZvituRozxid,
  singleZvituRozxid,
}) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const [workersOptions, setWorkersOptions] = useState([]);
  const { id } = useParams();

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
      await getSingleZvituRozxid(id);
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
    } = singleZvituRozxid;
    if (singleZvituRozxid._id) {
      setValues({
        ...values,
        gatynok1,
        gatynok2,
        gatynok3,
        operationId,
        date_prixodu,
        workerId,
        _id,
      });
    }
  }, [singleZvituRozxid]);

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
              value={{ label: values.operationId, value: values.operationId }}
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
              value={{ label: values.workerId, value: values.workerId }}
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
    { props: { editZvituRozxid, singleZvituRozxid } }
  ) => {
    const zvituToSubmit = {
      operationId: values.operationId,
      gatynok1: values.gatynok1,
      gatynok2: values.gatynok2,
      gatynok3: values.gatynok3,
      workerId: values.workerId,
      date_prixodu: values.date_prixodu,
    };
    const isSuccess = await editZvituRozxid(
      zvituToSubmit,
      singleZvituRozxid._id
    );
    if (isSuccess) {
      alert("Success");
    } else {
      alert("error===");
    }
  },
})(EditZvituRozxid);
const mapStateToProps = (state) => {
  return {
    singleZvituRozxid: state.zvituRozxid.single,
    workers: state.workers.workers,
    operations: state.operations.operations,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleZvituRozxid: (id) => dispatch(getSingleZvituRozxidAction(id)),
    editZvituRozxid: (zvituRozxid, id) =>
      dispatch(editZvituRozxidAction(zvituRozxid, id)),
    getOperations: () => dispatch(getOperationsAction()),
    getWorkers: () => dispatch(getWorkersAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
