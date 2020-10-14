import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

class URLImage extends React.Component {
    state = {
      image: null
    };
    // componentDidMount() {
    //   this.loadImage();
    // }
    // componentDidUpdate(oldProps) {
    //   if (oldProps.src !== this.props.src) {
    //     this.loadImage();
    //   }
    // }
    // componentWillUnmount() {
    //   this.image.removeEventListener('load', this.handleLoad);
    // }
    // loadImage() {
    //   // save to "this" to remove "load" handler on unmount
    //   this.image = new window.Image();
    //   this.image.src = this.props.src;
    //   this.image.addEventListener('load', this.handleLoad);
    // }
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
        />
      );
    }
  }

  export default URLImage;