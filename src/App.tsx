import React from 'react';
// import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div>
      <Menu
        defaultIndex={0}
        mode="vertical"
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <MenuItem>cool link 1</MenuItem>
        <MenuItem>cool link 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
        <MenuItem disabled>cool link 3</MenuItem>
        <MenuItem>cool link 4</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
