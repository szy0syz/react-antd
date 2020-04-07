import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  classname?: 'string';
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { btnType, size, disabled, children, href } = props;

  // -> btn, btn-lg, btn-primary
  const classes = classnames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disable: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  } else {
    return <button className={classes} disabled={disabled}>{children}</button>;
  }
};

Button.defaultProps = {
  disabled: false,
  btnType:ButtonType.Default
}

export default Button;
