import React from 'react';
import ReactDOM from 'react-dom';
import PlayerBody from './components/PlayerBody.jsx';
import SplitPane from 'react-split-pane';

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

ReactDOM.render(
  <PlayerBody />,
  document.getElementById('root')
);
