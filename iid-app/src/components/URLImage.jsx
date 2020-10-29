import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

class URLImage extends React.Component {
    state = {
      image: null
    };
    
    handleLoad = () => {
      this.setState({
        image: this.image
      });
    };
    render() {
      return (
        <Image
          x={this.props.x}
          y={this.props.y}
          height={this.props.height}
          width={this.props.width}
          image={this.state.image}
          ref={node => {
            this.imageNode = node;
          }}
          draggable="true"
          onDragEnd={this.props.onDragEnd}
        />
      );
    }
  }

  export default URLImage;
