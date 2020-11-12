import React, {useEffect, useState} from "react";
import Select from "react-select";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import s from "./EditWorker.module.css";
import {connect} from "react-redux";
import {withFormik} from "formik";
import {editWorkerAction, getSingleWorkerAction,} from "../../store/actions/workersActions";
import {getOperationsAction} from "../../store/actions/operationsAction";
import {useParams} from "react-router-dom";

const EditWorker = ({
                      values,
                      handleChange,
                      handleSubmit,
                      getOperations,
                      setValues,
                      operations,
                      singleWorker,
                      getSingleWorker,
                      errors,
                    }) => {
  const [operationsOptions, setOperationsOptions] = useState([]);
  const {id} = useParams();

  const options = [
    {value: "worked", label: "Працює"},
    {value: "not-worked", label: "Не працює"},
  ];

  const statusSelect = (options) => {
    setValues({...values, status: options.value});
  };

  const operationSelect = (operations) => {
    operations.map(oper => {
      setValues({
        ...values,
        operationId: [...values.operationId, (oper.value)],
        operationName: values.operationName + ', ' + oper.label
      });
    })
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
      await getSingleWorker(id);
      await getOperations();
    })();
  }, []);

  useEffect(() => {
    const {fName, sName, fatherName, operationId, status, _id} = singleWorker;
    if (singleWorker._id) {
      setValues({
        ...values,
        fName,
        sName,
        fatherName,
        operationId: [operationId[0]._id],
        operationName: operationId[0].name,
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
              name="status"
              onChange={statusSelect}
              value={{label: values.status === 'worked' ? options[0].label : options[1].label}}
            />
            <div className={s.select__container}>
              <div className={s.span}>
                <span>Операція</span>
              </div>
              <Select
                options={operationsOptions}
                value={operationsOptions.filter(opt => values.operationId.includes(opt.value))}
                name="operationId"
                isMulti
                onChange={operationSelect}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={s.btn__container}>
        <Button
          title="Редагувати"
          onClick={handleSubmit}
          disabled={!!errors.name}
        />
      </div>
    </div>
  );
};
const formikHOC = withFormik({
  mapPropsToValues: () => {
    return {
      fName: "",
      sName: "",
      fatherName: "",
      operationId: [],
      status: "",
      _id: "",
    };
  },
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
  handleSubmit: async (
    values,
    {props: {editWorker, singleWorker, history}}
  ) => {
    const workerToSubmit = {
      status: values.status,
      operationId: values.operationId,
      fName: values.fName,
      fatherName: values.fatherName,
      sName: values.sName,
    };
    console.log(workerToSubmit)
    // const isSuccess = await editWorker(workerToSubmit, singleWorker._id);
    // if (isSuccess) {
    //   history.push("/workers") || alert("Змінено");
    // } else {
    //   alert("error===");
    // }
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
