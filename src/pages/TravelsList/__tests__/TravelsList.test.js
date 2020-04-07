import React from 'react';

import TravelsList from '../index';

it('should render correct', () => {
  const wrapper = shallow(<TravelsList match={{ params: { id: 'create' } }} />);

  expect(wrapper).toMatchSnapshot();
});
