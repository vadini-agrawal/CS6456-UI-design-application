import React from 'react';
import Canvas from './Canvas';

class CanvasHolder extends React.Component {

    render() {      
      return <Canvas
                width={this.props.width} height={this.props.height} floorColor={this.props.floorColor}
                 wallColor={this.props.wallColor} assetList={this.props.assetList} clearWall={this.props.clearWall} 
                 assetSizeHandler={this.props.assetSizeHandler} wallImage={this.props.wallImage}/>
    }
}

export default CanvasHolder