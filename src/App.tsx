import React from 'react';
import Button from './components/Button/button'

function App() {
  return (
    <div>
      <Button className="custom">Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button btnType='danger' size='sm'>Small Danger</Button>
      <Button btnType='primary' size='lg'>Large Primary</Button>
      <Button btnType='link' href="http://jerryshi.com">Default Link</Button>
      <Button btnType='link' disabled>Disabled Link</Button>
    </div>
  );
}

export default App;
