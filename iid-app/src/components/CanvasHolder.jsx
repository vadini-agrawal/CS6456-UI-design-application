import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React from 'react';
import Canvas from './Canvas';

class CanvasHolder extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
      return <Canvas width={this.props.width} height={this.props.height} floorColor={this.props.floorColor} wallColor={this.props.wallColor} assetList={this.props.assetList} clearWall={this.props.clearWall}/>
    }
}

export default CanvasHolder