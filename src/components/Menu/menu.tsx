import React, { useState, createContext } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
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
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContent>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentIndex, setIndex] = useState(defaultIndex);

  const classes = classnames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: number) => {
    setIndex(index);
    if (onSelect) onSelect(index);
  };

  const passedContext: IMenuContent = {
    index: currentIndex ? currentIndex : 0,
    onSelect: handleClick,
    mode: mode,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
