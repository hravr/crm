import React, {useEffect, useMemo, useState} from 'react';
import Select from "react-select";
import s from './Modal.module.css';
import {
  getSklad1Action,
  postSklad1to2Action,
  postSklad1to3Action,
  postSklad1to4Action
} from "../../store/actions/sklad1Actions";
import {getWorkersAction} from "../../store/actions/workersActions";
import {getOperationsAction} from "../../store/actions/operationsAction";
import {connect} from "react-redux";
import {getSklad2Action, postSklad2to3Action, postSklad2to4Action} from "../../store/actions/sklad2Actions";
import {getSklad3Action, postSklad3to4Action} from "../../store/actions/sklad3Actions";

const Modal = (
  {
    isVisible, setIsVisible,
    modalData, sklad1,
    rozxidToSklad2, rozxidToSklad3, rozxidToSklad4,
    workers, operations, getOperations, getWorkers, from,
    rozxid2ToSklad3, rozxid2ToSklad4, rozxid3ToSklad4,
    updateSklad1, updateSklad2, updateSklad3
  }
) => {

  useEffect(() => {
    (async () => {
      await getOperations();
      await getWorkers();
    })();
  }, []);

  const variables = [
    {
      label: "Склад 2",
      value: 'склад2',
    },
    {
      label: "Склад 3",
      value: 'склад3',
    },
    {
      label: "Склад 4",
      value: 'склад4',
    }
  ];
  const correctOptions = () => {
    if (from === 1) {
      return variables
    } else if (from === 2) {
      return [variables[1], variables[2]]
    } else if (from === 3) {
      return [variables[2]]
    }
  }

  const [selected, setSelected] = useState();
  const [dataToSubmit, setDataToSubmit] = useState({mishok: modalData, skladId: sklad1});

  const handleSelected = (e) => {
    if (e.value === "склад2") {
      setSelected(2)
      setDataToSubmit({...dataToSubmit, mishok: modalData, skladId: sklad1})
    }
    if (e.value === "склад3") {
      setSelected(3)
      setDataToSubmit({...dataToSubmit, mishok: modalData, skladId: sklad1})
    }
    if (e.value === "склад4") {
      setSelected(4)
      setDataToSubmit({...dataToSubmit, mishok: modalData, skladId: sklad1})
    }
  }

  const handleSubmit = () => {
    if (from === 1) {
      if (selected === 2) {
        if (dataToSubmit.mishok && dataToSubmit.shveyaId && dataToSubmit.sortId && dataToSubmit.date_rozsxodu) {
          rozxidToSklad2(dataToSubmit).then(res => {
            updateSklad1()
            setIsVisible(false)
          });
          setSelected(0)
        } else {
          alert('Заповніть всі дані !!!')
        }
      }
      if (selected === 3) {
        if (dataToSubmit.mishok && dataToSubmit.formId && dataToSubmit.date_rozsxodu) {
          rozxidToSklad3(dataToSubmit).then(() => {
            updateSklad1()
            setIsVisible(false)
          });
          setSelected(0)
        } else {
          alert('Заповніть всі дані !!!')
        }
      }
      if (selected === 4) {
        if (dataToSubmit.mishok && dataToSubmit.packId && dataToSubmit.date_rozsxodu) {
          rozxidToSklad4(dataToSubmit).then(res => {
            updateSklad1()
            setIsVisible(false)
          });
          setSelected(0)
        } else {
          alert('Заповніть всі дані !!!')
        }
      }
    } else if (from === 2) {
      if (selected === 3) {
        if (dataToSubmit.mishok && dataToSubmit.formId && dataToSubmit.date_rozsxodu) {
          rozxid2ToSklad3(dataToSubmit).then(res => {
            updateSklad2()
            setIsVisible(false)
          });
          setSelected(0)
        } else {
          alert('Заповніть всі дані !!!')
        }
      } else
      //   {
        //   alert('Можливо відправити тільки на склад 3')
        // }
      if (selected === 4) {
        if (dataToSubmit.mishok && dataToSubmit.packId && dataToSubmit.date_rozsxodu) {
          rozxid2ToSklad4(dataToSubmit).then(res => {
            updateSklad2()
            setIsVisible(false)
          });
          setSelected(0)
        } else {
          alert('Заповніть всі дані !!!')
        }
      } else {
        alert('Можливо відправити тільки на склад 3, 4')
      }
    } else if (from === 3) {
      if (selected === 4) {
        if (dataToSubmit.mishok && dataToSubmit.packId && dataToSubmit.date_rozsxodu) {
          rozxid3ToSklad4(dataToSubmit).then(res => {
            updateSklad3()
            setIsVisible(false)
          });
          setSelected(0)
        } else {
          alert('Заповніть всі дані !!!')
        }
      } else {
        alert('Можливо відправити тільки на склад 4')
      }
    } else {
      alert('Не можливо відправити на склад')
    }

  };
  const handleDate = ({target}) => {
    setDataToSubmit({...dataToSubmit, date_rozsxodu: target.value})
  };
  const handleForm = (e) => {
    setDataToSubmit({...dataToSubmit, formId: e.value})
  };
  const handlePack = (e) => {
    setDataToSubmit({...dataToSubmit, packId: e.value})
  };
  const handleShveya = (e) => {
    setDataToSubmit({...dataToSubmit, shveyaId: e.value})
  };
  const handleSort = (e) => {
    setDataToSubmit({...dataToSubmit, sortId: e.value})
  };

  const operationsObject = useMemo(() => {
    const temp = {};
    operations.forEach((operation) => {
      workers.forEach((worker) => {
        if (!temp[operation.name]) {
          temp[operation.name] = [worker];
          return;
        }
        temp[operation.name].push(worker);
      });
    });
    return temp;
  }, [workers, operations]);

  const operationsOptions = useMemo(() => {
    const temp = {};
    Object.entries(operationsObject).forEach(([key, value]) => {
      value.forEach((operation) => {
        const isCorrect = !!operation.operationId.find(({name}) => {
          return name === key;
        });
        if (!isCorrect) return;
        const {name, fName, sName} = operation;
        const option = {label: `${fName} ${sName}`, value: operation._id};
        if (!temp[key]) {
          temp[key] = [option];
          return;
        }
        temp[key].push(option);
      });
    });
    return temp;
  }, [operationsObject]);

  const handleExit = () => {
    setIsVisible(false)
    setSelected(0)
  }

  return isVisible && (
    <div className={s.container}>
      <div className={s.sub_container}>
        <div className={s.header}>
          <p>Розхід на </p>
          <p className={s.exit} onClick={handleExit}>X</p>
        </div>
        <Select
          defaultValue={variables[0].label}
          options={correctOptions()}
          onChange={handleSelected}
        />
        {selected === 2
        && <div className={s.sklad2}>
          <div className={s.select}>
            <p>Виберіть швею</p>
            <Select
              defaultValue={variables[0].label}
              options={operationsOptions["Швея"]}
              onChange={handleShveya}
            />
            <p>Виберіть сортувальницю</p>
            <Select
              defaultValue={variables[0].label}
              options={operationsOptions["Сортувальниця"]}
              onChange={handleSort}
            />
          </div>
          <label className={s.data}>
            <p>Виберіть дату розходу</p>
            <input type={'date'} onChange={handleDate}/>
          </label>
        </div>}


        {selected === 3 &&
        <div className={s.sklad2}>
          <div className={s.select}>
            <p>Виберіть Формувальницю</p>
            <Select
              defaultValue={variables[0].label}
              options={operationsOptions["Формувальниця"]}
              onChange={handleForm}
            />
          </div>
          <label className={s.data}>
            <p>Виберіть дату розходу</p>
            <input type={'date'} onChange={handleDate}/>
          </label>
        </div>
        }

        {selected === 4 && <div className={s.sklad2}>
          <div className={s.select}>
            <p>Виберіть пакувальниці</p>
            <Select
              defaultValue={variables[0].label}
              options={operationsOptions["Пакувальниця"]}
              onChange={handlePack}
            />
          </div>
          <label className={s.data}>
            <p>Виберіть дату розходу</p>
            <input type={'date'} onChange={handleDate}/>
          </label>
        </div>}


        <div className={s.footer}>
          <button className={s.btn} onClick={handleSubmit}>
            {"Зробити розхід на " + (variables[selected - 2]?.label || "")}
          </button>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('skl === ', state.sklad1)
  return {
    workers: state.workers.workers,
    operations: state.operations.operations
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    rozxidToSklad2: (data) => dispatch(postSklad1to2Action(data)),
    rozxidToSklad3: (data) => dispatch(postSklad1to3Action(data)),
    rozxidToSklad4: (data) => dispatch(postSklad1to4Action(data)),
    rozxid2ToSklad4: (data) => dispatch(postSklad2to4Action(data)),
    rozxid2ToSklad3: (data) => dispatch(postSklad2to3Action(data)),
    rozxid3ToSklad4: (data) => dispatch(postSklad3to4Action(data)),
    updateSklad1: () => dispatch(getSklad1Action()),
    updateSklad2: () => dispatch(getSklad2Action()),
    updateSklad3: () => dispatch(getSklad3Action()),
    getWorkers: () => dispatch(getWorkersAction()),
    getOperations: () => dispatch(getOperationsAction())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
