import React, { useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Equipment.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Equipment = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Обладнання</span>
          <hr></hr>
        </div>
        <TabList className={s.tabs}>
          {["Моделі", "Голки", "Дюйми", "Машини в'язальні"].map((item, i) => (
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
              <Input label="Пошук моделі" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити модель" />
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
              <Input label="Пошук голки" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити голку" />
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
              <Input label="Пошук дюйму" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити дюйм" />
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
              <Input label="Пошук продукту" />
            </div>
            {/* <div className={s.date__filter}>
              <Input type="date" label="Фільтрувати за датою" />
            </div> */}
            <div className={s.create__worker}>
              <Button title="Створити машину" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th>ID</th>
                <th>Номер</th>
                <th>Всі ID</th>
                <th>Статус</th>
              </tr>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>

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
                <td>94</td>

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
                <td>67</td>
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

export default Equipment;
