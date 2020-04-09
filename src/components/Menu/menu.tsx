import React from 'react';
import classnames from 'classnames';

type MenuMode = 'horizontal' | 'verrical';
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex } = props;
  const classes = classnames('menu', className, {
    'menu-ertical': mode === 'verrical',
  });

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
