import React, { useState } from "react";
import Button from "../../misc/Button/Button";
import Input from "../../misc/Input/Input";
import s from "./Praja.module.css";
import classnames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Praja = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <Tabs>
      <div className={s.main}>
        <div className={s.title__container}>
          <span className={s.title}>Пряжа</span>
          <hr></hr>
        </div>
        <TabList className={s.tabs}>
          {[
            "Назва сировини",
            "Тип пряжі",
            "Товщина пряжі",
            "Постачальники",
            "Ділянки розходу",
            "Католожні кольори",
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
              <Input label="Пошук сировини" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити сировину" />
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
              <Input label="Пошук типу пряжі" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити тип пряжі" />
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
              <Input label="Пошук товщини пряжі" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити товщину пряжі" />
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
              <Input label="Пошук постачальника" />
            </div>
            {/* <div className={s.date__filter}>
              <Input type="date" label="Фільтрувати за датою" />
            </div> */}
            <div className={s.create__worker}>
              <Button title="Створити постачальника" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th>ID</th>
                <th>Країна</th>
                <th>Місто</th>
                <th>Назва</th>
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
        <TabPanel>
          <div className={s.filter__container}>
            <div className={s.search__container}>
              <Input label="Пошук ділянки розходу" />
            </div>
            {/* <div className={s.date__filter}>
              <Input type="date" label="Фільтрувати за датою" />
            </div> */}
            <div className={s.create__worker}>
              <Button title="Створити ділянку розходу" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th>Назва</th>
                <th>ID</th>
              </tr>
              <tr>
                <td>Jill</td>
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
              <Input label="Пошук каталожного кольору" />
            </div>
            <div className={s.create__worker}>
              <Button title="Створити католожний колір" />
            </div>
          </div>
          <div className={s.table}>
            <table>
              <tr>
                <th className={s.name__table}>Назва</th>
                <th className={s.status__table}>ID</th>
                <th className={s.status__table}>ID постачальника</th>
              </tr>
              <tr>
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

export default Praja;
