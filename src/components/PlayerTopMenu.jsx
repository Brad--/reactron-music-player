import React, { Component } from 'react';

class PlayerTopMenu extends Component {
  render() {
    return (
      <div className="menu-bar">
        <h3>Reactron Music Player</h3> -
        <h4>A cool music player for cool people</h4>
        <div className="spacer" />
        <img className="menu-icon" src="./static/images/settings_cog.png" />
      </div>
    );
  }
};

export default PlayerTopMenu;
