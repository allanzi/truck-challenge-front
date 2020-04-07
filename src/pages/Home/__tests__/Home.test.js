import React from 'react';

import HomePage from '../index';

it('should render correct', () => {
  const wrapper = shallow(<HomePage />);

  expect(wrapper).toMatchSnapshot();
});
