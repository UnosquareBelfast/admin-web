import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Tabs } from './styled';

const TabsUI = (props) => {

  return (
    <Tabs>
      <ul>
        {
          props.tabs.map( (tab, index) => (
            <li
              key={index}
              className={props.selectedTab === tab ? 'active' : ''}
              onClick={() => { props.updateSelectedTab(tab); }}
            >{tab}</li>
          ))
        }
      </ul>
    </Tabs>
  );
};

TabsUI.propTypes = {
  tabs: PT.array,
  selectedTab: PT.string,
  updateSelectedTab: PT.func.isRequired,
};

export default TabsUI;