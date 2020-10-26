import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditWorker.module.css";
import { connect } from "react-redux";
import { withFormik } from "formik";
import {
  editWorkerAction,
  getSingleWorkerAction,
} from "../../store/actions/workersActions";
import { getOperationsAction } from "../../store/actions/operationsAction";
import { useParams } from "react-router-dom";

const EditWorker = ({
  values,
  handleChange,
  handleSubmit,
  getOperations,
  setValues,
  operations,
  singleWorker,
  getSingleWorker,
}) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const { id } = useParams();

  const options = [
    { value: "worked", label: "Працює" },
    { value: "not-worked", label: "Не працює" },
  ];

  const statusSelect = (options) => {
    setValues({ ...values, status: options.value });
  };

  const operationSelect = (operations) => {
    setValues({ ...values, operationId: operations.value });
  };

  useEffect(() => {
    setOperationsOptions(
      operations.map((opt) => {
        return { label: opt.name, value: opt._id };
      })
    );
  }, [operations]);

  useEffect(() => {
    (async () => {
      await getSingleWorker(id);
      await getOperations();
    })();
  }, []);

  useEffect(() => {
    const { fName, sName, fatherName, operationId, status, _id } = singleWorker;
    if (singleWorker._id) {
      setValues({
        ...values,
        fName,
        sName,
        fatherName,
        operationId: operationId[0],
        status,
        _id,
      });
    }
  }, [singleWorker]);

  return (
    <div className={s.main}>
      <div className={s.title__container}>
        <span className={s.title}>Редагувати працівника</span>
        <hr></hr>
      </div>
      <div className={s.main__container}>
        <div className={s.left}>
          <Input
            label="Прізвище"
            value={values.fName}
            name="fName"
            onChange={handleChange}
          />
          <div className={s.select__container}>
            <Input
              label="І'мя"
              value={values.sName}
              name="sName"
              onChange={handleChange}
            />
          </div>

          <div className={s.select__container}>
            <Input
              label="По-батькові"
              value={values.fatherName}
              name="fatherName"
              onChange={handleChange}
            />
          </div>
          <div className={s.select__container}>
            <div className={s.span}>
              <span>Статус</span>
            </div>
            <Select
              options={options}
              value={{ label: values.status, value: values.status }}
              name="status"
              onChange={statusSelect}
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
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button title="Редагувати" onClick={handleSubmit} />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: ({ singleWorker }) => {
    console.log(singleWorker);
    return {
      fName: "",
      sName: "",
      fatherName: "",
      operationId: "",
      status: "",
      _id: "",
    };
  },
  handleSubmit: async (
    values,
    { props: { editWorker, singleWorker }, resetForm }
  ) => {
    const workerToSubmit = {
      status: values.status,
      operationId: values.operationId,
      fName: values.fName,
      fatherName: values.fatherName,
      sName: values.sName,
    };
    console.log("pezda");
    const isSuccess = await editWorker(workerToSubmit, singleWorker._id);
    if (isSuccess) {
      alert("Success");
    } else {
      alert("error===");
    }
    resetForm({ fatherName: "", fName: "", sName: "" });
  },
})(EditWorker);
const mapStateToProps = (state) => {
  return {
    singleWorker: state.workers.single,
    operations: state.operations.operations,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleWorker: (id) => dispatch(getSingleWorkerAction(id)),
    editWorker: (workers, id) => dispatch(editWorkerAction(workers, id)),
    getOperations: () => dispatch(getOperationsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
