import React from 'react';

import UsersList from '../index';

it('should render correct', () => {
  const wrapper = shallow(<UsersList match={{ params: { id: 'create' } }} />);

  expect(wrapper).toMatchSnapshot();
});
