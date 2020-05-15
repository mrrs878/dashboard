import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import MMenu from './components/MMenu';
import Router from './router';
import store from './store';
import './global.less';
import MHeader from './components/MHeader';
import './mock';
import userModule from './modules/user';

function App() {
  useEffect(() => {
    setTimeout(userModule.getInfoByToken);
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
