import React, { useState } from "react";
import s from "./Sklad1.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";

const Sklad1 = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Обладнання</span>
          <hr></hr>
        </div>
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
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Період з:" type="date" />
            </div>
            <div className={s.search__container}>
              <Input label="до:" type="date" />
            </div>
            <div className={s.create__worker}>
              <Button title="Пошук" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>ID швеї</th>
                <th className={s.status__table}>ID сортувальниці</th>
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
              <Input label="Період з:" type="date" />
            </div>
            <div className={s.search__container}>
              <Input label="до:" type="date" />
            </div>
            <div className={s.create__worker}>
              <Button title="Пошук" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>ID швеї</th>
                <th className={s.status__table}>ID сортувальниці</th>
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
              <Input label="На дату" type="date" />
            </div>
            <div className={s.create__worker}>
              <Button title="Пошук" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>Дата</th>
                <th className={s.status__table}>ID швеї</th>
                <th className={s.status__table}>ID сортувальниці</th>
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
      </div>
    </Tabs>
  );
};

export default Sklad1;
