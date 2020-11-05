import React, {useEffect, useState} from "react";
import s from "./Priaga.module.css";
import classnames from "classnames";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";
import {
  deletePriagaAction,
  filterPriagaAction,
  getPriagaAction
} from "../../store/actions/Priaga/priagaActions";
import {
  filterPriagaZalushokAction,
  getPriagaZalushokAction
} from "../../store/actions/Priaga/priagaZalushokActions";

const Priaga = ({
                     getZvitu,
                     filterZvitu,
                     deleteZvitu,
                     filteredZvitu,
                     getZvituRozxid,
                     zvitu,
                     operations,
                     zvituRozxid,
                     filterZvituRozxid,
                     filteredZvituRozxid,
                     deleteZvituRozxid,
                     getZvituZalushok,
                     filterZvituZalushok,
                     filteredZvituZalushok,
                     zvituZalushok,
                     getOperations
                   }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState([]);
  const h = useHistory();

  useEffect(() => {
    (async () => {
      await getZvitu();
      await getZvituZalushok();
    })();
  }, []);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Пряжа</span>
          <TabList className={s.tabs}>
            {["Прихід", "Розхід", "Залишок"].map((item, i) => (
              <Tab
                onClick={() => setActiveTabIndex(i)}
                key={item}
                className={classnames(s.tab, {
                  [s.tab__active]: activeTabIndex === i,
                })}
              >
                {item}
              </Tab>
            ))}
          </TabList>
          {activeTabIndex === 0 &&
          <div className={s.filter__container}>
            <div className={s.search__container}>
            </div>
            <div className={s.search__container}>
              <Input
                label="Період з:"
                type="date"
                onChange={({target}) =>
                  setDataForFilter({...dataForFilter, from: target.value})
                }
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="до:"
                type="date"
                onChange={({target}) =>
                  setDataForFilter({...dataForFilter, to: target.value})
                }
              />
            </div>
            <div className={s.create__worker}>
              <div className={s.exel__wrapper}>
                <ReactToExcel
                  table="table-to-xls"
                  filename="Sklad-1"
                  sheet="sheet 1"
                  buttonText="EXPORT"
                  className="exel"
                />
              </div>
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterZvitu(dataForFilter);
                }}
              />
            </div>
          </div>
          || activeTabIndex === 1 && (<>
              <div className={s.search__container}>
              </div>
              <div className={s.search__container}>
                <Input
                  label="Період з:"
                  type="date"
                  onChange={({target}) =>
                    setDataForFilter({...dataForFilter, fromRozxod: target.value})
                  }
                />
              </div>
              <div className={s.search__container}>
                <Input
                  label="до:"
                  type="date"
                  onChange={({target}) =>
                    setDataForFilter({...dataForFilter, toRozxod: target.value})
                  }
                />
              </div>
              <div className={s.create__worker}>
                <div className={s.exel__wrapper}>
                  <ReactToExcel
                    table="table-to-xls"
                    filename="Sklad-1"
                    sheet="sheet 1"
                    buttonText="EXPORT"
                    className="exel"
                  />
                </div>
                <Button
                  title="Пошук"
                  onClick={async () => {
                    await filterZvitu(dataForFilter);
                  }}
                />
              </div>
            </>
          ) || activeTabIndex === 2 && (<>
            <div className={s.filter__container}>
              <div className={s.search__container}>
              </div>
              <div className={s.search__container}>
              </div>
              <div className={s.search__container}>
                <Input
                  label="На таку-то дату:"
                  type="date"
                  onChange={({target}) =>
                    setDataForFilter({...dataForFilter, day: target.value})
                  }
                />
              </div>
              <div className={s.create__worker}>
                <div className={s.exel__wrapper}>
                  <ReactToExcel
                    table="table-to-xls"
                    filename="Sklad-1"
                    sheet="sheet 1"
                    buttonText="EXPORT"
                    className="exel"
                  />
                </div>
                <Button
                  title="Пошук"
                  onClick={async () => {
                    await filterZvituZalushok(dataForFilter);
                  }}
                />
              </div>
            </div>
          </>)}
        </div>

        <TabPanel>

          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Пряжі</th>
                <th className={s.status__table}>Тип</th>
                <th className={s.status__table}>Товщина</th>
                <th className={s.status__table}>Постачальник</th>
                <th className={s.status__table}>Ділянка</th>
                <th className={s.status__table}>Колір</th>
                <th className={s.status__table}>Ціна</th>
                <th className={s.status__table}>К-сть</th>
                <th className={s.status__table}></th>
                <th></th>
              </tr>
              {!filteredZvitu.length
                ? zvitu &&
                zvitu.map((zvit) => {
                  if (!zvit.date_rozxodu) {
                    return (
                      <tr key={zvit._id}>
                        <td>{zvit._id}</td>
                        <td>{zvit.typeId?._id || 'Всі'}</td>
                        <td>{zvit.tovtshinaId?._id || 'Всі'}</td>
                        <td>{zvit.vendorId?._id || 'Всі'}</td>
                        <td>
                          {zvit.dilankaRozxodyId?._id || 'Всі'}
                        </td>
                        <td>{zvit.colorId?._id || 'Всі'}</td>
                        <td>{zvit.price || 'Всі'}</td>
                        <td>{zvit.quantity || 'Всі'}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() => h.push(`/edit-priaga/${zvit._id}`)}
                            >
                              Редагувати
                            </button>
                            <button onClick={() => deleteZvitu(zvit._id)}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                })
                : filteredZvitu.length &&
                filteredZvitu.map((filter) => {
                  if (!filter.date_rozxodu) {
                    return (
                      <tr key={filter._id}>
                        <td>{filter._id}</td>
                        <td>{filter.typeId?._id || 'Всі'}</td>
                        <td>{filter.tovtshinaId?._id || 'Всі'}</td>
                        <td>{filter.vendorId?._id || 'Всі'}</td>
                        <td>
                          {filter.dilankaRozxodyId?._id || 'Всі'}
                        </td>
                        <td>{filter.colorId?._id || 'Всі'}</td>
                        <td>{filter.price || 'Всі'}</td>
                        <td>{filter.quantity || 'Всі'}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() =>
                                h.push(`/edit-zvitu/${filter._id}`)
                              }
                            >
                              Редагувати
                            </button>
                            <button onClick={() => deleteZvitu(filter._id)}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
          </div>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Пряжі</th>
                <th className={s.status__table}>Тип</th>
                <th className={s.status__table}>Товщина</th>
                <th className={s.status__table}>Постачальник</th>
                <th className={s.status__table}>Ділянка</th>
                <th className={s.status__table}>Колір</th>
                <th className={s.status__table}>Ціна</th>
                <th className={s.status__table}>К-сть</th>
                <th className={s.status__table}></th>
                <th></th>
              </tr>
              {!filteredZvitu.length
                ? zvitu &&
                zvitu.map((zvitRozxid) => {
                  if (zvitRozxid.date_rozxodu) {
                    return (
                      <tr key={zvitRozxid._id}>
                        <td>{zvitRozxid._id}</td>
                        <td>{zvitRozxid.typeId?._id || 'Всі'}</td>
                        <td>{zvitRozxid.tovtshinaId?._id || 'Всі'}</td>
                        <td>{zvitRozxid.vendorId?._id || 'Всі'}</td>
                        <td>
                          {zvitRozxid.dilankaRozxodyId?._id || 'Всі'}
                        </td>
                        <td>{zvitRozxid.colorId?._id || 'Всі'}</td>
                        <td>{zvitRozxid.price || 'Всі'}</td>
                        <td>{zvitRozxid.quantity || 'Всі'}</td>
                        <td>
                          <div className={s.table__btn}>

                            <button
                              onClick={() => deleteZvituRozxid(zvitRozxid._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                })
                : filteredZvitu.length &&
                filteredZvitu.map((filter) => {
                  if (filter.date_rozxodu) {
                    return (
                      <tr key={filter._id}>
                        <td>{filter._id}</td>
                        <td>{filter.typeId?._id || 'Всі'}</td>
                        <td>{filter.tovtshinaId?._id || 'Всі'}</td>
                        <td>{filter.vendorId?._id || 'Всі'}</td>
                        <td>
                          {filter.dilankaRozxodyId?._id || 'Всі'}
                        </td>
                        <td>{filter.colorId?._id || 'Всі'}</td>
                        <td>{filter.price || 'Всі'}</td>
                        <td>{filter.quantity || 'Всі'}</td>
                        <td>
                          <div className={s.table__btn}>
                            <button
                              className={s.del}
                              onClick={() =>
                                h.push(`/edit-zvitu-rozxid/${filter._id}`)
                              }
                            >
                              Редагувати
                            </button>
                            <button
                              onClick={() => deleteZvituRozxid(filter._id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Пряжі</th>
                <th className={s.status__table}>Тип</th>
                <th className={s.status__table}>Товщина</th>
                <th className={s.status__table}>Постачальник</th>
                <th className={s.status__table}>Ділянка</th>
                <th className={s.status__table}>Колір</th>
                <th className={s.status__table}>Ціна</th>
                <th className={s.status__table}>К-сть</th>
                <th className={s.status__table}></th>
                <th></th>
              </tr>
              {!filteredZvituZalushok.length
                ? zvituZalushok &&
                zvituZalushok.map((zvitz) => {
                  return (
                    <tr key={zvitz._id}>
                      <td>{zvitz._id}</td>
                      <td>{zvitz.typeId?._id || 'Всі'}</td>
                      <td>{zvitz.tovtshinaId?._id || 'Всі'}</td>
                      <td>{zvitz.vendorId?._id || 'Всі'}</td>
                      <td>
                        {zvitz.dilankaRozxodyId?._id || 'Всі'}
                      </td>
                      <td>{zvitz.colorId?._id || 'Всі'}</td>
                      <td>{zvitz.price || 'Всі'}</td>
                      <td>{zvitz.quantity || 'Всі'}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button
                            className={s.del}
                            onClick={() => h.push("/edit")}
                          >
                            Редагувати
                          </button>
                          <button
                            onClick={() => deleteZvituRozxid(zvitz._id)}
                          >
                            Видалити
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
                : filteredZvituZalushok.length &&
                filteredZvituZalushok.map((filter) => {
                  return (
                    <tr key={filter._id}>
                      <td>{filter._id}</td>
                      <td>{filter.typeId?._id || 'Всі'}</td>
                      <td>{filter.tovtshinaId?._id || 'Всі'}</td>
                      <td>{filter.vendorId?._id || 'Всі'}</td>
                      <td>
                        {filter.dilankaRozxodyId?._id || 'Всі'}
                      </td>
                      <td>{filter.colorId?._id || 'Всі'}</td>
                      <td>{filter.price || 'Всі'}</td>
                      <td>{filter.quantity || 'Всі'}</td>
                      <td>
                        <div className={s.table__btn}>
                          <button
                            className={s.del}
                            onClick={() => h.push("/edit")}
                          >
                            Редагувати
                          </button>
                          <button
                            onClick={() => deleteZvituRozxid(filter._id)}
                          >
                            Видалити
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};
const mapStateToProps = (state) => {
  return {
    zvitu: state.priaga.materials,
    filteredZvitu: state.priaga.filtered,
    zvituZalushok: state.priagaZalushok.zvituZalushok,
    filteredZvituZalushok: state.priagaZalushok.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZvitu: () => dispatch(getPriagaAction()),
    filterZvitu: (data) => dispatch(filterPriagaAction(data)),
    deleteZvitu: (id) => dispatch(deletePriagaAction(id)),
    // deleteZvituRozxid: (id) => dispatch(deleteZvituRozxidAction(id)),
    // getZvituZalushok: (data) => dispatch(getZvituZalushokAction(data)),
    // filterZvituZalushok: (data) => dispatch(filterZvituZalushokAction(data)),
    // getZvituRozxid: () => dispatch(getMaterialsRozxidAction()),
    // filterZvituRozxid: (data) => dispatch(filterPriagaRozxidAction(data)),
    // deleteZvituRozxid: (id) => dispatch(deleteMaterialsRozxidAction(id)),
    getZvituZalushok: (data) => dispatch(getPriagaZalushokAction(data)),
    filterZvituZalushok: (data) => dispatch(filterPriagaZalushokAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Priaga);
