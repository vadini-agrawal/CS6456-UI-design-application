import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React from 'react';
import Canvas from './Canvas';

class CanvasHolder extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    
    render() {     
      if(this.props.submitAssetChange) {
        this.child.current.finishAssetSubmit();
      } 
      return <Canvas ref={this.child}
                width={this.props.width} height={this.props.height} floorColor={this.props.floorColor}
                 wallColor={this.props.wallColor} assetList={this.props.assetList} clearWall={this.props.clearWall} 
                 assetSizeHandler={this.props.assetSizeHandler} submitAssetChange={this.props.submitAssetChange}
                 newAssetTarget={this.props.newAssetTarget}/>
    }
}

export default CanvasHolder