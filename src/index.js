import React from 'react';
import ReactDOM from 'react-dom';
import PlayerBody from './components/PlayerBody.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {toJS, fromJS} from 'immutable';
const ipcRenderer = window.require('electron').ipcRenderer;

function saveStore () {
  let state = store.getState();
  ipcRenderer.send('save-store', state.toJS());
}

let savedStore = ipcRenderer.sendSync('retrieve-store');
let store;
if (Object.keys(savedStore).length === 0) {
  store = createStore(reducer);
} else {
  savedStore.queue = [];
  store = createStore(reducer, fromJS(savedStore));
}
store.subscribe(saveStore);

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

const App = () => (
  <Provider store={store}>
    <PlayerBody />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
