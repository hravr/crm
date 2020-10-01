import React, { useState } from "react";
import s from "./PakMaterials.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";

const PakMaterials = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Пакувальні матеріали</span>
          <hr></hr>
        </div>
        <TabList className={s.tabs}>
          {[
            "Постачальники",
            "Ділянки розходу",
            "Тип",
            "Парем***",
            "Значення ****",
          ].map((item, i) => (
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
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Пошук постачальника" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити постачальника" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>ID</th>
                <th className={s.status__table}>Країна</th>
                <th className={s.status__table}>Місто</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>
                  Germany
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>
                  Sweden
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>
                  UK
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Пошук ділянки розходу" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити ділянку розходу" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>ID</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>
                  Germany
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Berglunds snabbkop</td>
                <td>
                  Sweden
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>
                  UK
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Пошук типу" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити тип" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>ID</th>
                <th className={s.status__table}>Всі ID</th>
                <th className={s.status__table}>Параметри</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>Alfreds Futterkiste</td>
                <td>
                  Germany
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>Berglunds snabbkop</td>
                <td>
                  Sweden
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>Island Trading</td>
                <td>
                  UK
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Пошук параметра" />
            </div>
            {/* <div className={s.date__filter}>
            <Input type="date" label="Фільтрувати за датою" />
          </div> */}
            <div className={s.create__worker}>
              <Button title="Створити параметер" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th>Назва</th>
                <th>ID</th>
                <th>Тип ID</th>
              </tr>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>
                  50
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>
                  94
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Adam</td>
                <td>Johnson</td>
                <td>
                  67
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Пошук значення" />
            </div>
            {/* <div className={s.date__filter}>
            <Input type="date" label="Фільтрувати за датою" />
          </div> */}
            <div className={s.create__worker}>
              <Button title="Створити значення" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th>Назва</th>
                <th>ID</th>
                <th>Тип ID</th>
              </tr>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>
                  50
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>
                  94
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Adam</td>
                <td>Johnson</td>
                <td>
                  67
                  <div className={s.table__btn}>
                    <button className={s.del}>Редагувати</button>
                    <button>Видалити</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default PakMaterials;
