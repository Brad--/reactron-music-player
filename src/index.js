import React from 'react';
import ReactDOM from 'react-dom';
import PlayerBody from './components/PlayerBody.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <PlayerBody />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
