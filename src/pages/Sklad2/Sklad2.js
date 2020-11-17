import React, {useEffect, useState} from "react";
import s from "./Sklad2.module.css";
import classnames from "classnames";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import {useHistory} from "react-router-dom";
import Modal from "../../misc/Modal/Modal";
import ReactToExcel from "react-html-table-to-excel/";
import {connect} from "react-redux";
import {
  deleteSklad2Action,
  filterSklad2Action,
  getSklad2Action,
  getSklad2ZalushokAction,
} from "../../store/actions/sklad2Actions";

const Sklad2 = ({
                  getSklad1,
                  sklad1,
                  getZalushok,
                  zalushok,
                  filterSklad1,
                  filteredSklad1,
                  deleteSklad1,
                  filteredRozxodSklad1,
                }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [skladToModal, setSklad] = useState();
  const h = useHistory();

  const handleDelete = () => {
  };

  useEffect(() => {
    (async () => {
      await getSklad1();
      await getZalushok();
    })();
  }, []);
  return (
    <Tabs>
      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        modalData={modalData}
        sklad1={skladToModal}
        from={2}
      />
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Склад 2</span>
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
          {(activeTabIndex === 0 && (
            <>
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
                    await filterSklad1(dataForFilter);
                  }}
                />
              </div>
            </>
          )) ||
          (activeTabIndex === 1 && (
            <>
              <div className={s.search__container}>
                <Input
                  label="Період з:"
                  type="date"
                  onChange={({target}) => {
                    setDataForFilter({
                      ...dataForFilter,
                      fromRozxod: target.value,
                    });
                  }}
                />
              </div>
              <div className={s.search__container}>
                <Input
                  label="до:"
                  type="date"
                  onChange={({target}) => {
                    setDataForFilter({
                      ...dataForFilter,
                      toRozxod: target.value,
                    });
                  }}
                />
              </div>
              <div className={s.create__worker}>
                <Button
                  title="Пошук"
                  onClick={() => filterSklad1(dataForFilter)}
                />
              </div>
            </>
          )) ||
          (activeTabIndex === 2 && (
            <>
              <div className={s.search__container__block}>
                <Input
                  label="На дату"
                  type="date"
                  onChange={({target}) => {
                    setDataForFilter({day: target.value});
                  }}
                />
              </div>
              <div className={s.search__container}>
                <Input
                  label="На дату"
                  type="date"
                  onChange={({target}) => {
                    setDataForFilter({day: target.value});
                  }}
                />
              </div>
              <div className={s.create__worker}>
                <Button
                  onClick={() => getZalushok(dataForFilter.day)}
                  title="Пошук"
                />
              </div>
            </>
          ))}
        </div>
        <TabPanel>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Мішка</th>
                <th className={s.status__table}>Дата</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Майстер</th>
                  <th className={s.status__table}>Вязальниця</th>
                </div>
                <th className={s.status__table}>Обладнання</th>
                <th className={s.status__table}>Артикул</th>
                <th className={s.status__table}>Клас</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Розмір</th>
                  <th className={s.status__table}>Маюнок</th>
                </div>
                <th className={s.status__table}>Колір</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Асортимент</th>
                  <th className={s.status__table}>Тип</th>
                </div>
                <th className={s.status__table}>Гатунок разом</th>
                <th className={s.status__table}>Гатунок 1/2/3</th>
                <th className={s.status__table}> ID юзера</th>
                <th></th>
              </tr>
              {!filteredSklad1.length
                ? sklad1 &&
                sklad1.map((sklad) => {
                  if (sklad.date_rozsxodu === null) {
                    return (
                      <tr key={sklad._id}>
                        <td>{sklad.mishok.barcode || "Всі"}</td>
                        <td>{sklad?.date_prixod?.slice(0, 10) || "Всі"}</td>
                        <td>
                            <span>
                              {sklad?.shveyaId?.fName +
                              " " +
                              sklad?.shveyaId?.sName || "Всі"}{" "}
                              |{" "}
                            </span>
                          {sklad?.sortId?.fName +
                          " " +
                          sklad?.sortId?.sName || "Всі"}
                        </td>
                        <td>{sklad?.machineId?.name || "Всі"}</td>
                        <td>{sklad?.mishok?.articleId?.name || "Всі"}</td>
                        <td>{sklad?.mishok?.classId?.name || "Всі"}</td>
                        <td>
                            <span>
                              {sklad?.mishok?.sizeId?.name || "Всі"} |{" "}
                            </span>
                          {sklad?.mishok?.imageId?.name || "Всі"}
                        </td>
                        <td>{sklad?.mishok?.colorId?.name || "Всі"}</td>
                        <td>
                            <span>
                              {sklad?.mishok?.asortumentId?.name || "Всі"} |{" "}
                            </span>
                          {sklad?.mishok?.typeId?.name || "Всі"}
                        </td>
                        <td>
                          {sklad.mishok.gatynok1 +
                          sklad.mishok.gatynok2 +
                          sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <td>
                          {sklad.mishok.gatynok1 || "Всі"}
                          {" /" + sklad.mishok.gatynok2 || "Всі"}
                          {" /" + sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <td>{sklad?.changesId?.firstName || "Всі"}</td>
                        <td className={s.btn}>
                          {/*<div className={s.table__btn}>*/}
                          <button
                            className={s.del}
                            onClick={() =>
                              h.push(`/edit-sklad2/${sklad._id}`)
                            }
                          >
                            Редагувати
                          </button>
                          <button onClick={() => deleteSklad1(sklad._id)}>
                            Видалити
                          </button>
                          <button
                            onClick={() => {
                              setIsVisible(!isVisible);
                              setModalData(sklad.mishok._id);
                              setSklad(sklad._id);
                            }}
                            className={s.sent}
                          >
                            Відправити
                          </button>
                          {/*</div>*/}
                        </td>
                      </tr>
                    );
                  }
                })
                : filteredSklad1.length &&
                filteredSklad1.map((filtered) => {
                  return (
                    <tr key={filtered._id}>
                      <td>{filtered.mishok.barcode || "Всі"}</td>
                      <td>{filtered.date_prixod.slice(0, 10) || "Всі"}</td>
                      <div className={s.gatynok}>
                        <td>
                          {filtered?.shveyaId?.fName +
                          " " +
                          filtered?.shveyaId?.sName || "Всі"}
                        </td>

                        <td>
                          {filtered?.sortId?.fName +
                          " " +
                          filtered?.sortId?.sName || "Всі"}
                        </td>
                      </div>
                      <td>{filtered?.machineId?.name || "Всі"}</td>
                      <td>{filtered?.mishok?.articleId?.name || "Всі"}</td>
                      <td>{filtered?.mishok?.classId?.name || "Всі"}</td>
                      <div className={s.gatynok}>
                        <td>{filtered?.mishok?.sizeId?.name || "Всі"}</td>

                        <td>{filtered?.mishok?.imageId?.name || "Всі"}</td>
                      </div>
                      <td>{filtered?.mishok?.colorId?.name || "Всі"}</td>
                      <div className={s.gatynok}>
                        <td>
                          {filtered?.mishok?.asortumentId?.name || "Всі"}
                        </td>

                        <td>{filtered?.mishok?.typeId?.name || "Всі"}</td>
                      </div>
                      <td>
                        {filtered.mishok.gatynok1 +
                        filtered.mishok.gatynok2 +
                        filtered.mishok.gatynok3 || "Всі"}
                      </td>
                      <div className={s.gatynok}>
                        <td>
                          {filtered.mishok.gatynok1 || "Всі"}
                          {" /" + filtered.mishok.gatynok2 || "Всі"}
                          {" /" + filtered.mishok.gatynok3 || "Всі"}
                        </td>
                      </div>
                      <td>{filtered?.changesId?.firstName || "Всі"}</td>
                      <td className={s.btn}>
                        <div className={s.table__btn}>
                          <button
                            className={s.del}
                            onClick={() =>
                              h.push(`/edit-sklad2/${filtered._id}`)
                            }
                          >
                            Редагувати
                          </button>
                          <button onClick={() => deleteSklad1(filtered._id)}>
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
        <TabPanel>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.status__table}>ID Мішка</th>
                <th className={s.status__table}>Дата</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Майстер</th>
                  <th className={s.status__table}>Вязальниця</th>
                </div>
                <th className={s.status__table}>Обладнання</th>
                <th className={s.status__table}>Артикул</th>
                <th className={s.status__table}>Клас</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Розмір</th>
                  <th className={s.status__table}>Маюнок</th>
                </div>
                <th className={s.status__table}>Колір</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Асортимент</th>
                  <th className={s.status__table}>Тип</th>
                </div>
                <th className={s.status__table}>Гатунок разом</th>
                <th className={s.status__table}>Гатунок 1/2/3</th>
                <th className={s.status__table}> ID юзера</th>
                <th></th>
              </tr>
              {!filteredRozxodSklad1.length
                ? sklad1 &&
                sklad1?.map((sklad) => {
                  if (sklad.date_rozsxodu) {
                    return (
                      <tr key={sklad._id}>
                        <td>{sklad.mishok.barcode}</td>
                        <td>{sklad.date_rozsxodu.split("T")[0]}</td>
                        <td>
                          <span>{sklad?.shveyaId?.fName} | </span>
                          {sklad.sortId.fName}
                        </td>
                        <td>{sklad.machineId?.name || "Всі"}</td>
                        <td>{sklad.mishok?.articleId?.name || "Всі"}</td>
                        <td>{sklad.mishok.classId?.name || "Всі"}</td>
                        <td>
                          <span>{sklad.mishok.sizeId?.name || "Всі"} | </span>
                          {sklad.mishok.imageId?.name || "Всі"}
                        </td>
                        <td>{sklad.mishok.colorId?.name || "Всі"}</td>
                        <td>
                            <span>
                              {sklad.mishok?.asortumentId?.name || "Всі"} |{" "}
                            </span>
                          {sklad.mishok.typeId?.name || "Всі"}
                        </td>
                        <td>
                          {sklad.mishok.gatynok1 +
                          sklad.mishok.gatynok2 +
                          sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <td>
                          {sklad.mishok.gatynok1 || "Всі"}
                          {" /" + sklad.mishok.gatynok2 || "Всі"}
                          {" /" + sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <td>{sklad.changesId.firstName || "Всі"}</td>
                        <td className={s.btn}>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button onClick={() => deleteSklad1(sklad._id).then(()=>{getSklad1()}).catch(()=>alert('Помилка'))}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })
                : filteredRozxodSklad1?.map((sklad) => {
                  if (sklad.date_rozsxodu) {
                    return (
                      <tr>
                        <td>{sklad.mishok.barcode}</td>
                        <td>{sklad.date_rozsxodu.split("T")[0]}</td>
                        <td>
                          <span>{sklad.shveyaId.fName} | </span>
                          {sklad.sortId.fName}
                        </td>
                        <td>{sklad.machineId.name || "Всі"}</td>
                        <td>{sklad.mishok.articleId.name || "Всі"}</td>
                        <td>{sklad.mishok.classId.name || "Всі"}</td>
                        <td>
                          <span>{sklad.mishok.sizeId.name || "Всі"} | </span>
                          {sklad.mishok.imageId.name || "Всі"}
                        </td>
                        <td>{sklad.mishok.colorId.name || "Всі"}</td>
                        <td>
                            <span>
                              {sklad.mishok?.asortumentId?.name || "Всі"} |{" "}
                            </span>
                          {sklad.mishok.typeId.name || "Всі"}
                        </td>
                        <td>
                          {sklad.mishok.gatynok1 +
                          sklad.mishok.gatynok2 +
                          sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <td>
                          {sklad.mishok.gatynok1 || "Всі"}
                          {" /" + sklad.mishok.gatynok2 || "Всі"}
                          {" /" + sklad.mishok.gatynok3 || "Всі"}
                        </td>
                        <td>{sklad.changesId.firstName || "Всі"}</td>
                        <td className={s.btn}>
                          <div className={s.table__btn}>
                            <button className={s.del}>Редагувати</button>
                            <button onClick={() => deleteSklad1(sklad._id).then(()=>{getSklad1()}).catch(()=>alert('Помилка'))}>
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.status__table}>ID Мішка</th>
                <th className={s.status__table}>Дата</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Майстер</th>
                  <th className={s.status__table}>Вязальниця</th>
                </div>
                <th className={s.status__table}>Обладнання</th>
                <th className={s.status__table}>Артикул</th>
                <th className={s.status__table}>Клас</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Розмір</th>
                  <th className={s.status__table}>Маюнок</th>
                </div>
                <th className={s.status__table}>Колір</th>
                <div className={s.table__column}>
                  <th className={s.status__table}>Асортимент</th>
                  <th className={s.status__table}>Тип</th>
                </div>
                <th className={s.status__table}>Гатунок разом</th>
                <th className={s.status__table}>Гатунок 1/2/3</th>
                <th className={s.status__table}> ID юзера</th>
                <th></th>
              </tr>
              {zalushok?.map((zal) => {
                return (
                  <tr key={zal._id}>
                    <td>{zal.mishok.barcode}</td>
                    <td>{zal?.date_rozsxodu?.split("T")[0] || "Всі"}</td>
                    <td>
                      <span>{zal.shveyaId.fName} | </span>
                      {zal.sortId.fName}
                    </td>
                    <td>{zal.machineId?.name || "Всі"}</td>
                    <td>{zal.mishok.articleId?.name || "Всі"}</td>
                    <td>{zal.mishok.classId?.name || "Всі"}</td>
                    <td>
                      <span>{zal.mishok.sizeId?.name || "Всі"} | </span>
                      {zal.mishok.imageId?.name || "Всі"}
                    </td>
                    <td>{zal.mishok.colorId?.name || "Всі"}</td>
                    <td>
                      <span>{zal.mishok?.asortumentId?.name || "Всі"} | </span>
                      {zal.mishok.typeId?.name || "Всі"}
                    </td>
                    <td>
                      {zal.mishok.gatynok1 +
                      zal.mishok.gatynok2 +
                      zal.mishok.gatynok3 || "Всі"}
                    </td>
                    <td>
                      {zal.mishok.gatynok1 || "Всі"}
                      {" /" + zal.mishok.gatynok2 || "Всі"}
                      {" /" + zal.mishok.gatynok3 || "Всі"}
                    </td>
                    <td>{zal.changesId.firstName || "Всі"}</td>
                    <td className={s.btn}>
                      <div className={s.table__btn}>
                        <button className={s.del}>Редагувати</button>
                        <button onClick={() => deleteSklad1(zal._id)}>
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
    sklad1: state.sklad2.sklad2,
    zalushok: state.sklad2.sklad2_zalushok,
    filteredSklad1: state.sklad2.filtered,
    filteredRozxodSklad1: state.sklad2.filteredRozxod,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZalushok: (day) => dispatch(getSklad2ZalushokAction(day)),
    getSklad1: (searchValue) => dispatch(getSklad2Action(searchValue)),
    filterSklad1: (data) => dispatch(filterSklad2Action(data)),
    deleteSklad1: (id) => dispatch(deleteSklad2Action(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sklad2);
