import React, { useState } from 'react';
import styles from './styles.module.scss'

const Tabs = ({ tabs }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className={styles.tabheader}>
        {tabs.map((tab : any, index : number) => (
          <div
            key={index}
            className={styles.tabheaderitem}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={styles.tabcontent}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
