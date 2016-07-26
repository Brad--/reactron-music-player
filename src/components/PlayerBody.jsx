import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

class PlayerBody extends Component {
  render() {
    return (
      <SplitPane split="vertical" minSize={50} maxSize={300} defaultSize={100}>
        <div></div>
        <div></div>
      </SplitPane>
    );
  }
};

export default PlayerBody;
