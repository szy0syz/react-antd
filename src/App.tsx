import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div>
      <Menu defaultIndex={0} mode='verrical' onSelect={(index) => {}}>
        <MenuItem index={0}>cool link 1</MenuItem>
        <MenuItem index={1}>cool link 2</MenuItem>
        <MenuItem index={2} disabled>cool link 3</MenuItem>
        <MenuItem index={3}>cool link 4</MenuItem>
      </Menu>

      <Button className="custom">Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button btnType="danger" size="sm">
        Small Danger
      </Button>
      <Button btnType="primary" size="lg">
        Large Primary
      </Button>
      <Button btnType="link" href="http://jerryshi.com">
        Default Link
      </Button>
      <Button btnType="link" disabled>
        Disabled Link
      </Button>
    </div>
  );
}

export default App;
