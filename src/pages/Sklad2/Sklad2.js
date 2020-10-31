import React, { useEffect, useState } from "react";
import s from "./Sklad2.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import {
  deleteSklad2Action,
  filterSklad2Action,
  getSklad2Action,
} from "../../store/actions/sklad2Actions.js";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";
const Sklad2 = ({ getSklad2, sklad2, filterSklad2, filteredSklad2 }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [dataForFilter, setDataForFilter] = useState({});
  const h = useHistory();

  useEffect(() => {
    (async () => {
      await getSklad2();
    })();
  }, []);
  return (
    <Tabs>
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
        </div>
        <hr></hr>
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input
                label="Пошук продукту"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, search: target.value })
                }
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="Період з:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, from: target.value })
                }
              />
            </div>
            <div className={s.search__container}>
              <Input
                label="до:"
                type="date"
                onChange={({ target }) =>
                  setDataForFilter({ ...dataForFilter, to: target.value })
                }
              />
            </div>
            <div className={s.create__worker}>
              <div className={s.exel__wrapper}>
                <ReactToExcel
                  table="table-to-xls"
                  filename="Sklad-2"
                  sheet="sheet 2"
                  buttonText="EXPORT"
                  className="exel"
                />
              </div>
              <Button
                title="Пошук"
                onClick={async () => {
                  await filterSklad2(dataForFilter);
                }}
              />
            </div>
          </div>
          <div className={s.table}>
            <table id="table-to-xls">
              <tr>
                <th className={s.status__table}>ID Мішка</th>
                <th className={s.status__table}>Ділянки розходу</th>
                <th className={s.status__table}>ID працівника</th>
                <th></th>
              </tr>
              {!filteredSklad2.length
                ? sklad2 &&
                  sklad2.map((sklad) => {
                    return (
                      <tr key={sklad2._id}>
                        <td>{sklad.mishok._id}</td>
                        <td>{sklad.mishok._id}</td>
                        <td>{sklad?.shveyaId}</td>
                      </tr>
                    );
                  })
                : filteredSklad2.length &&
                  filteredSklad2.map((filtered) => {
                    return <tr key={filtered._id}></tr>;
                  })}
            </table>
          </div>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </div>
    </Tabs>
  );
};
const mapStateToProps = (state) => {
  return {
    sklad2: state.sklad2.sklad2,
    filteredSklad2: state.sklad2.filtered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSklad2: (searchValue) => dispatch(getSklad2Action(searchValue)),
    filterSklad2: (data) => dispatch(filterSklad2Action(data)),
    deleteSklad2: (id) => dispatch(deleteSklad2Action(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sklad2);
