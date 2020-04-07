import React from 'react';
import Button from './components/Button/button'
import { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div>
      <Button size={ButtonSize.Large} disabled>Btn</Button>
      <Button btnType={ButtonType.Link} href="http://jerryshi.com">Link</Button>
    </div>
  );
}

export default App;
