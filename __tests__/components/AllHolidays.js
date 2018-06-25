import React from 'react';
import { shallow } from 'enzyme';
import { AllHolidays } from '../../src/components/AllHolidays';
import holidayStatus from '../../src/utilities/holidayStatus';

const dummyHolidays = [{
  employee: { 
    forename: 'Joe',
    surname: 'Bloggs',
  },
  holidayId: 123,
  date: [1, 1, 2018],
  dateCreated: new Date(),
  holidayStatusId: holidayStatus.PENDING,
}];

describe('AllHolidays', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AllHolidays holidays={ dummyHolidays }/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();    
  });
});
