import React from 'react';

class Asset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width*12,
            height: this.props.height*12,
            img: this.props.image_url,
            weight: this.props.weight,
        };
        this.styleObj = {
            height: this.state.height,
            width: this.state.width,
        }
    }
  
    render() {
        return (
            <img src={this.state.img} style={this.styleObj}></img>
        )
    }

}

export default Asset;