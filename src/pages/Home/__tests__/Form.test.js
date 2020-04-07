import React from 'react';

import FormPage from '../Form';

it('should render correct', () => {
  const wrapper = shallow(<FormPage />);

  expect(wrapper).toMatchSnapshot();
});
