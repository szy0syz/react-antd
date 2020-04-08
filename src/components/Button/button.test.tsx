import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'ccass',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test Button component', () => {
  it('should render the correct comonent based on different props', () => {
    const wrapper = render(<Button {...defaultProps}>default-btn</Button>);
    const element = wrapper.getByText('default-btn') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element); // 检查函数到底被调用没
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render then correct cmponent based on different props', () => {
    const wrapper = render(<Button {...testProps}>OK</Button>);
    const element = wrapper.getByText('OK');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg ccass');
  });

  it('should render a link when btnType equals link and herf is provided', () => {
    const wrapper = render(<Button btnType='link' href='http://jd.com'>Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>OK</Button>);
    const element = wrapper.getByText('OK') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
