import React from 'react';
import { render } from '@testing-library/react';
import Button from './button';

test('first react test case', () => {
  const wrapper = render(<Button>OK</Button>);
  const element = wrapper.queryByText('OK');
  expect(element).toBeTruthy();
});
