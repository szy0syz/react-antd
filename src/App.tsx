import React from 'react';
import Button from './components/Button/button'
import { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div>
      <Button className="custom">Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
      <Button btnType={ButtonType.Link} href="http://jerryshi.com">Default Link</Button>
      <Button btnType={ButtonType.Link} disabled>Disabled Link</Button>
    </div>
  );
}

export default App;
