import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import MMenu from './components/MMenu';
import Router from './router';
import store from './store';
import './global.less';
import MHeader from './components/MHeader';
import userModule from './modules/user';
import authModule from './modules/auth';
import MAIN_CONFIG from './config';
import './mock';
import dictModule from './modules/dict';

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
        <Router>
          <MMenu />
          <MHeader />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
