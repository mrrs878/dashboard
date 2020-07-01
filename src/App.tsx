import { Provider } from 'react-redux';
import React, { useEffect } from 'react';

import store from './store';
import './global.less';
import userModule from './modules/user';
import authModule from './modules/auth';
import './mock';
import dictModule from './modules/dict';
import MLayout from './layout';
import MAIN_CONFIG from './config';

function App() {
  useEffect(() => {
    localStorage.setItem(MAIN_CONFIG.TOKEN_NAME, 'admin');
    Promise.race([userModule.getInfoByToken(), authModule.getMenu(), dictModule.getDict()]).catch((error) => {
      console.log(error);
    });
  });

  return (
    <Provider store={store}>
      <div className="app">
        <MLayout />
      </div>
    </Provider>
  );
}

export default App;
