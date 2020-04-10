import React, { useState, createContext } from 'react';
import classnames from 'classnames';

type MenuMode = 'horizontal' | 'verrical';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContent {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContent>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [ currentIndex, setIndex ] = useState(defaultIndex);

  const classes = classnames('menu', className, {
    'menu-vertical': mode === 'verrical',
  });

  const handleClick = (index: number) => {
    setIndex(index);
    if (onSelect) onSelect(index);
  }

  const passedContext: IMenuContent = {
    index: currentIndex ? currentIndex : 0,
    onSelect: handleClick,
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext} >
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
