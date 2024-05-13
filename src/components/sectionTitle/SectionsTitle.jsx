import React from 'react';
import styles from './sectionTitle.module.scss'

const SectionsTitle = ({children}) => {
  return (
    <div className={styles.title}>
      {children}
    </div>
  );
};

export default SectionsTitle;