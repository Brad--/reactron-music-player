import React from 'react';
import ReactDOM from 'react-dom';
import PlayerBody from './components/PlayerBody.jsx';

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

ReactDOM.render(
  <PlayerBody />,
  document.getElementById('root')
);
