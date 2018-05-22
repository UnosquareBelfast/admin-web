import React from 'react';
import { PropTypes as PT } from 'prop-types';
import styles from './style.css';
import container from './container';

const TakenLeave = (props) => {

  const formatDate = (date) => {
    const definedDate = new Date(date);
    const year = definedDate.getFullYear();
    const month = definedDate.toLocaleString('en-us', { month: 'long'});
    const day = definedDate.getDate();

    return year + '-' + month + '-' + day;
  };

  return (
    <div>
      {
        props.takenHolidays.map(holiday => {
          return <span className={styles.TextStyle}>
            {formatDate(holiday.date)}
          </span>;
        })
      }
    </div>
  );

};

TakenLeave.propTypes = {
  takenHolidays: PT.array,
};

export default container(TakenLeave);
