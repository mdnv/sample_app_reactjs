import React from 'react';
import {Provider} from 'react-redux'
import Game from './components/Game'
import HttpsRedirect from 'react-https-redirect';

function App({store}) {
  return (
    <HttpsRedirect>
    <Provider store={store}>
      <Game />
    </Provider>
    </HttpsRedirect>
  );
}

export default App;
