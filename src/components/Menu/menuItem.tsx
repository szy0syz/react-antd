import React from 'react'
import classnames from 'classnames';

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem : React.FC<MenuItemProps> = (props) => {
  const { disabled, className, style, children } = props;
  const classes = classnames('menu', className, {
    'is-disabled': disabled,
  });

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )

}

export default MenuItem;
